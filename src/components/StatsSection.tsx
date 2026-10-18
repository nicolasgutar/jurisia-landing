import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { DOCUMENTS_INDEXED_COUNT } from '@/src/config/siteStats';

const API_URL = import.meta.env.VITE_APP_API_URL ?? 'https://app.enndor.ai';

// Shown if the App's stats API can't be reached (network hiccup, cold
// start), so the section never renders 0 or breaks on the public
// marketing page. Not exact — just plausible placeholders.
const FALLBACK_USER_COUNT = 1700;
const FALLBACK_QUERY_COUNT = 5000;

type LiveStats = { userCount: number; queryCount: number };

function AnimatedStat({
  target,
  isInView,
  label,
}: {
  target: number | null;
  isInView: boolean;
  label: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || target === null) {
      return;
    }

    const controls = animate(0, target, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, target]);

  return (
    <div className="space-y-3 border-t border-white/[0.08] pt-6 text-left">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="metallic-text font-headline text-5xl font-light tabular-nums tracking-[-0.04em] lg:text-7xl"
      >
        +{display.toLocaleString('es-CO')}
      </motion.p>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/public/stats`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { userCount?: unknown; queryCount?: unknown }) => {
        if (cancelled) {
          return;
        }
        setLiveStats({
          userCount:
            typeof data.userCount === 'number'
              ? data.userCount
              : FALLBACK_USER_COUNT,
          queryCount:
            typeof data.queryCount === 'number'
              ? data.queryCount
              : FALLBACK_QUERY_COUNT,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setLiveStats({
            userCount: FALLBACK_USER_COUNT,
            queryCount: FALLBACK_QUERY_COUNT,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black px-6 pb-28 md:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        <AnimatedStat
          target={liveStats?.userCount ?? null}
          isInView={isInView}
          label="Abogados y Estudiantes"
        />
        <AnimatedStat
          target={liveStats?.queryCount ?? null}
          isInView={isInView}
          label="Consultas Resueltas"
        />
        <AnimatedStat
          target={DOCUMENTS_INDEXED_COUNT}
          isInView={isInView}
          label="Documentos en la Base de Conocimiento"
        />
      </div>
    </section>
  );
}

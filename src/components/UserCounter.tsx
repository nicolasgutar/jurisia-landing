import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';

// Shown if the App's stats API can't be reached (network hiccup, cold start)
// so the section never renders "0" or breaks on the public marketing page.
const FALLBACK_COUNT = 1700;

const API_URL = import.meta.env.VITE_APP_API_URL ?? 'https://app.legisia.co';

export default function UserCounter() {
  const [target, setTarget] = useState<number | null>(null);
  const [display, setDisplay] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/public/stats/user-count`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count?: unknown }) => {
        if (!cancelled && typeof data.count === 'number') {
          setTarget(data.count);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTarget(FALLBACK_COUNT);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
    <section
      ref={sectionRef}
      className="py-24 px-8 bg-black border-y border-white/5"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl lg:text-7xl font-extrabold font-headline text-primary tabular-nums"
        >
          +{display.toLocaleString('es-CO')}
        </motion.p>
        <p className="text-on-surface-variant font-light uppercase tracking-widest text-sm">
          Abogados y estudiantes ya confían en Legisia
        </p>
      </div>
    </section>
  );
}

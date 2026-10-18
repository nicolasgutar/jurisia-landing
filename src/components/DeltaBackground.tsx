import { useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';

// Generative greyscale "river delta" (domain-warped fbm with ridged channels),
// the Enndor hero backdrop. Pure WebGL1, no dependency. Renders at reduced
// resolution (the grain overlay hides the upscale), pauses while off-screen
// or in a hidden tab, and draws a single still frame for reduced-motion users.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  uv += u_mouse * 0.035;
  float t = u_time * 0.025;

  // Rotate and squash so the channels run diagonally, like braided rivers
  // seen from above.
  vec2 p = mat2(0.8, -0.6, 0.6, 0.8) * (uv * 1.5);
  p.x *= 0.5;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + 1.5 * t),
    fbm(p + 3.0 * q + vec2(8.3, 2.8))
  );
  float f = fbm(p + 3.0 * r);

  float ridge = pow(1.0 - abs(2.0 * f - 1.0), 5.0);
  float sand = smoothstep(0.2, 0.85, f);
  float silt = smoothstep(0.3, 0.9, length(r));
  float col = mix(0.03, 0.62, sand * sand) + ridge * 0.42 * (0.5 + 0.5 * q.x) + silt * 0.08;

  // Light falls from the left and fades into a dark right half.
  col *= mix(1.45, 0.4, smoothstep(-0.8, 0.9, uv.x + uv.y * 0.25));
  col *= 1.0 - 0.45 * dot(uv * vec2(0.7, 1.0), uv * vec2(0.7, 1.0));
  col = pow(col, 0.95);

  gl_FragColor = vec4(vec3(col) * vec3(1.0, 0.985, 0.96), 1.0);
}
`;

const RESOLUTION_SCALE = 0.5;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function DeltaBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl && vs && fs ? gl.createProgram() : null;
    if (!gl || !program || !vs || !fs) {
      // No WebGL: the CSS gradient fallback stays visible.
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let visible = true;
    const start = performance.now();
    // Start at an arbitrary point in the flow so the first frame is already
    // well-developed rather than the noise field's origin.
    const timeOffset = 40;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * RESOLUTION_SCALE));
      const h = Math.max(1, Math.floor(canvas.clientHeight * RESOLUTION_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, timeOffset + (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const resume = () => {
      if (!raf && visible && !document.hidden && !reducedMotion) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);

    if (reducedMotion) {
      draw(start);
    } else {
      window.addEventListener('pointermove', onMove);
      document.addEventListener('visibilitychange', resume);
      resume();
    }
    canvas.style.opacity = '1';
    if (fallbackRef.current) fallbackRef.current.style.opacity = '0';
    const onResize = () => reducedMotion && draw(performance.now());
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', resume);
      // No loseContext() here: StrictMode re-runs this effect on the same
      // canvas, and getContext() would hand back the lost context.
    };
  }, []);

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div
        ref={fallbackRef}
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 25% 40%, #3a3a38 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 70%, #1c1b19 0%, transparent 70%), #070707',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1500ms]"
      />
    </div>
  );
}

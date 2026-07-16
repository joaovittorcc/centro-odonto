import { useEffect, useRef, useState } from "react";

/**
 * Conta de 0 até `end` quando o elemento entra na viewport.
 * Usado no card de prova social (4.9). Respeita prefers-reduced-motion:
 * nesse caso mostra o valor final imediatamente, sem animar.
 */
export function useCountUp(end, { duration = 1400, decimals = 1 } = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          observer.unobserve(entry.target);

          if (reduce) {
            setValue(end);
            return;
          }

          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Number((eased * end).toFixed(decimals)));
            if (t < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return [value, ref];
}

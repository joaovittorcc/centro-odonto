import { useEffect, useRef } from "react";

/**
 * Adiciona a classe `is-visible` quando o elemento entra na viewport,
 * disparando o reveal de scroll definido em index.css.
 * Respeita prefers-reduced-motion via CSS (o elemento já fica visível).
 */
export function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      options
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

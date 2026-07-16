import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";
import { useReveal } from "../hooks/useReveal";

const AVATAR_STYLES = ["bg-skydeep", "bg-mintdeep", "bg-ink"];

function initials(name) {
  const parts = name.split(" ").filter((w) => !w.includes("."));
  const first = parts[0]?.[0] || name[0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Testimonials() {
  const revealRef = useReveal();

  return (
    <section className="bg-mist px-5 sm:px-8 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef} className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-skydeep">
            Avaliações reais
          </p>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
            Quem foi, conta como foi
          </h2>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            Extraído das avaliações públicas da Centro Odonto no Google — sem
            atores, sem produção.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className="relative flex flex-col rounded-2xl border border-ink/8 bg-white p-6"
            >
              <Quote
                size={36}
                className="absolute top-5 right-5 text-sky/10"
                aria-hidden="true"
              />

              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${
                    AVATAR_STYLES[i % AVATAR_STYLES.length]
                  }`}
                >
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-display font-semibold text-ink text-sm">
                    {t.name}
                  </p>
                  <div className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={13}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="relative mt-4 text-slate leading-relaxed text-[0.95rem]">
                {t.quote}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

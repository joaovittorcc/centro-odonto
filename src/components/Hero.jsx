import { useEffect, useRef, useState } from "react";
import { Star, CalendarHeart, MessageCircle, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { HERO_REVIEWS } from "../data/testimonials";
import { directWhatsAppUrl } from "../utils/whatsapp";

// Altura extra de scroll que alimenta a animação de encolher a marca.
const SECTION_HEIGHT_VH = 170;

// Posição de cada bolha de avaliação no frame (desktop). Preenchem o espaço
// vazio ao redor da logo centralizada. `delay` dá um float dessincronizado.
const BUBBLE_POS = [
  "left-[9%] top-[15%]",
  "right-[10%] top-[17%]",
  "left-[7%] bottom-[22%]",
  "right-[8%] bottom-[20%]",
];

export default function Hero() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const decorRef = useRef(null);
  const contentRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    const logoEl = logoRef.current;
    const content = contentRef.current;
    const decor = decorRef.current;
    if (!section || !logoEl || !content) return;

    let rafId = null;

    function apply() {
      rafId = null;
      const rect = section.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      const progress =
        scrollRange > 0
          ? Math.min(Math.max(-rect.top / scrollRange, 0), 1)
          : 1;

      // Logo grande -> pequena, sempre centralizada.
      const scale = 1 - progress * 0.58;
      logoEl.style.transform = `scale(${scale})`;

      // Bolhas + selos + indicador somem cedo, subindo levemente.
      const decorOpacity = Math.max(1 - progress / 0.25, 0);
      if (decor) {
        decor.style.opacity = String(decorOpacity);
        decor.style.transform = `translateY(${-progress * 28}px) scale(${
          1 - progress * 0.06
        })`;
      }

      // Texto revela na segunda metade do scroll.
      const textProgress = Math.min(Math.max((progress - 0.3) / 0.55, 0), 1);
      content.style.opacity = String(textProgress);
      content.style.transform = `translateY(${(1 - textProgress) * 28}px)`;
      content.style.pointerEvents = textProgress < 0.4 ? "none" : "auto";
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative"
      style={reduced ? undefined : { height: `${SECTION_HEIGHT_VH}vh` }}
    >
      <div
        className={`${
          reduced ? "py-24" : "sticky top-0 h-screen pt-20 sm:pt-24"
        } flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-mint/10 blur-3xl" />
          <div className="absolute top-24 -left-32 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
        </div>

        {/* Camada decorativa: selos + bolhas de avaliação + indicador de
            scroll. Some junto conforme a página desce. Só com motion. */}
        {!reduced && (
          <div
            ref={decorRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
          >
            <div className="hidden md:block absolute left-[5%] top-[32%] float-soft">
              <StatBadge value="4.9" label="média no Google" />
            </div>
            <div
              className="hidden md:block absolute right-[5%] top-[32%] float-soft"
              style={{ animationDelay: "1.2s" }}
            >
              <StatBadge value="79" label="avaliações reais" />
            </div>

            {HERO_REVIEWS.slice(0, 4).map((r, i) => (
              <div
                key={r.name}
                className={`hidden lg:block absolute ${BUBBLE_POS[i]} float-soft`}
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <ReviewBubble quote={r.quote} name={r.name} />
              </div>
            ))}

            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate">
              <span className="text-xs font-medium uppercase tracking-widest">
                Role para descobrir
              </span>
              <ChevronDown size={22} className="nudge-down text-skydeep" />
            </div>
          </div>
        )}

        <div
          ref={logoRef}
          style={reduced ? { transform: "scale(0.7)" } : undefined}
        >
          <Logo
            variant="stack"
            iconClass="w-24 sm:w-32 md:w-40 h-auto"
            textClass="text-5xl sm:text-6xl md:text-7xl"
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-20 mt-10 max-w-2xl text-center"
          style={reduced ? undefined : { opacity: 0 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate">
            <span className="h-2 w-2 rounded-full bg-mint" />
            Clínica odontológica em Anápolis · desde 2008
          </p>

          <h1 className="mt-6 font-display font-bold text-ink text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight">
            O sorriso que você merece, cuidado pela clínica que{" "}
            <span className="text-sky">Anápolis confia há 18 anos</span>.
          </h1>

          <p className="mt-5 text-lg text-slate leading-relaxed">
            Especialistas em{" "}
            <strong className="text-ink font-semibold">
              implantes dentários
            </strong>{" "}
            e periodontia, com atendimento odontológico de qualidade perto do
            Jundiaí. Avaliação nota{" "}
            <strong className="text-ink font-semibold">4.9 no Google</strong>,
            com 79 pacientes reais de Anápolis.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#agendar"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-skydeep px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky/20 hover:bg-[#025a8a] hover:-translate-y-0.5 transition-all"
            >
              <CalendarHeart size={19} />
              Agendar minha avaliação
            </a>
            <a
              href={directWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-3.5 text-base font-semibold text-ink hover:border-mintdeep hover:text-mintdeep transition-colors"
            >
              <MessageCircle size={19} />
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate">
            <div className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span>
              <strong className="text-ink">4.9</strong> · 79 avaliações no
              Google
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBadge({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-ink/8 bg-white/90 px-5 py-4 shadow-lg shadow-ink/5">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <div className="font-display font-bold text-xl text-ink">{value}</div>
      <div className="text-xs text-slate whitespace-nowrap">{label}</div>
    </div>
  );
}

function ReviewBubble({ quote, name }) {
  return (
    <div className="w-56 rounded-2xl border border-ink/8 bg-white/90 px-4 py-3 shadow-lg shadow-ink/5 backdrop-blur-sm">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-1.5 text-sm text-ink leading-snug">“{quote}”</p>
      <p className="mt-1 text-xs font-medium text-slate">{name}</p>
    </div>
  );
}

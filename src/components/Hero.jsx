import { useEffect, useRef, useState } from "react";
import { Star, CalendarHeart, MessageCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { CLINIC_PHOTOS } from "../data/photos";
import { directWhatsAppUrl } from "../utils/whatsapp";
import { useReveal } from "../hooks/useReveal";

// Altura extra de scroll que alimenta a animação de encolher a marca.
// 145vh de seção com um wrapper sticky de 100vh dá ~45vh de "range" de
// scroll — só o suficiente pro encolhimento da logo, a galeria não precisa
// colapsar mais: ela preenche o espaço restante da tela o tempo todo.
const SECTION_HEIGHT_VH = 145;

export default function Hero() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const leftBadgeRef = useRef(null);
  const rightBadgeRef = useRef(null);
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
    const leftBadge = leftBadgeRef.current;
    const rightBadge = rightBadgeRef.current;
    if (!section || !logoEl) return;

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
      const scale = 1 - progress * 0.62;
      logoEl.style.transform = `scale(${scale})`;

      // Avaliações somem cedo, antes da logo terminar de encolher.
      const badgeOpacity = Math.max(1 - progress / 0.3, 0);
      const badgeShift = progress * 36;
      if (leftBadge) {
        leftBadge.style.opacity = String(badgeOpacity);
        leftBadge.style.transform = `translateX(${-badgeShift}px)`;
        leftBadge.style.pointerEvents = badgeOpacity < 0.05 ? "none" : "auto";
      }
      if (rightBadge) {
        rightBadge.style.opacity = String(badgeOpacity);
        rightBadge.style.transform = `translateX(${badgeShift}px)`;
        rightBadge.style.pointerEvents = badgeOpacity < 0.05 ? "none" : "auto";
      }
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
    <>
      <section
        id="top"
        ref={sectionRef}
        className="relative"
        style={reduced ? undefined : { height: `${SECTION_HEIGHT_VH}vh` }}
      >
        <div
          className={`${
            reduced ? "py-20" : "sticky top-0 h-screen pb-6 sm:pb-8"
          } flex flex-col items-center overflow-hidden px-5 sm:px-8 pt-20 sm:pt-24`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-mint/10 blur-3xl" />
            <div className="absolute top-24 -left-32 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
          </div>

          <div className="shrink-0 flex items-center justify-center gap-5 sm:gap-10">
            <div
              ref={leftBadgeRef}
              className="hidden sm:block"
              style={reduced ? { display: "none" } : undefined}
            >
              <ReviewBadge value="4.9" label="média no Google" />
            </div>

            <div
              ref={logoRef}
              className="flex flex-col items-center"
              style={reduced ? { transform: "scale(0.6)" } : undefined}
            >
              <img
                src={logo}
                alt="Centro Odonto"
                className="w-48 sm:w-64 md:w-80 h-auto"
              />
            </div>

            <div
              ref={rightBadgeRef}
              className="hidden sm:block"
              style={reduced ? { display: "none" } : undefined}
            >
              <ReviewBadge value="79" label="avaliações reais" />
            </div>
          </div>

          {/* A galeria preenche todo o espaço restante da tela — sem vão
              morto embaixo, tanto parada quanto durante o scroll. Sem
              scroll-jacking (reduced motion), o wrapper não é h-screen,
              então a galeria usa uma altura fixa em vez de flex-1. */}
          <div
            className={`relative mt-6 sm:mt-8 w-full max-w-5xl ${
              reduced ? "h-40 sm:h-52 md:h-64" : "flex-1 min-h-0"
            }`}
          >
            <PhotoGallery />
          </div>
        </div>
      </section>

      <HeroHeadline />
    </>
  );
}

// Headline em fluxo normal, logo depois do bloco fixo da logo — revela ao
// scroll como as demais seções (sem crossfade sobre a galeria: nunca há
// dois elementos disputando o mesmo espaço na tela).
function HeroHeadline() {
  const revealRef = useReveal();

  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24">
      <div ref={revealRef} className="reveal max-w-2xl mx-auto text-center">
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
              <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>
            <strong className="text-ink">4.9</strong> · 79 avaliações no
            Google
          </span>
        </div>
      </div>
    </section>
  );
}

// Fotos reais da clínica, lado a lado no desktop. No mobile, mostra uma
// por vez com scroll horizontal (snap) em vez de espremer todas na tela.
function PhotoGallery() {
  return (
    <div className="grid h-full auto-cols-[100%] grid-flow-col gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:auto-cols-fr sm:overflow-visible">
      {CLINIC_PHOTOS.map((photo) => (
        <div
          key={photo.alt}
          className="h-full snap-center overflow-hidden rounded-2xl border border-ink/8 bg-mist"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

function ReviewBadge({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-ink/8 bg-white/90 px-5 py-4 shadow-lg shadow-ink/5 shrink-0">
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

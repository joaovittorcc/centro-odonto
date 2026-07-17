import { Star, CalendarHeart, MessageCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { directWhatsAppUrl } from "../utils/whatsapp";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      {/* Atmosfera: gradiente suave na paleta da marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-mint/10 blur-3xl" />
        <div className="absolute top-24 -left-32 h-96 w-96 rounded-full bg-sky/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-1.5 text-sm font-medium text-slate">
            <span className="h-2 w-2 rounded-full bg-mint" />
            Clínica odontológica em Anápolis · desde 2008
          </p>

          <h1 className="mt-6 font-display font-bold text-ink text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight">
            O sorriso que você merece,
            <br className="hidden sm:block" /> cuidado pela clínica que{" "}
            <span className="text-sky">Anápolis confia há 18 anos</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate leading-relaxed">
            Especialistas em{" "}
            <strong className="text-ink font-semibold">
              implantes dentários
            </strong>{" "}
            e periodontia, com atendimento odontológico de qualidade perto do
            Jundiaí. Avaliação nota{" "}
            <strong className="text-ink font-semibold">4.9 no Google</strong>,
            com 79 pacientes reais de Anápolis.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
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

          <div className="mt-8 flex items-center gap-3 text-sm text-slate">
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

        {/* Marca: logo real num card com atmosfera suave da paleta */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl bg-gradient-to-br from-mist to-white border border-ink/5 shadow-xl shadow-sky/5 flex items-center justify-center overflow-hidden p-8">
            <img
              src={logo}
              alt="Centro Odonto"
              className="w-full max-w-[280px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";
import { useReveal } from "../hooks/useReveal";

export default function SocialProof() {
  const [rating, ratingRef] = useCountUp(4.9, { decimals: 1 });
  const revealRef = useReveal();

  return (
    <section aria-label="Avaliação dos pacientes" className="px-5 sm:px-8">
      <div
        ref={revealRef}
        className="reveal max-w-4xl mx-auto -mt-6 sm:-mt-10 relative z-10 rounded-3xl bg-ink text-white px-8 py-10 sm:px-14 sm:py-12 shadow-2xl shadow-ink/20"
      >
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-14">
          <div ref={ratingRef} className="text-center sm:text-left shrink-0">
            <div className="font-display font-bold text-6xl sm:text-7xl leading-none tabular-nums">
              {rating.toFixed(1)}
            </div>
            <div className="mt-3 flex justify-center sm:justify-start" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div className="h-px w-16 sm:h-16 sm:w-px bg-white/15" aria-hidden="true" />

          <div className="text-center sm:text-left">
            <p className="font-display text-xl sm:text-2xl font-semibold">
              79 avaliações reais de pacientes de Anápolis
            </p>
            <p className="mt-2 text-white/70 leading-relaxed">
              A nota máxima que uma clínica pode almejar no{" "}
              <span className="font-semibold text-white">Google</span> — construída
              paciente por paciente, ao longo de 18 anos de atendimento no
              Jundiaí.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

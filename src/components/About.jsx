import { useReveal } from "../hooks/useReveal";

const PILLARS = [
  { value: "2008", label: "Ano de fundação em Anápolis" },
  { value: "18 anos", label: "Cuidando do sorriso da cidade" },
  { value: "Sem dor", label: "Tratamento rápido e eficaz" },
];

export default function About() {
  const revealRef = useReveal();

  return (
    <section id="sobre" className="px-5 sm:px-8 py-20 sm:py-28">
      <div ref={revealRef} className="reveal max-w-4xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-skydeep">
          Quem somos
        </p>
        <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
          Desde 2008, o consultório de estética dental de referência na Rua Luís
          França
        </h2>
        <p className="mt-6 text-lg text-slate leading-relaxed max-w-2xl mx-auto">
          Somos uma clínica independente, construída sobre atendimento
          personalizado e equipamentos modernos. Cada paciente é recebido com o
          cuidado de quem entende que ir ao dentista pode — e deve — ser uma
          experiência tranquila.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border border-ink/8 bg-white px-6 py-7"
            >
              <div className="font-display font-bold text-2xl text-sky">
                {p.value}
              </div>
              <div className="mt-1 text-sm text-slate">{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

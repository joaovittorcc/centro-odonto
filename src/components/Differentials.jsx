import { CalendarCheck, Siren, Accessibility, CreditCard } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const ITEMS = [
  {
    icon: CalendarCheck,
    title: "Atendimento aos sábados",
    text: "Dentista aberto aos sábados em Anápolis, para quem não pode faltar no trabalho.",
  },
  {
    icon: Siren,
    title: "Urgência e emergência",
    text: "Dor de dente não espera. Atendemos casos de urgência com prioridade.",
  },
  {
    icon: Accessibility,
    title: "Acessibilidade completa",
    text: "Entrada, banheiro e assento adaptados para cadeira de rodas.",
  },
  {
    icon: CreditCard,
    title: "Pagamento facilitado",
    text: "Crédito, débito e pagamento por aproximação (NFC).",
  },
];

export default function Differentials() {
  const revealRef = useReveal();

  return (
    <section id="diferenciais" className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef} className="reveal text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-mintdeep">
            Por que a Centro Odonto
          </p>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
            Menos fricção, mais cuidado
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-ink/8 bg-white p-6 text-center sm:text-left"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint/10 text-mint"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

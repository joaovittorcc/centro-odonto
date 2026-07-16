import { SERVICES } from "../data/services";
import { useReveal } from "../hooks/useReveal";

export default function Services() {
  const revealRef = useReveal();

  return (
    <section id="especialidades" className="bg-mist px-5 sm:px-8 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef} className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-skydeep">
            Especialidades
          </p>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
            Do implante à estética, o seu tratamento em um só lugar
          </h2>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            Os melhores implantes dentários em Anápolis e uma linha completa de
            cuidados para toda a família.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <li
                key={service.title}
                className={`group relative rounded-2xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky/5 ${
                  service.featured
                    ? "border-sky/40 ring-1 ring-sky/20"
                    : "border-ink/8"
                }`}
              >
                {service.featured && (
                  <span className="absolute top-5 right-5 rounded-full bg-skydeep/10 px-3 py-1 text-xs font-semibold text-skydeep">
                    Especialidade
                  </span>
                )}
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-sky transition-colors group-hover:bg-sky group-hover:text-white"
                  aria-hidden="true"
                >
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-display font-semibold text-xl text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-slate leading-relaxed">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

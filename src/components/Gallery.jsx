import { CLINIC_PHOTOS } from "../data/photos";
import { useReveal } from "../hooks/useReveal";

export default function Gallery() {
  const revealRef = useReveal();

  return (
    <section className="px-5 sm:px-8 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div ref={revealRef} className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-skydeep">
            Conheça a clínica
          </p>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-ink leading-tight">
            Um espaço pensado para o seu conforto
          </h2>
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CLINIC_PHOTOS.map((photo) => (
            <li key={photo.alt}>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ink/8 bg-mist">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-slate text-center">
                {photo.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

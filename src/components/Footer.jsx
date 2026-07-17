import { MapPin, Clock, MessageCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { directWhatsAppUrl } from "../utils/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-clinical border-t border-ink/8 px-5 sm:px-8 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src={logo} alt="Centro Odonto" className="h-7 w-auto" />
          <p className="mt-3 text-sm text-slate leading-relaxed">
            Clínica de estética dental em Anápolis. Implantes, periodontia e
            cuidado para toda a família desde 2008.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink uppercase tracking-wide">
            Onde estamos
          </h3>
          <p className="mt-4 flex items-start gap-2 text-sm text-slate">
            <MapPin size={18} className="shrink-0 text-sky mt-0.5" />
            R. Luís França, 234 — Jundiaí,
            <br />
            Anápolis - GO
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink uppercase tracking-wide">
            Horário
          </h3>
          <p className="mt-4 flex items-start gap-2 text-sm text-slate">
            <Clock size={18} className="shrink-0 text-sky mt-0.5" />
            Segunda a sábado
            <br />
            Atendimento de urgência
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink uppercase tracking-wide">
            Fale com a gente
          </h3>
          <a
            href={directWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-skydeep px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#025a8a] transition-colors"
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
          {/* [PLACEHOLDER — confirmar com o cliente antes de publicar] */}
          <p className="mt-4 text-xs text-slate/70 leading-relaxed">
            Responsável técnico(a): [a confirmar] · CRO-GO: [a confirmar]
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-ink/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate">
        <p>© {new Date().getFullYear()} Centro Odonto. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por{" "}
          <a
            href="#top"
            className="font-semibold text-ink hover:text-sky transition-colors"
          >
            Evodev Studio
          </a>
        </p>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { Stethoscope, Anchor, Sparkles, Siren, Baby, Sun, Sunset, CalendarDays, MessageCircle, Check } from "lucide-react";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { useReveal } from "../hooks/useReveal";

const SERVICE_OPTIONS = [
  { value: "Avaliação Geral", icon: Stethoscope },
  { value: "Implantes", icon: Anchor },
  { value: "Estética (Clareamento/Lentes)", icon: Sparkles },
  { value: "Urgência/Dor", icon: Siren },
  { value: "Odontopediatria", icon: Baby },
];

const PERIOD_OPTIONS = [
  { value: "Manhã", icon: Sun },
  { value: "Tarde", icon: Sunset },
  { value: "Sábado", icon: CalendarDays },
];

const TOTAL_STEPS = 3;
const STEP_LABELS = ["Atendimento", "Período", "Seus dados"];

// Aceita formatos como (62) 99999-9999, 62999999999, +55 62 9... — exige 10+ dígitos.
function isValidPhone(phone) {
  return phone.replace(/\D/g, "").length >= 10;
}

export default function ScheduleForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(null); // guarda a url gerada
  const [touched, setTouched] = useState(false);
  const [answers, setAnswers] = useState({
    serviceType: "",
    period: "",
    name: "",
    phone: "",
  });
  const revealRef = useReveal();

  const nameValid = answers.name.trim().length > 0;
  const phoneValid = isValidPhone(answers.phone);

  const canAdvance =
    (step === 1 && answers.serviceType) ||
    (step === 2 && answers.period) ||
    step === 3;

  function next() {
    if (step < TOTAL_STEPS && canAdvance) setStep(step + 1);
  }
  function back() {
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!nameValid || !phoneValid) return;
    const url = buildWhatsAppUrl(answers);
    setSubmitted(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="agendar" className="bg-ink text-white px-5 sm:px-8 py-20 sm:py-28">
      <div ref={revealRef} className="reveal max-w-xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-mint">
            Pré-agendamento
          </p>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl leading-tight">
            Agende sua avaliação em 3 passos
          </h2>
          <p className="mt-3 text-white/70">
            Leva menos de um minuto. Você finaliza a conversa direto no WhatsApp da
            clínica.
          </p>
        </div>

        {submitted ? (
          <Success url={submitted} />
        ) : (
          <div className="mt-10 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-xs font-medium text-white/60">
                {STEP_LABELS.map((label, i) => (
                  <span
                    key={label}
                    className={i + 1 <= step ? "text-mint" : ""}
                  >
                    {i + 1}. {label}
                  </span>
                ))}
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-mint transition-all duration-500"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {step === 1 && (
                <OptionStep
                  legend="Que tipo de atendimento você procura?"
                  options={SERVICE_OPTIONS}
                  selected={answers.serviceType}
                  onSelect={(v) => setAnswers({ ...answers, serviceType: v })}
                />
              )}

              {step === 2 && (
                <OptionStep
                  legend="Qual o melhor período para você?"
                  options={PERIOD_OPTIONS}
                  selected={answers.period}
                  onSelect={(v) => setAnswers({ ...answers, period: v })}
                />
              )}

              {step === 3 && (
                <fieldset className="space-y-4">
                  <legend className="font-display font-semibold text-lg mb-2">
                    Como podemos te chamar?
                  </legend>

                  <div>
                    <label htmlFor="name" className="block text-sm text-white/70 mb-1.5">
                      Seu nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={answers.name}
                      onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                      className="w-full rounded-xl bg-white px-4 py-3 text-ink placeholder:text-slate/60"
                      placeholder="Ex.: Maria Silva"
                    />
                    {touched && !nameValid && (
                      <p className="mt-1.5 text-sm text-amber-300">
                        Informe seu nome para continuar.
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-white/70 mb-1.5">
                      Seu WhatsApp (com DDD)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={answers.phone}
                      onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
                      className="w-full rounded-xl bg-white px-4 py-3 text-ink placeholder:text-slate/60"
                      placeholder="Ex.: (62) 99999-9999"
                    />
                    {touched && !phoneValid && (
                      <p className="mt-1.5 text-sm text-amber-300">
                        Informe um WhatsApp válido com DDD.
                      </p>
                    )}
                  </div>
                </fieldset>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="rounded-full px-5 py-2.5 text-sm font-medium border border-white/20 text-white/80 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Voltar
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canAdvance}
                    className="rounded-full bg-mint px-7 py-2.5 text-sm font-semibold text-ink hover:bg-mint/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Próximo
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-2.5 text-sm font-semibold text-ink hover:bg-mint/90 transition-colors"
                  >
                    <MessageCircle size={17} />
                    Enviar pelo WhatsApp
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

function OptionStep({ legend, options, selected, onSelect }) {
  return (
    <fieldset>
      <legend className="font-display font-semibold text-lg mb-4">{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = selected === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              aria-pressed={active}
              className={`flex items-center gap-3 text-left rounded-xl border px-4 py-3.5 transition-all ${
                active
                  ? "border-mint bg-mint/15 text-white"
                  : "border-white/15 text-white/80 hover:border-white/40"
              }`}
            >
              <Icon
                size={20}
                strokeWidth={1.75}
                className={active ? "text-mint" : "text-white/60"}
              />
              <span className="text-sm font-medium">{opt.value}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Success({ url }) {
  return (
    <div className="mt-10 rounded-3xl bg-white/5 border border-mint/30 p-8 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-mint text-ink">
        <Check size={28} />
      </span>
      <h3 className="mt-5 font-display font-semibold text-xl">
        Tudo pronto!
      </h3>
      <p className="mt-2 text-white/70">
        Abrimos o WhatsApp da clínica com sua mensagem já preenchida. Não abriu?
        Use o botão abaixo.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3 text-sm font-semibold text-ink hover:bg-mint/90 transition-colors"
      >
        <MessageCircle size={17} />
        Abrir conversa no WhatsApp
      </a>
    </div>
  );
}

/**
 * Elemento de assinatura: um arco de sorriso que se traça sozinho na entrada
 * (line-draw). Remete ao produto — o sorriso — sem cair no clichê do dente
 * de desenho animado. Gradiente azul tecnológico → verde menta.
 */
export default function SmileArc({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className={className}
      role="img"
      aria-label="Arco de um sorriso desenhado em linha, símbolo da Centro Odonto"
      fill="none"
    >
      <defs>
        <linearGradient id="smileGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Arco principal do sorriso */}
      <path
        className="smile-path"
        d="M 40 70 Q 200 240 360 70"
        stroke="url(#smileGradient)"
        strokeWidth="14"
        strokeLinecap="round"
        pathLength="1"
      />

      {/* Pequeno brilho/realce no canto — o "ponto de luz" do sorriso */}
      <circle cx="332" cy="86" r="6" fill="#10B981" opacity="0.9" />
    </svg>
  );
}

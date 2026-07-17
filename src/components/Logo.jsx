import iconSrc from "../assets/logo-icon.png";

// Lockup da marca: ícone (PNG limpo, recortado do original) + wordmark
// reconstruído em fonte arredondada. O wordmark vetorial escala nítido em
// qualquer tamanho — sem o serrilhado do render 3D original.
//
// variant "row": ícone à esquerda do texto (header/footer).
// variant "stack": ícone acima do texto, grande (hero).
export default function Logo({
  variant = "row",
  iconClass = "",
  textClass = "",
  className = "",
}) {
  const stack = variant === "stack";
  return (
    <span
      className={`inline-flex ${
        stack ? "flex-col items-center gap-3" : "items-center gap-2"
      } ${className}`}
    >
      <img src={iconSrc} alt="" aria-hidden="true" className={iconClass} />
      <span
        className={`font-brand font-extrabold leading-none text-brandcyan whitespace-nowrap ${textClass}`}
      >
        CentroOdonto
      </span>
    </span>
  );
}

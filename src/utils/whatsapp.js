// Formato: 55 + DDD + número (somente dígitos). Ex.: 5562999999999
const WHATSAPP_NUMBER = "5562985037650";

/**
 * Monta o link wa.me com a mensagem pré-preenchida a partir dos dados
 * coletados no formulário de pré-agendamento. Formato rotulado em várias
 * linhas — evita problemas de concordância (ex.: "avaliação de Avaliação
 * Geral" / "no período da Sábado") e fica fácil de ler pela recepção.
 */
export function buildWhatsAppUrl({ serviceType, period, name }) {
  const message = [
    "Olá! Vim pelo site da Centro Odonto e gostaria de agendar uma consulta.",
    "",
    `Tipo de atendimento: ${serviceType}`,
    `Melhor período: ${period}`,
    `Nome: ${name}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Link direto de contato (header / footer), sem dados de formulário.
export function directWhatsAppUrl() {
  const message = "Olá! Vim pelo site da Centro Odonto e gostaria de agendar uma consulta.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

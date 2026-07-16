import {
  Anchor,
  Smile,
  HeartPulse,
  Baby,
  Layers,
  ShieldCheck,
} from "lucide-react";

// Ícones escolhidos por relação semântica com o procedimento — não "dente genérico".
// Implante = ancoragem no osso (Anchor); estética = o próprio sorriso (Smile);
// endodontia = tratar a polpa viva e eliminar a dor (HeartPulse);
// odontopediatria = criança (Baby); próteses = reposição/camadas (Layers);
// prevenção = proteção (ShieldCheck).
export const SERVICES = [
  {
    icon: Anchor,
    title: "Implantes Dentários",
    description:
      "Implante unitário ou total, com enxerto ósseo quando necessário. Nossa especialidade há 18 anos em Anápolis.",
    featured: true,
  },
  {
    icon: Smile,
    title: "Estética do Sorriso",
    description:
      "Clareamento dental e lentes de contato dental para um sorriso natural e harmônico.",
  },
  {
    icon: HeartPulse,
    title: "Endodontia",
    description:
      "Tratamento de canal com equipamentos modernos: rápido, eficaz e sem dor.",
  },
  {
    icon: Baby,
    title: "Odontopediatria",
    description:
      "Cuidado gentil e acolhedor para o sorriso das crianças, do primeiro dente em diante.",
  },
  {
    icon: Layers,
    title: "Próteses",
    description:
      "Dentaduras, pontes e restaurações que devolvem função e confiança à sua mordida.",
  },
  {
    icon: ShieldCheck,
    title: "Limpeza e Prevenção",
    description:
      "Limpeza dental e acompanhamento periódico para manter sua saúde bucal em dia.",
  },
];

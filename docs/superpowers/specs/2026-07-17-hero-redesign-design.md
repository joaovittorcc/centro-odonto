# Hero sem scroll-jacking + galeria em seção própria

## Contexto

O Hero passou por duas iterações com uma logo grande centralizada que
encolhia durante o scroll, com a galeria de fotos reais preenchendo o
espaço restante da tela via `flex-1` + `object-cover`. O resultado
cortava as fotos de forma feia (crop excessivo em fotos landscape
esticadas em caixas altas e estreitas) e o efeito como um todo não
agradou visualmente.

## Decisão

Abandonar o scroll-jacking (sem `sticky`, sem JS de scroll, sem
crossfade). Voltar a um hero estático e convencional:

- **Hero**: layout lado a lado (texto à esquerda, card com a logo real
  à direita), igual à primeira versão do site, apenas trocando o
  SmileArc SVG pela logo real da marca. Sem os badges flutuantes de
  avaliação (eram pensados para flanquear uma logo gigante centralizada
  — não fazem sentido lado a lado com texto). A prova social (4.9/79)
  continua na linha de estrelas do hero e, com mais destaque, no card
  `SocialProof` logo abaixo.
- **Nova seção "Conheça a clínica"** (`Gallery.jsx`), logo após o Hero:
  grid de 3 fotos reais (fachada/recepção/consultório) em proporção
  contida (`aspect-[4/3]`, sem esticar pra tela toda), cada uma com
  legenda curta.

## Escopo

- Reescrever `src/components/Hero.jsx` — remove toda a lógica de
  scroll/refs/rAF, `SECTION_HEIGHT_VH`, `ReviewBadge`, `PhotoGallery`.
- Criar `src/components/Gallery.jsx` — grid de fotos própria.
- Adicionar campo `caption` em `src/data/photos.js`.
- Registrar `Gallery` em `App.jsx` entre `Hero` e `SocialProof`.
- Remover CSS morto (`.scrollbar-hide`, não usado mais).

Fora de escopo: mudar a paleta, o conteúdo do restante das seções, ou
reintroduzir qualquer forma de scroll-driven animation no Hero.

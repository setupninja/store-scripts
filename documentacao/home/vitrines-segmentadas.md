# `home/vitrines-segmentadas.js` — Vitrines Segmentadas por Nível na Home

[⬅ Voltar para o Índice Geral](../README.md)

Gerencia a navegação interativa e a identidade visual das vitrines de computadores da Home, divididas entre **PC Gamer** (avulso) e **PC Completo**, com 3 níveis de performance: **Starter**, **Advanced** e **Legend**.

---

## 🎯 O que ele faz
1. **Alternância suave de abas:** Ao clicar em um nível (Starter, Advanced ou Legend), a vitrine atual sofre animação de saída (*fade out*) e a nova vitrine entra (*fade in*).
2. **Troca do fundo do banner:** Troca a imagem de background do banner da seção conforme o nível ativo, com transição de opacidade sem piscar a tela.
3. **Badges de características:** Injeta ícones SVG e micro-textos explicativos para cada nível:
   - **Starter:** Desempenho em HD, Melhor Custo Benefício, Pronto para Upgrades.
   - **Advanced:** Competitivo com FPS Alto, Qualidade em Full HD, Ideal para Streaming.
   - **Legend:** Qualidade Ultra em 2K/4K, Multitarefas intenso, Renderização e edição profissional.
4. **Carrossel 3D Mobile (<= 600px):** Em telas pequenas, transforma a seleção de níveis em um carrossel interativo com suporte a toque (*touch swipe*), botões anterior/próximo e efeito de escala no card central focado.
5. **Pré-carregamento (Preload):** Baixa previamente as imagens de fundo em background para que as trocas de nível sejam instantâneas.

---

## ⚙️ Regras e Nuances Importantes
- **Níveis padrão iniciais:** A categoria PC Gamer inicia no nível *Advanced*; a categoria PC Completo inicia no nível *Starter*.
- **Scroll inteligente:** Ao selecionar um nível, a tela faz rolagem suave automática para centralizar os produtos da aba correspondente.
- **Desconexão do Observer:** Monitora a renderização via MutationObserver e desliga assim que as duas seções são configuradas ou após 20 segundos de segurança.

---

## 🔗 Documentações Relacionadas
- [Colunas do Carrossel das Vitrines](2-produtos-por-vitrine-segmentada.md) — Configura os breakpoints de colunas dos produtos dentro dessas mesmas vitrines.
- [Filtro de PCs da Home](filtro-pcs.md) — Componente de busca localizado acima dessas vitrines.

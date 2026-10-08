# `home/bora-jogar-o-que.js` — Quiz "Bora Jogar o Quê?"

[⬅ Voltar para o Índice Geral](../README.md)

Assistente interativo em 3 passos na Página Inicial que ajuda o cliente a encontrar o computador perfeito com base nos jogos que ele quer jogar.

---

## 🎯 Como Funciona (3 Passos)

1. **Passo 1 — Escolha dos Jogos:**
   - Carrossel horizontal de cards interativos com fotos de jogos (*Battlefield 6, Warzone, GTA V, CS: 2, Valorant, Fortnite, LOL, Free Fire*).
   - Suporta arrastar com o mouse (*drag*), deslizar no toque mobile (*swipe*) e setas laterais.
   - O usuário pode selecionar um ou vários jogos (mínimo de 1).
2. **Passo 2 — Faixa de Preço:**
   - Slider de preço dinâmico. O valor máximo e mínimo são calculados a partir da variável global `CATEGORIES_PRICES.computadores`, já aplicando a dedução de 15% do pagamento no PIX.
3. **Passo 3 — Formato da Máquina:**
   - Escolha entre **Setup Completo** (vai para `/setup-gamer-completo`), **CPU Gamer** avulsa (vai para `/pc-gamer`) ou **Ambos** (vai para `/computadores`).

---

## ⚙️ Inteligência de Hardware e Nuances
- **Tabela de Requisitos:** O script tem uma tabela interna mapeando o processador e placa de vídeo mínimos necessários para rodar cada jogo.
- **Interseção mais exigente:** Quando o usuário seleciona vários jogos (ex: *Free Fire* e *Warzone*), o script calcula a máquina capaz de rodar o jogo **mais pesado** da lista.
- **Mapeamento de Features da Loja:** Converte os requisitos em IDs de filtros nativos da plataforma Dooca:
  - `feature-56055`: IDs das CPUs compatíveis.
  - `feature-56095`: IDs das GPUs compatíveis.
- **Redirecionamento:** Gera uma URL completa com preço máximo, filtros de hardware, ordenação por preço e o parâmetro `game_label=...` e abre em nova aba.

---

## 🔗 Documentações Relacionadas
- [Banner Dinâmico de Jogos na Coleção](../collection/banner-dinamico-bora-jogar-o-que.md) — Recebe o parâmetro `game_label` e renderiza o banner correspondente na página de destino.
- [Remover Banners Genéricos ao Filtrar por Jogo](../collection/remover-banner-computadores-em-game_label.md) — Oculta o banner antigo para exibir a resposta deste quiz.
- [Filtro Técnico de PCs](filtro-pcs.md) — Filtro alternativo na Home para quem prefere escolher peças específicas diretamente.

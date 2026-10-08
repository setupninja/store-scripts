# `collection/remover-banner-computadores-em-game_label.js` — Esconder Banners Genéricos ao Filtrar por Jogo

[⬅ Voltar para o Índice Geral](../README.md)

Script rápido que oculta os banners e carrosséis genéricos da página `/computadores` quando o usuário está navegando com filtro de jogos ativo.

---

## 🎯 O que ele faz
- **Verifica a URL:** Só executa se estiver em `/computadores` e a URL contiver `game_label=`.
- **Injeta CSS de ocultação:** Esconde o `.collection-banner` e qualquer `.custom-carousel-general-container` via `display: none !important`.
- **Ajusta o espaçamento:** Define `padding-top: 30px !important` na coleção para acomodar o novo banner de jogos.
- **Auto-limpeza:** Remove a própria tag `<script>` do DOM logo após injetar o estilo, sem deixar rastros no documento.

---

## 🔗 Documentações Relacionadas
- [Banner Dinâmico de Jogos na Coleção](banner-dinamico-bora-jogar-o-que.md) — O banner que é colocado no lugar do banner padrão que este script esconde.
- [Bora Jogar o Quê? (Home)](../home/bora-jogar-o-que.md) — Assistente que inicia esse fluxo adicionando `game_label` na URL.

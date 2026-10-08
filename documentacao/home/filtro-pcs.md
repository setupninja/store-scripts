# `home/filtro-pcs.js` — Filtro de Configurações Técnicas da Home

[⬅ Voltar para o Índice Geral](../README.md)

Componente de filtro avançado na Página Inicial com 4 seletores interdependentes: **Placa de Vídeo**, **Processador**, **Memória RAM** e **Armazenamento**.

---

## 🎯 O que ele faz
1. **Lê o catálogo da loja:** Acessa os dados brutos de produtos da variável global `PCS_BAGY_DATA`.
2. **Preenche os selects:** Extrai todas as opções reais cadastradas para cada um dos 4 componentes:
   - GPU (feature ID `56095`)
   - CPU (feature ID `56055`)
   - Memória RAM (feature ID `54172`)
   - Armazenamento (feature ID `54143`)
3. **Filtro cruzado dinâmico:** Quando o cliente escolhe uma opção (ex: uma GPU específica), o script reavalia os produtos e atualiza os outros 3 seletores para mostrar **apenas peças que realmente existem combinadas com aquela GPU**.
4. **Redirecionamento:** Ao clicar em "BUSCAR", gera a URL de busca da Dooca com os parâmetros de feature selecionados (`/computadores?feature-...=...`).

---

## ⚙️ Regras e Nuances Importantes
- **Prevenção de loop:** Usa a variável global `window.fltpc02ii = true` para evitar que o componente seja injetado mais de uma vez.
- **Lazy loading de dados:** Os dados só são processados quando o usuário clica ou foca em um dos selects pela primeira vez, mantendo a abertura da página rápida e sem travamentos.
- **Sugestões do Ninja:** Destaca as peças de melhor custo-benefício com o emoji de fogo (*"🔥"*).
- **Ordenação humana:** Processadores são ordenados por família (Ryzen primeiro, depois Intel); memórias e SSDs são ordenados por capacidade numérica (não por ordem alfabética pura).
- **Botão Limpar:** O botão "Limpar opções" reseta todos os selects para o estado inicial.

---

## 🔗 Documentações Relacionadas
- [Quiz "Bora Jogar o Quê?"](bora-jogar-o-que.md) — Filtro alternativo na Home para quem prefere escolher por jogo em vez de peças técnicas.
- [Vitrines Segmentadas](vitrines-segmentadas.md) — Vitrines de computadores posicionadas na mesma Home.

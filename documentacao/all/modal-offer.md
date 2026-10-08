# `all/modal-offer.js` — Modal de Oferta (Exit Intent)

[⬅ Voltar para o Índice Geral](../README.md)

Pop-up de oferta relâmpago implementado como Web Component nativo (`<offer-modal>`) que abre quando o visitante tenta sair do site em computadores.

---

## 🎯 O que ele faz
1. **Detecta intenção de saída:** Se o usuário move o cursor para fora da tela pelo topo (`clientY <= 0`), o modal é aberto.
2. **Exibe uma oferta aleatória:** Sorteia um produto ativo da lista global `MODAL_POPUP_PRODUCTS.products` e monta a vitrine com foto, preço original, preço promocional, porcentagem de desconto e link direto de compra.
3. **Adiciona UTM:** Anexa automaticamente `?utm_source=modal-oferta` ao link do produto.

---

## ⚙️ Regras e Nuances Importantes
- **Tempo mínimo:** O modal **só fica elegível após 2 minutos** (120 segundos) navegando no site. Antes disso, o evento de saída é ignorado.
- **Apenas Desktop:** Não abre em telas menores ou iguais a 900px (`window.innerWidth <= 900`) para não prejudicar a usabilidade mobile.
- **Uma vez por sessão:** Quando exibido, grava `sessionStorage.setItem("modal_offer_shown", "true")`. Se o usuário fechar e continuar navegando, não aparece de novo na mesma sessão.
- **Shadow DOM:** Todo o CSS e HTML fica encapsulado em um Shadow Root para não conflitar com estilos do tema da loja.
- **Clique no card:** Clicar em qualquer lugar do diálogo (exceto no botão fechar) abre o produto em uma nova aba.

---

## 📦 Variáveis Globais Utilizadas
- `ACTUAL_PROMOTION`: Define o fundo do modal (`offersPopupBg`), cor de fundo (`rectColor`) e imagem da logo da campanha.
- `MODAL_POPUP_PRODUCTS`: Objeto com a lista de produtos elegíveis (`products: [{ n, p, pc, u, i, on }]`).
- `FILE_IMG_PREFIX`: Prefixo da URL do CDN onde as imagens estão hospedadas.

---

## 🔗 Documentações Relacionadas
- [Estilo da Tag de Promoção](../product/estilo-tag-promo.md) — Utiliza as mesmas configurações da variável `ACTUAL_PROMOTION`.
- [Mini Banner da Promoção](../product/mini-banner-info.md) — Utiliza o banner cadastrado em `ACTUAL_PROMOTION`.

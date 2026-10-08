# `product/estilo-tag-promo.js` — Estilo da Tag de Promoção no Produto

[⬅ Voltar para o Índice Geral](../README.md)

Customiza a tag oficial de promoção da plataforma Dooca no topo do produto com a identidade visual da campanha ativa.

---

## 🎯 O que ele faz
1. **Monitora a tag nativa:** Procura o elemento da tag oficial da loja (`.product-info-content .TA--tag [data-tag="16987"]`).
2. **Aplica as regras da campanha ativa:** Pega as configurações da variável global `ACTUAL_PROMOTION` e altera:
   - Cor de fundo: `ACTUAL_PROMOTION.primaryColor`
   - Cor do texto: `ACTUAL_PROMOTION.tagTextColor` (padrão `#fff`)
   - Texto exibido: `ACTUAL_PROMOTION.title`
   - Tooltip do mouse: `ACTUAL_PROMOTION.tagTitle`
3. **Desliga o observer:** Assim que estiliza a tag, desconecta o `MutationObserver`.

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Páginas de produto (não roda na Home `/`).
- **Timeout de segurança:** Desliga a observação após 20 segundos se o produto não tiver a tag de promoção configurada no painel.

---

## 🔗 Documentações Relacionadas
- [Modal de Oferta](../all/modal-offer.md) — Também consome as cores e dados de `ACTUAL_PROMOTION`.
- [Mini Banner da Promoção](mini-banner-info.md) — Exibe o banner oficial da mesma promoção na página do produto.
- [Selo "Entrega FULL"](../all/tag-full.md) — Tag alternativa que não é aplicada quando esta tag oficial de promoção já está presente.

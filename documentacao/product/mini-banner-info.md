# `product/mini-banner-info.js` — Mini Banner da Promoção no Produto

[⬅ Voltar para o Índice Geral](../README.md)

Carrega o mini banner oficial da campanha ativa na área lateral do produto, com suporte a efeito de carregamento (*skeleton loading*).

---

## 🎯 O que ele faz
1. **Lê o banner ativo:** Pega o nome do arquivo em `ACTUAL_PROMOTION.productBanner` e monta a URL com `FILE_IMG_PREFIX`.
2. **Skeleton Loader:** Enquanto a imagem baixa do CDN, mantém o elemento de placeholder (`#setupHighlightSkeleton`) visível.
3. **Exibição suave:**
   - No `onload`: esconde o skeleton e revela o link com o banner (`#setupHighlightLink`).
   - No `onerror`: esconde o container `#setupHighlightWrapper` para não deixar imagem quebrada visível.
4. **Link com UTM:** Direciona para `https://www.setupninja.com.br/promocao?utm_source=product_minibanner`.

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Roda no `DOMContentLoaded` apenas onde existir o elemento `#setupHighlightWrapper` e houver banner configurado em `ACTUAL_PROMOTION`.

---

## 🔗 Documentações Relacionadas
- [Estilo da Tag de Promoção](estilo-tag-promo.md) — Tag de texto que acompanha a mesma campanha deste mini banner.
- [Modal de Oferta](../all/modal-offer.md) — Modal de saída que compartilha os dados de `ACTUAL_PROMOTION`.

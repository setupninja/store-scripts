# `product/title-compre-tambem.js` — Título Completo no "Compre Junto"

[⬅ Voltar para o Índice Geral](../README.md)

Script utilitário que copia o texto completo dos produtos para o atributo `title` no bloco "Compre Junto" / "Order Bump", permitindo ler nomes longos cortados pelo layout.

---

## 🎯 O que ele faz
1. **Monitora o bloco de compra conjunta:** O `MutationObserver` vigia a página até detectar o elemento `.bagy-buy-together .products-order-bump`.
2. **Aguarda 2 segundos:** Um `setTimeout` garante que todo o HTML do widget nativo da Bagy/Dooca terminou de ser desenhado na tela.
3. **Aplica o atributo `title`:**
   - No produto principal: copia `textContent` para `title` em `.product-main .sc-buy-together .info .title`.
   - Nos produtos complementares: faz o mesmo em cada item de `.product-wrapper-pivot .sc-buy-together .info .title`.
4. **Benefício para o usuário:** Quando um nome de produto longo é truncado com reticências (`...`), basta repousar o cursor do mouse sobre ele para ver o nome completo em uma tooltip nativa do navegador.

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Roda apenas em páginas de produto que possuam a funcionalidade de "Compre Junto" ativada.
- **Encerramento:** Desconecta o MutationObserver imediatamente após encontrar o elemento ou após o timeout de 60 segundos.

---

## 🔗 Documentações Relacionadas
- [Barra Fixa de Compra no Rodapé](product-action-bar-quando-scroll.md) — Outro elemento focado em melhorar a conversão e experiência de compra do produto.

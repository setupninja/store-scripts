# `product/product-action-bar-quando-scroll.js` — Barra Fixa de Compra no Rodapé

[⬅ Voltar para o Índice Geral](../README.md)

Faz subir uma barra fixa no rodapé da tela com os valores e botão de compra do produto quando o usuário rola a página para baixo e perde o botão principal de vista.

---

## 🎯 O que ele faz
1. **Captura os valores do produto:** Extrai o preço original riscado, o preço à vista no PIX e os dados de parcelamento sem juros do formulário `#form-add-cart`.
2. **Monta a barra flutuante:** Adiciona um elemento fixo no rodapé (`.alternative-pd-style`) contendo os preços formatados, ícone do PIX e botão "Comprar".
3. **Monitora a rolagem com IntersectionObserver:**
   - Se o bloco de compra principal do produto estiver visível na tela: a barra fica recolhida (`bottom: -400px`).
   - Se o bloco de compra principal sair da tela (usuário rolou para baixo): a barra sobe suavemente (`bottom: -1px`).
4. **Repocisionamento do botão de WhatsApp:** Se houver um botão flutuante de chat/WhatsApp na tela (`.fab-button`), ele é empurrado para cima quando a barra aparece, impedindo que os dois elementos fiquem sobrepostos.
5. **Feedback no clique:** Ao clicar no botão de compra da barra, exibe um spinner de loading giratório por 4 segundos enquanto o formulário oficial do carrinho é submetido.

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Páginas de produto (todas exceto a Home `/`).
- **Margem no rodapé:** Adiciona `padding-bottom: 95px` ao rodapé oficial do site para evitar que a barra fixa tampe os links do rodapé quando o usuário chega ao final da página.

---

## 🔗 Documentações Relacionadas
- [Descrição Dinâmica dos PCs (V2)](des-dinamica-pcs-v2.md) — Conteúdo longo de leitura onde esta barra mais gera conversão ao acompanhar o usuário durante o scroll.

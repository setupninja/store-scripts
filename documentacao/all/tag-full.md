# `all/tag-full.js` — Selo "Entrega FULL"

[⬅ Voltar para o Índice Geral](../README.md)

Insere dinamicamente uma tag verde com o texto **"Entrega FULL"** no canto dos cards de produtos catalogados.

---

## 🎯 O que ele faz
- Procura todos os elementos `.product-card` na página.
- Localiza o container de tags de cada produto (`.product-image .product-tags`).
- Insere um botão/etiqueta verde com ícone e texto "Entrega FULL", que redireciona o usuário para a página de entrega rápida da loja (`/entrega-full-rj`).

---

## ⚙️ Regras e Nuances Importantes
- **Condição de ativação:** O script só roda se:
  - O parâmetro `utm_source=full` estiver presente na URL atual; **OU**
  - O navegador tiver `localStorage.getItem("habilitado-full") === "true"`.
- **Prevenção de duplicidade:** Não insere a tag se o card já tiver `#entrega-full-tag` ou se já tiver a tag de campanha oficial da plataforma Dooca (`[data-tag="16987"]`).
- **Comportamento do clique:** Usa `stopPropagation()` e `preventDefault()` para que clicar na tag leve para `/entrega-full-rj` sem disparar o clique padrão que abriria a página do produto.
- **Responsividade inline:** Aplica espaçamentos e paddings diferentes via JavaScript dependendo da largura da tela (`window.innerWidth`).

---

## 🔗 Documentações Relacionadas
- [Estilo da Tag de Promoção](../product/estilo-tag-promo.md) — Tag nativa concorrente que tem prioridade sobre a tag full.

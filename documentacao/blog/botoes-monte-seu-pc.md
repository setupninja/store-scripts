# `blog/botoes-monte-seu-pc.js` — Banners "Monte seu PC" no Blog

[⬅ Voltar para o Índice Geral](../README.md)

Insere chamadas promocionais para a ferramenta "Monte seu PC" dentro dos artigos do blog da loja.

---

## 🎯 O que ele faz
1. **No feed lateral ("Veja Também"):** Adiciona um card de post extra no final da lista (`.blog-filter .blog-filter-item .posts`) com a foto do banner e o link para a página `/monte-seu-pc`.
2. **Antes das Tags do Post:** Adiciona uma caixa de texto destacando a montagem sob medida, garantia e desconto de 15% no PIX, com um botão direcionando para `/monte-seu-pc`.

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Só roda se existir o elemento `.blog` e o `body` tiver a classe `page--blog-post`.
- **Rastreamento UTM:** O link adicionado recebe automaticamente o slug do post atual:
  - No feed lateral: `?utm_source=blog-{slug}`
  - No bloco de texto: `?utm_source=blog_tags-{slug}`
- **MutationObserver com desligamento:** Como os elementos do blog podem demorar para carregar, o script observa a página. Assim que insere os dois blocos, desconecta o observador imediatamente para poupar memória.

---

## 🔗 Documentações Relacionadas
- [Remover Card do Monte seu PC](../collection/remover-monte-seu-pc-card.md) — Garante que o card do Monte seu PC não apareça por engano na listagem normal de computadores prontos.

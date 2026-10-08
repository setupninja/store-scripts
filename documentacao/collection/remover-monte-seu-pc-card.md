# `collection/remover-monte-seu-pc-card.js` — Ocultar Card "Monte seu PC" nas Coleções

[⬅ Voltar para o Índice Geral](../README.md)

Remove o card de configuração do "Monte seu PC" da grade de produtos prontos nas coleções.

---

## 🎯 O que ele faz
1. **Identifica o card:** Monitora a grade de produtos com um `MutationObserver`.
2. **Procura o texto:** Quando encontra um título de produto (`.product-card .product-title p.text`) que contém o texto `"MONTE SEU PC:"`:
   - Acha o container de coluna correspondente (`.col-6`).
   - Remove o elemento do DOM (`.remove()`).
3. **Desconecta o observador:** Assim que remove o card ou atinge o limite de segurança de 20 segundos, desliga o `MutationObserver`.

---

## ⚙️ Regras e Nuances Importantes
- **Por que é necessário?** No painel da loja, o "Monte seu PC" está cadastrado como um produto para integrar o fluxo de pedido. Porém, ele não deve ser listado visualmente como um computador já montado com preço fixo no meio da vitrine.

---

## 🔗 Documentações Relacionadas
- [Banners "Monte seu PC" no Blog](../blog/botoes-monte-seu-pc.md) — Exemplo de onde a ferramenta é divulgada de forma correta e intencional.

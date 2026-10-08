# `collection/banner-dinamico-bora-jogar-o-que.js` — Banner Dinâmico de Jogos na Coleção

[⬅ Voltar para o Índice Geral](../README.md)

Cria um banner visual moderno no topo da página de computadores quando o usuário vem da ferramenta da Home com jogos selecionados.

---

## 🎯 O que ele faz
1. **Lê os jogos da URL:** Pega o parâmetro `?game_label=cs,valorant...` na rota `/computadores`.
2. **Substitui o banner padrão:** Remove o container original do banner da categoria (`.collection-banner .container-fluid`) e injeta o novo banner customizado.
3. **Cria colagem com corte diagonal:** Mostra imagens recortadas em 15 graus (`skewX`) dos jogos selecionados lado a lado.
4. **Gera título dinâmico:** Escreve um título contextualizado, por exemplo: *"PCs GAMER PARA CS:2 E VALORANT"*.
5. **Auto-scroll:** Quando a listagem de computadores (`.collection-content`) termina de carregar, rola a página suavemente até os produtos.

---

## ⚙️ Regras e Nuances Importantes
- **Jogos suportados:** Mapeia slugs curtos para nomes e imagens oficiais: `cs` (CS:2), `fortnite`, `valorant`, `gta` (GTA V), `bf6` (Battlefield 6), `cod` (Warzone), `lol` (League of Legends) e `freefire`.
- **Tratamento de bordas:** Ajusta os cantos externos (`hide-corner` ou `single-hide-corner`) para que a rotação das imagens não vaze para fora da moldura do container.
- **Timeout do Observer:** Tenta rolar até o conteúdo da coleção e desliga o MutationObserver assim que consegue ou após no máximo 10 segundos.

---

## 🔗 Documentações Relacionadas
- [Bora Jogar o Quê? (Home)](../home/bora-jogar-o-que.md) — Assistente que envia o parâmetro `game_label` para esta página.
- [Remover Banner Padrão em Game Label](remover-banner-computadores-em-game_label.md) — Esconde os carrosséis e banners antigos para dar espaço a este banner.

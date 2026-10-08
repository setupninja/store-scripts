# Documentação dos Scripts — Setup Ninja

Guia direto e objetivo de todos os scripts front-end utilizados na loja virtual Setup Ninja (plataforma Dooca / Bagy).

---

## 📌 O que vai para o repositório remoto?

Analisando o [`.gitignore`](file:///c:/Users/Usuário/Desktop/Setup%20Org/store-scripts/.gitignore):
- **Ignorados:** `off/` (scripts desativados ou rascunhos), `backup/`, `backups/`, `.agents/`, `.vscode/`, `node_modules/`, arquivos de log e ambientes.
- **Rastreados (20 scripts):** Apenas os scripts das pastas funcionais `all/`, `blog/`, `collection/`, `home/` e `product/`.

---

## 🗂️ Estrutura e Resumo dos Scripts

As documentações estão organizadas em pastas por fluxo/área do site:

### 🌐 1. Scripts Globais (`/all`)
Scripts que rodam em múltiplas páginas do site.
- [**`all/modal-offer.js`**](all/modal-offer.md): Web Component `<offer-modal>` de pop-up de oferta com detecção de saída da página (*exit-intent*) após 2 minutos em desktop.
- [**`all/tag-full.js`**](all/tag-full.md): Injeta a etiqueta "Entrega FULL" nos cards de produto caso ativado via `localStorage` ou `utm_source=full`.

### 📝 2. Blog (`/blog`)
Scripts para os artigos do blog.
- [**`blog/botoes-monte-seu-pc.js`**](blog/botoes-monte-seu-pc.md): Adiciona chamadas e banners direcionando para o "Monte seu PC" no feed lateral e antes das tags do artigo.

### 🛍️ 3. Coleções e Listagens (`/collection`)
Scripts para as páginas de catálogo e categorias.
- [**`collection/banner-dinamico-bora-jogar-o-que.js`**](collection/banner-dinamico-bora-jogar-o-que.md): Monta o banner com imagens diagonais dos jogos filtrados na Home via `game_label`.
- [**`collection/botao-limpar-filtros.js`**](collection/botao-limpar-filtros.md): Feature flag mantida no repositório (atualmente desativada/arquivo vazio).
- [**`collection/remover-banner-computadores-em-game_label.js`**](collection/remover-banner-computadores-em-game_label.md): Esconde os banners padrão de `/computadores` quando o usuário filtra por jogos.
- [**`collection/remover-monte-seu-pc-card.js`**](collection/remover-monte-seu-pc-card.md): Remove o card de configuração do "Monte seu PC" da grade de computadores normais.

### 🏠 4. Página Inicial (`/home`)
Scripts específicos da Home (`/`).
- [**`home/2-produtos-por-vitrine-segmentada.js`**](home/2-produtos-por-vitrine-segmentada.md): Ajusta a quantidade de produtos exibidos por linha no Owl Carousel das vitrines segmentadas.
- [**`home/bora-jogar-o-que.js`**](home/bora-jogar-o-que.md): Quiz interativo de 3 passos que descobre o PC ideal pelo jogo, orçamento e formato (CPU ou Completo).
- [**`home/filtro-pcs.js`**](home/filtro-pcs.md): Filtro técnico com 4 seletores (GPU, CPU, RAM, SSD) que se atualizam em tempo real conforme a escolha.
- [**`home/vitrines-segmentadas.js`**](home/vitrines-segmentadas.md): Controla as vitrines divididas por categoria (Gamer / Completo) e nível (Starter, Advanced, Legend) com carrossel 3D mobile.

### 💻 5. Página de Produto (`/product`)
Scripts para a página de detalhes do produto.
- [**`product/des-dinamica-pcs-v2.js`**](product/des-dinamica-pcs-v2.md): Versão moderna da descrição dinâmica: mostra peças, selos de tecnologia, tabela animada de FPS e vídeo do YouTube.
- [**`product/desc-dinamica-pc-square.md`**](product/desc-dinamica-pc-square.md): Ajusta fotos dos componentes e cores na descrição dos PCs da linha Square com base na cor da URL.
- [**`product/descricao-dinamica-dos-pcs.md`**](product/descricao-dinamica-dos-pcs.md): Versão de produção minificada da descrição dinâmica dos computadores.
- [**`product/estilo-tag-promo.md`**](product/estilo-tag-promo.md): Atualiza cores e texto da tag oficial de promoção conforme a campanha ativa.
- [**`product/mini-banner-info.md`**](product/mini-banner-info.md): Exibe o mini banner da campanha no topo do produto com skeleton loading.
- [**`product/product-action-bar-quando-scroll.md`**](product/product-action-bar-quando-scroll.md): Barra de compra fixa no rodapé ao rolar a página, reposicionando o botão do WhatsApp.
- [**`product/qa-section-minify.md`**](product/qa-section-minify.md): Sistema de Perguntas & Respostas em produção (minificado, com IndexedDB e WhatsApp).
- [**`product/qa-section-normal.md`**](product/qa-section-normal.md): Código-fonte completo e legível do sistema de Perguntas & Respostas.
- [**`product/title-compre-tambem.md`**](product/title-compre-tambem.md): Adiciona atributo `title` para nomes longos cortados no widget "Compre Junto".

---

## 🔗 Fluxos Integrados entre Scripts

Vários scripts conversam entre si compartilhando regras, parâmetros ou variáveis globais:

1. **Fluxo de Recomendação por Jogos:**
   [`home/bora-jogar-o-que.js`](home/bora-jogar-o-que.md) ➔ gera URL com `game_label` ➔ [`collection/banner-dinamico-bora-jogar-o-que.js`](collection/banner-dinamico-bora-jogar-o-que.md) cria o banner de jogos ➔ [`collection/remover-banner-computadores-em-game_label.js`](collection/remover-banner-computadores-em-game_label.md) esconde os banners genéricos.

2. **Fluxo das Vitrines Segmentadas:**
   [`home/vitrines-segmentadas.js`](home/vitrines-segmentadas.md) troca abas e fundos ➔ [`home/2-produtos-por-vitrine-segmentada.js`](home/2-produtos-por-vitrine-segmentada.md) ajusta as colunas do carrossel.

3. **Fluxo de Campanhas Promocionais:**
   A variável global `ACTUAL_PROMOTION` alimenta simultaneamente [`all/modal-offer.js`](all/modal-offer.md), [`product/estilo-tag-promo.js`](product/estilo-tag-promo.md) e [`product/mini-banner-info.js`](product/mini-banner-info.md).

4. **Fluxo de Descrição dos PCs:**
   [`product/des-dinamica-pcs-v2.js`](product/des-dinamica-pcs-v2.md) (versão atual) substitui [`product/descricao-dinamica-dos-pcs.js`](product/descricao-dinamica-dos-pcs.md) (versão legada/minificada), enquanto [`product/desc-dinamica-pc-square.js`](product/desc-dinamica-pc-square.md) trata a linha exclusiva Square.

5. **Fluxo de Perguntas & Respostas:**
   [`product/qa-section-normal.js`](product/qa-section-normal.md) é a versão fonte e legível que compila em [`product/qa-section-minify.js`](product/qa-section-minify.md).

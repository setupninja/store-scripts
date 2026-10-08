# `product/descricao-dinamica-dos-pcs.js` — Descrição Dinâmica dos PCs (V1 - Minificada)

[⬅ Voltar para o Índice Geral](../README.md)

Versão anterior e minificada para produção do script de descrição dinâmica dos computadores.

---

## 🎯 O que ele faz
Executa a mesma lógica essencial da versão 2:
- Detecta o computador pelo título da página;
- Injeta cards ilustrados de hardware divididos em tiers de desempenho (B, A e S);
- Mostra a tabela de estimativa de FPS e o player de vídeo do YouTube;
- Adiciona o link direto de WhatsApp com saudação contextual.

---

## ⚖️ Diferenças entre V1 e V2
- **Identificação do produto:** A V1 se baseia apenas no `document.title`, enquanto a [V2](des-dinamica-pcs-v2.md) combina o título com a leitura do SKU (`REF:`).
- **Tipografia:** A V1 usa fontes Open Sans / Poppins; a V2 padronizou com Barlow Condensed / Inter.
- **Formatação:** A V1 está minificada em uma única linha densa; a V2 está estruturada e legível para evolução contínua.

---

## 🔗 Documentações Relacionadas
- [Descrição Dinâmica dos PCs (V2)](des-dinamica-pcs-v2.md) — Versão atual e recomendada para manutenção.
- [Descrição da Linha Square](desc-dinamica-pc-square.md) — Versão adaptada para a linha de gabinetes Square.

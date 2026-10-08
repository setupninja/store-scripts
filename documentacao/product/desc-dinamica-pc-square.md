# `product/desc-dinamica-pc-square.js` — Descrição da Linha PC Square

[⬅ Voltar para o Índice Geral](../README.md)

Script exclusivo para a linha de computadores **PC Gamer Square**, atualizando dinamicamente as fotos dos componentes e as cores de destaque de acordo com a variação de cor da página.

---

## 🎯 O que ele faz
1. **Detecta a cor pela URL:** Lê o segmento final da URL após `geometric-` (ex: `verde`, `preto`, `branco` ou `amarelo`). Se não identificar, usa `branco` por padrão.
2. **Atualiza as fotos das peças:** Altera o `src` das imagens do gabinete, placa de vídeo, placa mãe, memória RAM, SSD, fonte, processador e ângulos do gabinete para as fotos correspondentes àquela cor.
3. **Aplica cor temática:** Altera a cor de destaque dos blocos de detalhe para a cor da variação:
   - Verde: `#1aff00`
   - Preto: `rgb(0, 97, 223)`
   - Branco: `rgb(255, 255, 255)`
   - Amarelo: `#fff000`

---

## ⚙️ Regras e Nuances Importantes
- **Páginas Ativas:** Só roda se a URL contiver `pc-gamer-square` e existir o container `.stpnj-desc-main-div`.
- **Por que é separado?** A linha Square possui gabinetes geométricos customizados e peças com acabamento visual temático exclusivo que não seguem o layout padrão dos demais computadores.

---

## 🔗 Documentações Relacionadas
- [Descrição Dinâmica dos PCs (V2)](des-dinamica-pcs-v2.md) — Script usado para todos os outros modelos de PC Gamer da loja.

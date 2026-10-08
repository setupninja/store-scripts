# `home/2-produtos-por-vitrine-segmentada.js` — Colunas do Carrossel das Vitrines

[⬅ Voltar para o Índice Geral](../README.md)

Reconfigura o plugin Owl Carousel para definir a quantidade ideal de produtos visíveis por linha nas vitrines segmentadas da Página Inicial.

---

## 🎯 O que ele faz
1. **Seleciona as vitrines:** Busca os sliders das vitrines Starter, Advanced e Legend das linhas Gamer e Completo:
   - `.vitrine-pcs-gamer-starter .products-tabs-slider`
   - `.vitrine-pcs-gamer-advanced .owl-carousel`
   - `.vitrine-pcs-gamer-legend .owl-carousel`
   - `.vitrine-pcs-completo-starter .products-tabs-slider`
   - `.vitrine-pcs-completo-advanced .owl-carousel`
   - `.vitrine-pcs-completo-legend .owl-carousel`
2. **Destrói instâncias anteriores:** Se o Owl Carousel já estiver rodando no elemento, aciona `destroy.owl.carousel` para evitar instâncias duplicadas.
3. **Aplica novos breakpoints:**
   - Telas até 359px: **1 produto**;
   - 360px a 639px: **2 produtos**;
   - 640px a 1219px: **3 produtos**;
   - 1220px a 1365px: **4 produtos**;
   - 1366px em diante: **5 produtos**.

---

## ⚙️ Regras e Nuances Importantes
- **Dependências:** Depende da existência do jQuery (`$`) e do plugin Owl Carousel carregados previamente no tema.
- **Momento de execução:** Executado no `DOMContentLoaded`.

---

## 🔗 Documentações Relacionadas
- [Vitrines Segmentadas da Home](vitrines-segmentadas.md) — Script principal que gerencia as abas, fundos e a troca de níveis dessas mesmas vitrines.

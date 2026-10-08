# `product/des-dinamica-pcs-v2.js` — Descrição Dinâmica dos PCs (V2)

[⬅ Voltar para o Índice Geral](../README.md)

Versão moderna da descrição detalhada dos computadores gamer. Transforma a área de texto padrão da loja em uma página técnica completa com peças ilustradas, destaques de tecnologia, tabela de FPS estimada e vídeo de gameplay do YouTube.

---

## 🎯 O que ele faz
1. **Identifica o computador:** Lê o SKU (`.product-reference span.text`) e o título da página (`document.title`) para encontrar o modelo exato (Shadow, Blade, Kratos, Thor, Loki, etc.) na sua base interna de dados.
2. **Exibe os 4 Benefícios da Loja:** Cards institucionais destacando computador pronto para jogar, peças de primeira linha, 1 ano de garantia e suporte vitalício.
3. **Cards de Peças de Hardware:** Renderiza cards com fotos dedicadas de Processador, Placa de Vídeo, Placa Mãe, Memória RAM, Fonte, Gabinete e Water Cooler.
4. **Destaques Tecnológicos Interativos:** Detecta automaticamente recursos como **DLSS**, **FSR**, **Ray Tracing**, **3D V-Cache**, **80 Plus** e **AM4** através de expressões regulares, criando caixas expansíveis com explicação de cada tecnologia.
5. **Tabela de FPS:** Lista a taxa de quadros estimada nos jogos mais populares com barras de progresso animadas.
6. **Vídeo de Gameplay:** Embute um player do YouTube demonstrando o desempenho real do hardware em ação.
7. **Botão de WhatsApp contextual:** Cria link direto para o WhatsApp oficial com saudação personalizada pelo horário (*"Bom dia!"* ou *"Boa noite!"*) já citando o nome do computador.

---

## ⚙️ Regras e Nuances Importantes
- **Exceções:** Não roda na linha "Square" (que possui script próprio) ou se o título não tiver "pc gamer".
- **Botão Olho (Revelar/Ocultar):** Possui um ícone de olho que permite ao cliente ocultar ou mostrar os balões de destaque tecnológico para visualizar apenas a foto da peça.
- **Animação de chamada:** A cada 10 segundos, faz um card de tecnologia pulsar aleatoriamente (`scalePulse`) para atrair o olhar do visitante.
- **Tentativas com MutationObserver:** Faz até 20 tentativas com intervalo de 500ms para encontrar a área de descrição antes de desistir.

---

## 🔗 Documentações Relacionadas
- [Descrição Dinâmica dos PCs (V1 - Minificada)](descricao-dinamica-dos-pcs.md) — Versão anterior do mesmo script.
- [Descrição da Linha Square](desc-dinamica-pc-square.md) — Script específico para os modelos PC Gamer Square.
- [Barra de Compra ao Rolar a Página](product-action-bar-quando-scroll.md) — Barra que acompanha o cliente enquanto ele lê esta descrição.

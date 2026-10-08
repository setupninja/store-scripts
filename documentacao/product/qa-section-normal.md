# `product/qa-section-normal.js` — Perguntas & Respostas (Código Fonte)

[⬅ Voltar para o Índice Geral](../README.md)

Código-fonte formatado e completo do módulo de **Perguntas & Respostas**. É a versão base utilizada pelos desenvolvedores para leitura, manutenção e evolução antes de minificar para produção.

---

## 🎯 Arquitetura e Funções Principais
- **Constantes:** `API_URL` (`https://customers-stn.vercel.app/`), `PAGE_SIZE = 10` e limites de corte de texto responsivos (`MAX_PREVIEW`: 80px mobile, 130px tablet, 200px desktop).
- **Sanitização:** `sanitize()` normaliza texto em Unicode `NFKC` e remove caracteres especiais; `sanitizePhone()` e `isValidBRPhone()` realizam validação rigorosa de números telefônicos brasileiros contra um `Set` de DDDs oficiais.
- **Identificação do Cliente:** `createClientUUID()` gera UUID v4 com `crypto.getRandomValues()` e salva no `localStorage`.
- **IndexedDB (`SetupNinjaDB`):**
  - `comment_likes`: grava comentários curtidos localmente para travar o botão;
  - `qa_section`: armazena o cache das perguntas por 20 minutos (1.200.000ms);
  - `answer_status`: armazena perguntas enviadas localmente com status pendente.
- **Modais:**
  - `openContactModal()`: coleta Nome e Telefone do usuário com máscara automática;
  - `openAllQuestionsModal()`: modal paginado com rolagem infinita e spinner de shuriken.

---

## 🔗 Documentações Relacionadas
- [Perguntas & Respostas (Minificada)](qa-section-minify.md) — Versão compilada/minificada que é colocada em produção na loja.

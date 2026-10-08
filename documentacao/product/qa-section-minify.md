# `product/qa-section-minify.js` — Perguntas & Respostas (Produção)

[⬅ Voltar para o Índice Geral](../README.md)

Versão minificada em produção do sistema de **Perguntas & Respostas** nos produtos. Permite tirar dúvidas técnicas, receber respostas oficiais no WhatsApp e curtir respostas da comunidade.

---

## 🎯 O que ele faz
1. **Listagem com cache:** Busca as perguntas públicas respondidas do produto na API e salva em cache no IndexedDB (`SetupNinjaDB`) por 20 minutos.
2. **Envio de pergunta:**
   - Campo com contador dinâmico (8 a 300 caracteres).
   - Modal com Nome e Telefone para notificação automática via WhatsApp.
   - Salva a pergunta no backend (`https://customers-stn.vercel.app/questions/ask`).
3. **Estado de espera em tempo real:** Mostra a pergunta recém-enviada no topo com animação de brilho (*shimmer*) e o aviso *"Aguardando resposta"*.
4. **Sistema de Curtidas (Likes):** Botão de like com debounce e trava no IndexedDB para impedir curtidas repetidas da mesma pessoa.
5. **Modal com Paginação Infinita:** Botão "Ver todas as perguntas" abre um modal com spinner de shuriken que vai carregando mais páginas conforme o usuário rola até o fim da lista.

---

## ⚙️ Regras e Nuances Importantes
- **Validação de Celular:** Valida comprimento (10 ou 11 dígitos), DDDs válidos do Brasil (11 a 99), nono dígito obrigatório em celulares e descarta números repetidos (ex: `99999999999`).
- **UUID de Cliente:** Gera e guarda um identificador único anônimo em `localStorage.getItem("client_uuid")` caso o visitante não esteja logado na loja.

---

## 🔗 Documentações Relacionadas
- [Perguntas & Respostas (Código Normal)](qa-section-normal.md) — Versão descompactada, comentada e ideal para manutenção técnica deste mesmo script.
- [Descrição Dinâmica dos PCs (V2)](des-dinamica-pcs-v2.md) — Fica localizada logo acima da seção de perguntas e respostas.

(async () => {
    //if (localStorage.getItem("dev-mode") !== "true") return;

    const DB_NAME = "SetupNinjaDB";
    const STORE_NAME = "answer_status";
    const IS_MOBILE = window.innerWidth <= 1199;

    const ICONS = {
        close: `<svg aria-hidden="true" width="18" viewBox="0 0 1024 1024" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496"/>
    </svg>`,
        clock: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.493 13.618c.123.31.15.648.079.973l-.888 2.742a.833.833 0 0 0 1.03.973l2.844-.832c.307-.06.624-.034.916.077a8.333 8.333 0 1 0-3.98-3.933" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.575 7.5a2.5 2.5 0 0 1 4.859.833c0 1.667-2.5 2.5-2.5 2.5M10 14.167h.008" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff"
      stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0m-10.47-5.674A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
    </svg>`,
        answer: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#ff7300" fill-opacity=".7" fill-rule="evenodd" d="M0 0h1v11h11v1H0z"></path>
      </svg>`,
    };

    const style = document.createElement("style");
    style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    .nh-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s ease;
      z-index: 9998;
    }

    .nh-overlay.nh-visible {
      opacity: 1;
      pointer-events: all;
    }

    .notification-history-modal .qa-answer-icon svg {
      width: 20px;
      height: 20px;
    }
    
    .notification-history-modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 340px;
      max-width: 100vw;
      background: #171717;
      border-left: 1px solid #FD7710;
      box-shadow: -8px 0 32px rgba(0,0,0,0.08);
      transform: translateX(100%);
      transition: transform .32s cubic-bezier(.4, 0, .2, 1);
      z-index: 9999999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .notification-history-modal.nh-open {
      transform: translateX(0);
    }
    
    #notification-history-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      background-color: #FD7710;
      flex-shrink: 0;
      color: #fff;
    }
    #notification-history-header > div {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
    }
    #notification-history-header svg {
      width: 20px;
      height: 20px;
      fill: transparent;
    }
    
    #notification-history-header #notification-history-close svg {
      fill: #fff;
    }

    #notification-history-title {
      font-size: 24px;
      font-weight: 600;
      font-family: "Barlow Condensed", sans-serif;
      margin: 0;
      color: #fff;
    }
    #notification-history-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      color: #888;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .15s, color .15s;
    }
    
    #notification-history-list {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      flex: 1;
    }
    #notification-history-list li {
      padding: 14px 18px;
      transition: background .15s;
    }
    #notification-history-list li:hover {
    }

    
    .notification-history-item {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .notification-item-body {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .not-item-image-container {
      flex-shrink: 0;
      width: 55px;
      height: 55px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #eee;
      background: #f9f9f9;
    }
    .not-item-image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hover-opacity-md {
      transition: opacity .15s ease;
    }

    .hover-opacity-md:hover {
      opacity: .5;
    }

    .not-item-info-container {
      flex: 1;
      min-width: 0;
    }
    .not-item-info-container > p {
      margin: 0 0 8px;
      font-size: 13px;
      color: #fff;
      line-height: 1;
      max-height: 54px;
      overflow-y: auto;
      min-height: 20px;
      scrollbar-width: thin;
      scrollbar-color: rgba(120,120,120,0.4) transparent;
    }

    .not-item-info-container > p {
      scrollbar-width: thin;
      scrollbar-color: #ff7300 rgba(83,74,183,0.08);
    }
    .not-item-info-container > p::-webkit-scrollbar {
      width: 4px;
    }
    .not-item-info-container > p::-webkit-scrollbar-track {
      background: rgba(83,74,183,0.08);
      border-radius: 99px;
    }
    .not-item-info-container > p::-webkit-scrollbar-thumb {
      background: #ff7300;
      border-radius: 99px;
    }
    .not-item-info-container > p::-webkit-scrollbar-thumb:hover {
      background: #d36b17;
    }
    
    .notification-item-answer {
      display: flex;
      align-items: flex-start;
      border-radius: 8px;
    }
    .notification-history-modal .qa-answer-icon {
      width: 20px;
      height: 20px;
    }
    .notification-history-modal .qa-answer-text {
      flex: 1;
      min-width: 0;
    }
    .notification-history-modal .qa-answer-preview {
      margin: 0;
      font-size: 10pt;
      color: #fff;
      line-height: 1.4;
    }

    
    .notification-item-pending {
      display: flex;
      align-items: center;
      justify-content: center; 
      gap: 5px;
      background: #2b2b2b;
      border-radius: 20px;
      padding: 2px 12px;
      line-height: 1.1;
      width: fit-content;
    }
      
    .notification-item-pending p {
      margin: 0;
      font-size: 12px;
      color: #888;
    }

    
    .notification-history-empty p {
      text-align: center;
      color: #aaa;
      font-size: 13px;
      padding: 24px 0;
      margin: 0;
    }

    
    .notification-bell button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .15s;
      color: inherit;
    }    
  `;
    document.head.appendChild(style);

    async function fetchAnswers() {
        const db = await openDb(DB_NAME, STORE_NAME);
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        return new Promise((resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    window.updateNotificationList = async () => {
        let answers;
        try {
            answers = await fetchAnswers();
        } catch (err) {
            console.error("[NotificationHistory] Falha ao atualizar respostas:", err);
            return;
        }

        const list = document.querySelector("#notification-history-list");
        if (!list) return;

        list.innerHTML = renderList(answers);
    };

    function renderAnsweredBlock({ answer }) {
        return `
      <div class="notification-item-answer">
        <div class="qa-answer-icon">${ICONS.answer}</div>
        <div class="qa-answer-text">
          <p class="qa-answer-preview">${answer ?? "Indisponível"}</p>
        </div>
      </div>`;
    }

    function renderPendingBlock() {
        return `
      <div class="notification-item-pending">
        <p>Aguardando resposta</p>
      </div>`;
    }

    function renderItem({ product_name, product_image, product_link, message, status, answer }) {
        const imageHTML = product_image
            ? `<div class="not-item-image-container hover-opacity-md">
        <a href="https://www.setupninja.com.br${product_link || "/pasta-termica-cooler-master-ice-fusion-v2-rgicfcwr3gp"}">
          <img src="https://cdn.dooca.store/174137/products/${product_image}" alt="Imagem do produto" ${product_name ? `title="${product_name}"` : ""} loading="lazy"/>
        </a>
        </div>`
            : "";

        const statusHTML = status === "answered"
            ? renderAnsweredBlock({ answer })
            : renderPendingBlock();

        return `
      <li>
        <div class="notification-history-item">
          <div class="notification-item-body">
            ${imageHTML}
            <div class="not-item-info-container">
              <p>${message}</p>
              ${statusHTML}
            </div>
          </div>
        </div>
      </li>`;
    }

    function renderList(answers) {
        const valid = answers.filter(({ product_image, message }) => product_image && message);
        return valid.length > 0
            ? valid.map(renderItem).join("")
            : `<li class="notification-history-empty"><p>Sem perguntas.</p></li>`;
    }


    function buildBellHTML() {
        return `
      <div class="col-auto notification-bell hover-opacity-md" ${IS_MOBILE ? 'style="display: flex; align-items: center; justify-content: center;"' : ""}>
        <button id="notification-history" aria-label="Ver histórico de perguntas feitas" type="button" aria-expanded="false" aria-controls="notification-history-drawer">
          ${ICONS.bell}
        </button>
      </div>`;
    }


    function buildOverlay() {
        const el = document.createElement("div");
        el.className = "nh-overlay";
        el.setAttribute("aria-hidden", "true");
        return el;
    }

    function buildDrawer(answers) {
        const drawer = document.createElement("div");
        drawer.classList.add("notification-history-modal");
        drawer.id = "notification-history-drawer";
        drawer.setAttribute("role", "dialog");
        drawer.setAttribute("aria-modal", "true");
        drawer.setAttribute("aria-labelledby", "notification-history-title");

        drawer.innerHTML = `
      <div id="notification-history-header">
        <div>
        <h2 id="notification-history-title">Suas Perguntas</h2>
        ${ICONS.clock}
        </div>
        <button id="notification-history-close" class="hover-opacity-md" aria-label="Fechar histórico de perguntas">
          ${ICONS.close}
        </button>
      </div>
      <ul id="notification-history-list">${renderList(answers)}</ul>
    `;

        return drawer;
    }

    function isOpen(drawer) {
        return drawer.classList.contains("nh-open");
    }

    function openDrawer(drawer, overlay, buttons) {
        drawer.classList.add("nh-open");
        overlay.classList.add("nh-visible");

        if (window.hide_floating_elements) {
            window.hide_floating_elements();
        }

        buttons.forEach(btn => btn?.setAttribute("aria-expanded", "true"));
        drawer.querySelector("#notification-history-close")?.focus();
    }

    function closeDrawer(drawer, overlay, buttons) {
        drawer.classList.remove("nh-open");
        overlay.classList.remove("nh-visible");

        if (window.show_floating_elements) {
            window.show_floating_elements();
        }

        buttons.forEach(btn => btn?.setAttribute("aria-expanded", "false"));
    }

    function toggleDrawer(drawer, overlay, buttons) {
        if (isOpen(drawer)) {
            closeDrawer(drawer, overlay, buttons);
        } else {
            openDrawer(drawer, overlay, buttons);
        }
    }

    const header = document.querySelector("header.header");
    if (!header) return;

    const primaryRow = IS_MOBILE
        ? header.querySelector(".header-mobile .row.equal.no-gutters")
        : header.querySelector(".header-middle .justify-content-between.align-items-center")

    const secondaryRow = IS_MOBILE
        ? null
        : header.querySelector(".header-fixed .justify-content-between.align-items-center")

    if (!primaryRow) return;

    primaryRow.insertAdjacentHTML("beforeend", buildBellHTML());
    secondaryRow?.insertAdjacentHTML("beforeend", buildBellHTML());

    const allBells = [...header.querySelectorAll("#notification-history")];
    const primaryBell = allBells[0];
    if (!primaryBell) return;

    let answers;
    try {
        answers = await fetchAnswers();
    } catch (err) {
        console.error("[NotificationHistory] Falha ao carregar respostas:", err);
        return;
    }

    const overlay = buildOverlay();
    const drawer = buildDrawer(answers);

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    const ac = new AbortController();
    const { signal } = ac;

    allBells.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleDrawer(drawer, overlay, allBells);
        }, { signal });
    });

    drawer.querySelector("#notification-history-close").addEventListener("click", () => {
        closeDrawer(drawer, overlay, allBells);
        primaryBell.focus();
    }, { signal });

    overlay.addEventListener("click", () => {
        closeDrawer(drawer, overlay, allBells);
        primaryBell.focus();
    }, { signal });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen(drawer)) {
            closeDrawer(drawer, overlay, allBells);
            primaryBell.focus();
        }
    }, { signal });
})();
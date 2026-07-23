if (!window.qasck92sd) {
    window.qasck92sd = true;
    (async () => {
        const API_URL = "https://customers-stn.vercel.app/";
        const PAGE_SIZE = 10;
        const MAX_PREVIEW = (() => {
            const w = window.innerWidth;
            if (w <= 425) return 80;
            if (w <= 768) return 130;
            return 200;
        })();
    
        const MAIN_INFO_DIV =
            document.querySelector(".NETREVIEWS_PRODUCT_REVIEWS") ||
            document.querySelector(".NETREVIEWS_PRODUCT_STARS");
        const PRODUCT_DESCRIPTION = document.querySelector(
            ".main-content .product-description",
        );
        const PRODUCT_SKU = document.querySelector(".product-title .product-reference span.text")?.textContent?.replace("REF: ", "") ?? "";
    
        if (!PRODUCT_DESCRIPTION || !MAIN_INFO_DIV || !PRODUCT_SKU) return;
    
        const VALID_DDDS = new Set([
            11, 12, 13, 14, 15, 16, 17, 18, 19,
            21, 22, 24, 27, 28,
            31, 32, 33, 34, 35, 37, 38,
            41, 42, 43, 44, 45, 46, 47, 48, 49,
            51, 53, 54, 55, 61, 62, 64,
            63, 65, 66, 67, 68, 69,
            71, 73, 74, 75, 77, 79,
            81, 87, 82, 83, 84, 85, 88,
            86, 89, 91, 93, 94,
            92, 97, 95, 96, 98, 99
        ]);
    
        const sanitize = (v) => v.normalize("NFKC").replace(/[^\p{L}\p{N}\s.,!?@-]/gu, "").trim().slice(0, 300);
    
        const sanitizePhone = (v) => v.replace(/\D/g, "").slice(0, 11);
    
        const isValidBRPhone = (d) => {
            if (!/^\d{10,11}$/.test(d)) return false;
    
            const ddd = Number(d.slice(0, 2));
            if (!VALID_DDDS.has(ddd)) return false;
    
            const num = d.slice(2);
            if (d.length === 11 && num[0] !== "9") return false;
    
            if (new Set(num.split("")).size === 1) return false;
            return true;
        };
    
    
        const formatPhone = (d) => {
            const ddd = d.slice(0, 2);
            const num = d.slice(2);
    
            if (!ddd) return "";
            if (num.length <= 8) return num ? `(${ddd}) ${num.slice(0, 4)}${num.length > 4 ? "-" + num.slice(4) : ""}` : `(${ddd}`;
            return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5, 9)}`;
        };
    
        let pending;
    
        function generateUUID() {
            const bytes = new Uint8Array(16);
            crypto.getRandomValues(bytes);
    
            bytes[6] = (bytes[6] & 0x0f) | 0x40;
            bytes[8] = (bytes[8] & 0x3f) | 0x80;
    
            const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    
            return (hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20));
        }
    
        function createClientUUID() {
            let uuid;
    
            if (!localStorage.getItem("client_uuid")) {
                uuid = generateUUID();
                localStorage.setItem("client_uuid", uuid);
            } else {
                uuid = localStorage.getItem("client_uuid");
            }
    
            return uuid;
        }
    
        const clientUUID = createClientUUID();
    
        const style = document.createElement("style");
        style.textContent = `
      .product-qa svg, .qa-modal-box svg, .product-qa p, .qa-modal-box p, .product-qa h2, .qa-modal-box h2,
      .product-qa h3, .qa-modal-box h3
       {all: unset;fill: none;}
    
    .product-qa {
      overflow: hidden; 
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: clamp(10px, 2vw, 30px);
      font-family: 'DM Sans', sans-serif;
      color: #e8e8ea !important;
      width: 99%;
      max-width: 1400px;
      margin: 30px auto;
      position: relative;
      box-sizing: border-box;
      border: 1px solid rgba(253, 119, 16, 0.20) !important;
      background: var(--offblack, #111114);
      background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="10" r="1" fill="%23FD7710" fill-opacity="0.12"/></svg>');
      background-repeat: repeat;
      background-size: 10px 10px;
      background-attachment: fixed;
    }
    
    .product-qa #left-corner-details {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      border: 1px solid #FD7710;
      border-width: 2px 0 0 2px;
      background: rgba(217, 217, 217, 0.00);
    }
    
    .product-qa #right-corner-details {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 24px;
      height: 24px;
      border: 1px solid #FD7710;
      border-width: 0 2px 2px 0;
      background: rgba(217, 217, 217, 0.00);
    }
    
    .product-qa .qa-title {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      font-family: "Barlow Condensed", sans-serif;
      text-transform: uppercase;
      font-weight: bold;
    }
    
    .product-qa .qa-title h3 span {
      color: var(--orange_setup, #FD7710);
    }
    
    .product-qa .qa-title h2 {
      font-size: 36px;
      position: relative;
    }
    
    .product-qa .qa-title h2::after {
      content: "";
      position: absolute;
      right: 105%;
      top: 50%;
      width: 30px;
      height: 2px;
      background: var(--orange_setup, #FD7710);
      opacity: 0.5;
    }
    
    .product-qa .qa-title h2::before {
      content: "";
      position: absolute;
      left: 105%;
      top: 50%;
      width: 30px;
      height: 2px;
      background: var(--orange_setup, #FD7710);
      opacity: 0.5;
    }
    
    .product-qa .qa-title h2 span {
      color: var(--orange_setup, #FD7710);
    }
    
    .qa-form-row {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }
    
    .qa-submit-btn {
      flex-shrink: 0;
      padding: 12px 22px;
      background: #ff7300;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: background .2s, transform .15s;
      white-space: nowrap;
    }
    
    .qa-submit-btn:hover  { background: #cf5e01; transform: translateY(-1px); }
    .qa-submit-btn:active { transform: scale(.97); }
    
    
    .qa-answer-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    
    .qa-modal-detail {
      position: relative;
      font-family: "Inter", "Poppins", sans-serif;
      font-size: 16px;
      border: 1px solid var(--orange_setup, #FD771033);
      background: var(--offblack, #171717);
    }
    
    .qa-item {
      display: flex;
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
      border-radius: 8px;
      border: 1px solid rgba(253, 119, 16, 0.20);
      background: rgba(0, 0, 0, 0.20);
    }
    
    .qa-item > div {
    
    }
    
    .qa-item .qa-user {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      opacity: 0.5;
    }
    
    .qa-item .qa-question {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    
    .qa-answer {
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    border-radius: 8px;
    background: var(--primary_light, #171717);
    }
    
    .qa-answer .qa-answer-title {
      display: flex;
      height: 24px;
      align-items: center;
      gap: 10px;
      align-self: stretch;
    }
    
    .qa-answer .qa-answer-title .qa-official-answer {
      color: var(--orange_setup, #FD7710);
      font-family: "Barlow Condensed";
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    
    .qa-answer .qa-answer-title .qa-official-tag {
      display: flex;
      padding: 2px 8px;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 1px solid rgba(253, 119, 16, 0.60);
      background: rgba(4, 4, 4, 0.40);
      color: var(--orange_setup, #FD7710);
      font-family: "Barlow Condensed";
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 100%;
    }
    
    .qa-answer .qa-answer-text {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-align: left;
      width: 100%;
      
    }
    
    .qa-answer-icon { flex-shrink: 0; margin-top: 2px; color: #ff7300; }
    
    .qa-read-more-inline {
      background: none;
      text-align: left;
      border: none;
      color: var(--orange_setup, #FD7710);
      font-family: Inter;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-decoration-skip-ink: auto;
      text-decoration-thickness: auto;
      text-underline-offset: auto;
      text-underline-position: from-font;
      cursor: pointer;
    }
    
    .qa-read-more-inline:hover { text-decoration: underline; }
    
    .qa-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 4px;
    }
    
    .qa-see-all-btn {
      background: transparent;
      border: 1px solid #797984;
      color: #bdbdc2;
      border-radius: 10px;
      padding: 9px 18px;
      font-size: 13px;
      font-family: inherit;
      cursor: pointer;
      transition: border-color .2s, color .2s;
      margin-left: auto;
    }
    
    .qa-see-all-btn:hover { border-color: #ff7300; color: #ff7300; }
    
    .product-qa .qa-state-msg {
      font-size: 16px;
      color: #6b6b72;
      text-align: center;
      padding: 20px 0;
      font-family: "Inter", "Poppins", sans-serif;
    }
    
    
    .qa-modal-bg {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.6);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      z-index: 1000;
      animation: qa-fade-in .2s ease;
    }
    
    .qa-modal-box {
      width: 100%;
      max-width: 1080px;
      background: #111113;
      padding: 16px;
      box-shadow: 0 30px 70px rgba(0,0,0,.5);
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: qa-slide-up .25s ease;
      max-height: 65vh;
      overflow: hidden;
      font-family: "Inter";
    }
    
    .qa-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .qa-modal-header h3 { 
      font-size: 17px;
      margin: 0;
      color: #fff;
    }
    
    .qa-modal-close {
      background: transparent;
      border: none;
      cursor: pointer;
      opacity: .6;
      transition: opacity .15s;
      line-height: 0;
      padding: 0;
      margin-left: auto;
    }
    
    .qa-modal-close:hover { opacity: 1; }
    
    
    .qa-paginated-list {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1;
      padding-right: 4px;
    }
    
    .qa-paginated-list::-webkit-scrollbar { width: 4px; }
    .qa-paginated-list::-webkit-scrollbar-track { background: transparent; }
    .qa-paginated-list::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 4px; }
    
    .qa-contact-modal {
      max-width: 420px;
    }
    
    .qa-contact-modal * {
      color: #fff;
      box-sizing: border-box;
    }
    
    .qa-contact-modal p { font-size: 13px; color: #bdbdc2; margin: 0; }
    
    .qa-contact-modal input {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #2a2a2e;
      background: #1a1a1c;
      color: #fff;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
    }
    
    .qa-contact-modal input:focus {
      border-color: #ff7300;
      box-shadow: 0 0 0 2px rgba(255,115,0,.2);
    }
    
    .qa-field-error { color: #ff4d4d; font-size: 12px; min-height: 16px; }
    
    .qa-contact-submit {
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: #ff7300;
      color: #fff;
      font-weight: 600;
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: background .2s, transform .15s;
      width: 100%;
    }
    
    .qa-contact-submit:hover  { background: #cf5e01; transform: translateY(-1px); }
    .qa-contact-submit:active { transform: scale(.97); }
    
    
    .qa-detail-question { 
    color: #FFF !important;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    }
    .qa-detail-answer   { font-size: 12pt; color: #fff !important; line-height: 1.1; margin: 0; }
    
    .qa-modal-detail .qa-detail-username {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      opacity: 0.5;
    }
    
    .qa-modal-detail .qa-detail-answer-box {
      display: flex;
      padding: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
      border-radius: 8px;
      background: var(--primary_light, #171717);
    }
    
    .qa-modal-detail .qa-detail-title {
      display: flex;
      height: 24px;
      align-items: center;
      gap: 10px;
      align-self: stretch;
    }
    
    .qa-modal-detail .qa-detail-title .qa-official-answer {
    color: var(--orange_setup, #FD7710);
    font-family: "Barlow Condensed";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    }
    
    .qa-modal-detail .qa-detail-title .qa-official-tag {
    display: flex;
    padding: 2px 8px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid rgba(253, 119, 16, 0.60);
    background: rgba(4, 4, 4, 0.40);
    color: var(--orange_setup, #FD7710);
    font-family: "Barlow Condensed";
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%; /* 14px */'
    }
    
    .product-sides-div {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    
    .product-sides-div > div {flex: 1;}
    
    .qa-answer-text {
      line-height: 1.1;
      opacity: .8;
    }
    
    .qa-answer-text .qa-answer-preview {
      color: #FFF;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      overflow-wrap:anywhere;
      font-weight: 500;
      line-height: normal;
    }
    
    .qa-form-container {
      display: flex;
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      align-self: stretch;
      border-radius: 8px;
      border: 1px solid rgba(253, 119, 16, 0.30);
      background: rgba(253, 119, 16, 0.20);
    }
    
    
    .qa-form-container .qa-form-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
    }
    
    .qa-form-container .qa-form-row {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 10px;
      align-self: stretch;
    }
    
    .qa-form-container .qa-form-row  textarea {
      display: flex;
      min-height: 120px;
      height: auto;
      width: 100%;
      resize: vertical;
      padding: 8px;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;
      flex: 1 0 0;
      font-size: 16px;
      outline: none;
      border-radius: 8px;
      color: #fff;
      transition: all .15s ease-in-out;
      font-family: Inter;
      border: 1px solid rgba(255, 255, 255, 0.20);
      background: rgba(23, 23, 23, 0.50);
    }
    
    .qa-form-container .qa-form-row textarea::placeholder {
      color: rgba(255,255,255,0.35);
    }
    
    .qa-form-container .qa-form-row textarea:hover {
      border-color: rgba(255, 115, 0, 0.5);
    }
    
    .qa-form-container .qa-form-row textarea:focus {
      border-color: #ff7300;
      box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.15);
    }
    
    .qa-form-container .qa-form-row textarea:active {
      transform: scale(0.995);
    }
    
    .qa-form-container .qa-form-row textarea::-webkit-scrollbar {
      width: 4px;
    }
    .qa-form-container .qa-form-row textarea::-webkit-scrollbar-thumb {
      background: rgba(255, 115, 0, 0.4);
      border-radius: 4px;
    }
    
    .qa-form-container label {
    color: #FD7710;
    font-family: "Barlow Condensed";
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    text-transform: uppercase;
    margin: 0;
    }
    
    .qa-form-container .form-row-top {
      width: 100%
    }
    
    .qa-form-container  #input-text-lenght, #cc-alias-length {
    color: #FFF;
    text-align: center;
    font-family: "Barlow Condensed";
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    }
    
    #modal-loader {
      color: #fff;
    }
    
    #modal-list {
      position: relative;
      height: 100%;
      display: flex;
    }
    
    .all-questions-modal {
      min-height: 65vh;
      padding: 20px;
      position: relative;
    }
    
    .all-questions-modal .qa-modal-header h2 {
      color: #FFF;
      font-family: "Barlow Condensed";
      font-size: 36px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: uppercase;
      text-align: center;
    }
    
    .all-questions-modal .qa-modal-header h2 span {
      color: var(--orange_setup, #FD7710);
      font-family: "Barlow Condensed";
      font-size: 36px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: uppercase;
    }
    
    @keyframes qa-fade-in  { from { opacity: 0 } to { opacity: 1 } }
    @keyframes qa-slide-up { from { opacity: 0; transform: translateY(12px) scale(.97) } to { opacity: 1; transform: none } }
    
    .spin-loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .spin-loader .loader {
      width: 40px;
      height: 40px;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    .all-questions-modal .scroll-loading {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 20px 10px;
      background: #111113;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-itens: center;
      color: #fff;
      width: 100%;
      text-align: center;
    }
    
    .qa-modal-header svg {
      fill: #fff;
      stroke: #fff;
    }
    
    .like-container {
    display: flex;
    padding: 8px 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    border: 1px solid rgba(253, 119, 16, 0.50);
    background: rgba(0, 0, 0, 0.50);
    }
    
    .like-container button {
      background-color: transparent;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      width: 24px;
      height: 24px;
      transition: transform 0.15s ease;
    }
    
    .like-container button:active {
      transform: scale(0.85);
    }
    
    .like-container button.liked-button {
      animation: pop 0.35s ease;
    }
    
    @keyframes pop {
      0%   { transform: scale(1); }
      40%  { transform: scale(1.4); }
      100% { transform: scale(1); }
    }
    
    .like-container span {
      color: var(--orange_setup, #FD7710);
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      text-transform: uppercase;
    }
    
    .like-container svg {
      width: 100%;
      min-width: 20px;
      cursor: pointer;
    }
    
    .question-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      gap: 8px;
    }
    
    .question-container .question-title {
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .liked-button.liked-button svg path {
      fill: #FD7710;
    }
    .qa-item-waiting {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    
      border-radius: 12px;
      padding: 24px 16px;
    
      transition: border-color .2s, background .2s;
      position: relative;
    }
    
    .qa-item-waiting:hover {
      border-color: #2f2f35;
      background: #1d1d21;
    }
    
    .qa-item-waiting::before {
      content: "";
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 3px;
      border-radius: 2px;
      background: linear-gradient(180deg, #ff7300, #ff9a3c);
      opacity: 0.6;
    }
    
    
    .qa-item-waiting .waiting-answer-container {
      display: flex;
      align-items: center;
      gap: 10px;
    
      background: transparent;
      padding: 0;
      border-radius: 0;
    
      color: #bdbdc2;
      font-size: 13px;
      line-height: 1.07;
      text-align: center;
    }
    
    
    .qa-item-waiting .waiting-answer-container svg {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
    
      color: #ff7300;
      opacity: 0.9;
    }
    
    .qa-item-waiting .waiting-answer-container span {
      display: block;
      opacity: 0.85;
    }
    
    .qa-item-waiting.waiting::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 12px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255,115,0,0.08),
        transparent
      );
      animation: qa-waiting-shimmer 2s infinite;
      pointer-events: none;
    }
    
    @keyframes qa-waiting-shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .label-title {
      font-weight: bolder;
    }
    
    .label-for-input {
      font-size: 9pt;
      opacity: .5;
    }
    
    .create-modal-div-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .create-modal-div-row > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    
    .product-qa #colmeia-pattern-top {
      position: absolute;
      right: -2px;
      top: -3px;
      pointer-events: none;
    }
    
    .product-qa #colmeia-pattern-bottom {
      position: absolute;
      left: -19px;
      bottom: 30%;
      transform: scaleX(-1);
      pointer-events: none;
    }
    
    @media (max-width: 768px) {
      .product-sides-div {
        flex-direction: column;
      }
    
      .all-questions-modal {
        padding: 30px 10px;
      }
    
      .qa-item .qa-question {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    
    @media (max-width: 425px) {
      .qa-form-container {
        gap: 10px;
      }
    
      .qa-form-container .qa-form-row {
        flex-direction: column;
        align-items: flex-end;
      }
    
      .qa-form-container .qa-form-row textarea {
        min-height: 120px;
        height: auto;
        width: 100%;
        resize: none;
      }
    
      .product-qa .qa-title h2 {
        font-size: 32px;
      }
    
      .product-qa .qa-title h2::after {
        display: none;
      }
    
      .product-qa .qa-title h2::before {
        display: none;
      }
    
      .like-container {
        padding: 8px;
        gap: 4px;
      }
    }
    `;
    
        const section = document.createElement("section");
        section.className = "product-qa";
        section.innerHTML = `
      <svg width="258" height="497" id="colmeia-pattern-top" viewBox="0 0 258 497" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".1" clip-path="url(#a)" stroke="#ff7300"><path d="m220-3-40 20v40l40 20 40-20V17zm-80 0-40 20v40l40 20 40-20V17zM60-3 20 17v40l40 20 40-20V17zm200 80-40 20v40l40 20 40-20V97zm-80 0-40 20v40l40 20 40-20V97zm-80 0L60 97v40l40 20 40-20V97zm120 80-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40zm200 80-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40zm120 80-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40zm-80 0-40 20v40l40 20 40-20v-40z"/></g><defs><clipPath id="a"><path fill="#fff" d="M260-3H0v500h260z"/></clipPath></defs></svg>
    <div class="product-sides-div">
      <div class="qa-title" id="qa-title">
        <h2>Perguntas <span>& respostas</span></h2>
        <h3>Tire suas dúvidas com a comunidade <span>Ninja!</span></h3>
      </div>
      <div class="qa-form-container">
        <div class="qa-form-title">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2zm4-1a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" stroke="#fd7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <label for="qa-input" class="label-title">Faça sua pergunta</label>
          </div>
          <p id="input-text-lenght">0/300</p>
        </div>
        <div class="qa-form-row">
          <textarea id="qa-input" name="question" minlength="8" maxlength="300" placeholder="Faça a sua pergunta sobre este produto…" required></textarea>
          <button class="qa-submit-btn" id="qa-submit">Perguntar</button>
        </div>
      </div>
    
      <div class="qa-answer-list" id="qa-answer-list">
        <p class="qa-state-msg">Carregando perguntas…</p>
      </div>
    </div>
    
    <div class="qa-footer" id="qa-footer" style="display:flex">
      <button class="qa-see-all-btn" id="qa-see-all">Ver todas as perguntas</button>
    </div>
    
    <div id="left-corner-details"></div>
    <div id="right-corner-details"></div>
    `;
    
        PRODUCT_DESCRIPTION.insertAdjacentElement("afterend", style);
        PRODUCT_DESCRIPTION.insertAdjacentElement("afterend", section);
    
        const qaInput = section.querySelector("#qa-input");
        const qaSubmit = section.querySelector("#qa-submit");
        const qaAnswerList = section.querySelector("#qa-answer-list");
        const qaFooter = section.querySelector("#qa-footer");
        const qaSeeAll = section.querySelector("#qa-see-all");
        const qaInputLmt = section.querySelector("#input-text-lenght");
    
        const qaInputMin = Number(qaInput.getAttribute("minlength"));
        const qaInputMax = Number(qaInput.getAttribute("maxlength"));
    
        const aliasMax = 50;
        const aliasMin = 4;
    
        const inputStates = { ACCEPT: "ACCEPT", REJECT: "REJECT" };
        let lastQaInputState = inputStates.ACCEPT;
    
        const icons = {
            like: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.88L14 10H19.83C20.1405 10 20.4467 10.0723 20.7244 10.2111C21.0021 10.35 21.2437 10.5516 21.43 10.8C21.6163 11.0484 21.7422 11.3367 21.7977 11.6422C21.8533 11.9477 21.8369 12.2619 21.75 12.56L19.42 20.56C19.2988 20.9754 19.0462 21.3404 18.7 21.6C18.3538 21.8596 17.9327 22 17.5 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H6.76C7.13208 9.9998 7.49674 9.89581 7.81296 9.69972C8.12917 9.50363 8.38442 9.22321 8.55 8.89L12 2C12.4716 2.00584 12.9357 2.11817 13.3578 2.3286C13.7799 2.53902 14.1489 2.84211 14.4374 3.2152C14.7259 3.5883 14.9263 4.02176 15.0237 4.4832C15.1212 4.94464 15.113 5.42213 15 5.88Z" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 10V22" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            like_fill: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#FD7710" xmlns="http://www.w3.org/2000/svg"><path d="M15 5.88L14 10H19.83C20.1405 10 20.4467 10.0723 20.7244 10.2111C21.0021 10.35 21.2437 10.5516 21.43 10.8C21.6163 11.0484 21.7422 11.3367 21.7977 11.6422C21.8533 11.9477 21.8369 12.2619 21.75 12.56L19.42 20.56C19.2988 20.9754 19.0462 21.3404 18.7 21.6C18.3538 21.8596 17.9327 22 17.5 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V12C2 11.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H6.76C7.13208 9.9998 7.49674 9.89581 7.81296 9.69972C8.12917 9.50363 8.38442 9.22321 8.55 8.89L12 2C12.4716 2.00584 12.9357 2.11817 13.3578 2.3286C13.7799 2.53902 14.1489 2.84211 14.4374 3.2152C14.7259 3.5883 14.9263 4.02176 15.0237 4.4832C15.1212 4.94464 15.113 5.42213 15 5.88Z" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 10V22" stroke="none" fill="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        };
    
        function updateInputCounter(length, max, min, counterEl, lastState) {
            const isInvalid = length > max || length < min;
            counterEl.textContent = `${length}/${max}`;
    
            if (isInvalid && lastState === inputStates.ACCEPT) {
                counterEl.style.color = "#ff0000";
                return inputStates.REJECT;
            }
            if (!isInvalid && lastState === inputStates.REJECT) {
                counterEl.style.color = "#00ff00";
                return inputStates.ACCEPT;
            }
    
            return lastState;
        }
    
        qaInput.addEventListener("input", (e) => {
            const len = e.target.value.trim().length;
            lastQaInputState = updateInputCounter(len, qaInputMax, qaInputMin, qaInputLmt, lastQaInputState);
        });
    
        qaInput.addEventListener("change", (e) => {
            const len = e.target.value.trim().length;
            lastQaInputState = updateInputCounter(len, qaInputMax, qaInputMin, qaInputLmt, lastQaInputState);
        });
    
        let allQuestions = [];
    
        function hideElements() {
            if (window.hide_floating_elements) {
                window.hide_floating_elements()
            }
        }
    
        function showElements() {
            if (window.show_floating_elements) {
                window.show_floating_elements()
            }
        }
    
        function createModalBg() {
            hideElements();
            const bg = document.createElement("div");
            bg.className = "qa-modal-bg";
    
            bg.addEventListener("mousedown", (e) => {
                if (e.target === bg) {
                    bg.remove();
                    if (allQuestionsModalOpen) allQuestionsModalOpen = false;
    
                    showElements();
                }
            });
    
            return bg;
        }
    
        function closeIcon() {
            return `<svg width="18" viewBox="0 0 1024 1024" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496"/></svg>`;
        }
    
        function openDetailModal(question, answer, username) {
            const bg = createModalBg();
            bg.innerHTML = `
    <div class="qa-modal-box qa-modal-detail">
      <div class="qa-modal-header">
        <p class="qa-detail-username">${username}</p>
        <button class="qa-modal-close" aria-label="Fechar">${closeIcon()}</button>
      </div>
      <p class="qa-detail-question">${question}</p>
      
      <div class="qa-detail-answer-box">
        <div class="qa-detail-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="qa-official-answer">
          Resposta Oficial
        </p>
        <span class="qa-official-tag">
          Ninja
        </span>
        </div>
        <p class="qa-detail-answer">${answer}</p>
      </div>
    </div>`;
    
            bg.querySelector(".qa-modal-close").addEventListener("click", () => {
                bg.remove();
                showElements();
            });
            document.body.appendChild(bg);
        }
    
        const cachedQA = {};
        let firstDetailModalOpen = true;
        let isLoading = false;
        let allQuestionsModalOpen = false;
    
        function openAllQuestionsModal() {
            if (allQuestionsModalOpen) return;
            allQuestionsModalOpen = true;
    
            section.querySelector("#qa-see-all")?.blur();
            if (!allQuestions.length) return;
    
            const bg = createModalBg();
            bg.innerHTML = `
    <div class="qa-modal-box all-questions-modal">
      <div class="qa-modal-header">
        <h2>Todas <span>as perguntas</span></h2>
        <button class="qa-modal-close" aria-label="Fechar">${closeIcon()}</button>
      </div>
      <div class="qa-paginated-list" id="modal-list" style="overflow-y:auto;max-height:70vh;">
        ${firstDetailModalOpen ? `<div class="spin-loader"><img class="loader" src="https://cdn.dooca.store/174137/files/shuriken-ninja-branca.svg"></div>` : ""}
      </div>
      <div class="scroll-loading" style="display:none;"><span>Carregando...</span></div>
    </div>`;
    
            bg.querySelector(".qa-paginated-list").addEventListener("click", (e) => {
                const target = e.target.dataset.commentId
                    ? e.target
                    : e.target.closest("[data-comment-id]");
    
                if (!target) return;
    
                const commentId = target.dataset.commentId;
                if (!commentId) return;
    
                idbGet("SetupNinjaDB", "comment_likes", commentId).then((hasLiked) => {
                    if (hasLiked?.liked) return;
    
                    likeComment(commentId)
                        .then(() => {
                            const container = target.closest(".like-container");
                            const likeCounter = container.querySelector("span.like-counter");
                            likeCounter.textContent = Number(likeCounter.textContent) + 1;
                            target.classList.add("liked-button");
                        })
                        .catch(() => { });
                });
            });
    
            const modalList = bg.querySelector("#modal-list");
            const loader = bg.querySelector(".scroll-loading");
            let pageN = 1;
            let hasMore = true;
    
            bg.querySelector(".qa-modal-close").addEventListener("click", () => {
                bg.remove();
                allQuestionsModalOpen = false;
                showElements();
            });
    
            async function loadMoreQuestions() {
                if (isLoading || !hasMore) return;
                isLoading = true;
                if (!firstDetailModalOpen) loader.style.display = "block";
    
                const url = `${API_URL}questions/answers/sku/${PRODUCT_SKU}?page=${pageN}`;
    
                const processData = async (data) => {
                    if (!data || data.length < PAGE_SIZE) hasMore = false;
    
                    const items = await Promise.all(data.map((q) => buildItem(q, true)));
                    const frag = document.createDocumentFragment();
                    items.forEach((el) => frag.appendChild(el));
                    modalList.appendChild(frag);
    
                    pageN++;
                    isLoading = false;
    
                    if (firstDetailModalOpen) {
                        bg.querySelector(".spin-loader")?.remove();
                        firstDetailModalOpen = false;
                    }
    
                    loader.style.display = "none";
                };
    
                if (cachedQA[url]) {
                    await processData(cachedQA[url]);
                } else {
                    fetch(url, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                        .then((d) => d.json())
                        .then(async (res) => {
                            const data = res.data || [];
                            cachedQA[url] = data;
                            await processData(data);
                        }).catch(() => {
                            isLoading = false;
                            loader.style.display = "none";
                        });
                }
            }
    
            modalList.addEventListener("scroll", () => {
                const scrollBottom = modalList.scrollHeight - modalList.scrollTop - modalList.clientHeight;
                if (scrollBottom < 20) loadMoreQuestions();
            });
    
            loadMoreQuestions();
            document.body.appendChild(bg);
        }
    
        async function buildLike(commentId) {
            const hasLiked = await idbGet("SetupNinjaDB", "comment_likes", commentId);
            return `
      <button type="button" ${hasLiked?.liked ? 'class="liked-button"' : ""} data-comment-id="${commentId}" aria-label="Curtir resposta">
        ${hasLiked ? icons.like_fill : icons.like}
      </button>`;
        }
    
        async function buildItem(q, fullText = false) {
            const article = document.createElement("article");
            article.className = "qa-item";
    
            const question = q.question?.text ?? "";
            const answer = q.answer?.text ?? "";
            const user = q.question?.customer?.alias ?? "Usuário";
    
            const questionDisplay =
                !fullText && question.length > MAX_PREVIEW
                    ? question.slice(0, MAX_PREVIEW).trimEnd() + "…"
                    : question;
    
            const answerDisplay = answer;
            const showBtn = !fullText && question.length > MAX_PREVIEW ? `<button class="qa-read-more-inline">Ler mais</button>` : "";
    
            article.innerHTML = `
    <div class="question-container">
      <div class="question-title">
        <p class="qa-user">${user}</p>
        <h3 class="qa-question">${questionDisplay}</h3>
        ${showBtn}
      </div>
      <div class="like-container">
        ${await buildLike(q._id)}
        <span class="like-counter">${q.question?.likes ?? 0}</span>
      </div>
    </div>
    <div class="qa-answer">
      <div class="qa-answer-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="#FD7710" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="qa-official-answer">
          Resposta Oficial
        </p>
        <span class="qa-official-tag">
          Ninja
        </span>
      </div>
      <div class="qa-answer-text">
        <span class="qa-answer-preview">${answerDisplay}</span>
      </div>
    </div>`;
    
            if (!fullText && question.length > MAX_PREVIEW) {
                article.querySelector(".qa-read-more-inline").addEventListener("click", () => openDetailModal(question, answer, user));
            }
    
            return article;
        }
    
        async function likeComment(id) {
            return new Promise(async (resolve, reject) => {
                const hasLiked = await idbGet("SetupNinjaDB", "comment_likes", id);
    
                if (hasLiked?.liked) {
                    reject();
                    return;
                }
    
                await idbSet("SetupNinjaDB", "comment_likes", id, { liked: true });
    
                const url = `${API_URL}questions/answers/like/${id}`;
                const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" } });
    
                if (r.status !== 204) {
                    await idbSet("SetupNinjaDB", "comment_likes", id, { liked: true });
                    resolve("ReLiked");
                }
    
                if (r.status === 204) {
                    const cachedQuestions = await idbGet(
                        "SetupNinjaDB",
                        "qa_section",
                        `questions_${PRODUCT_SKU}`,
                    );
    
                    if (cachedQuestions) {
                        const question = cachedQuestions.data.find((q) => String(q._id) === String(id));
    
                        if (question?.question) {
                            question.question.likes = (question.question.likes ?? 0) + 1;
    
                            await idbSet(
                                "SetupNinjaDB",
                                "qa_section",
                                `questions_${PRODUCT_SKU}`,
                                cachedQuestions,
                            );
                        }
                    }
    
                    resolve("Liked");
                }
            });
        }
    
        function getAll(store) {
            return new Promise((resolve, reject) => {
                const request = store.getAll();
    
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        }
    
        async function renderList(questions) {
            qaAnswerList.innerHTML = "";
    
            const db = await openDb("SetupNinjaDB", "answer_status");
            const tx = db.transaction("answer_status", "readonly");
            const store = tx.objectStore("answer_status");
    
            let data = await getAll(store);
    
            const questionsIds = questions.map((q) => q._id);
    
            data = data.filter((q) => !questionsIds.includes(q.id));
    
            pending = data.filter((item) => item.status === "pending" && item.sku == PRODUCT_SKU && !questionsIds.includes(item.id),);
    
            if (!questions.length && (!pending || pending.length <= 0)) {
                qaAnswerList.innerHTML = `<p class="qa-state-msg">Nenhuma pergunta ainda. Seja o primeiro!</p>`;
                return;
            }
    
            const items = [];
    
            pending.forEach((d) => {
                items.push(buildPendingComment(d.username || "Você", d.message));
            });
    
            const preview = questions.slice(0, PAGE_SIZE);
            const builtItems = await Promise.all(preview.map((q) => buildItem(q)));
    
            items.push(...builtItems);
    
            const frag = document.createDocumentFragment();
            items.forEach((el) => frag.appendChild(el));
    
            qaAnswerList.appendChild(frag);
        }
    
        function buildPendingComment(username, message, fullText = false) {
            const article = document.createElement("article");
            article.className = "qa-item qa-item-waiting";
    
            const questionDisplay = !fullText && message.length > MAX_PREVIEW ? message.slice(0, MAX_PREVIEW).trimEnd() + "…" : message;
    
            article.innerHTML = `
          <div>
            <p class="qa-user">${username ?? "Você"} • <i>Você será notificado ao navegar no site!</i></p>
            <div class="question-container">
              <div class="question-title">
                <h3 class="qa-question">${questionDisplay}</h3>
              </div>
            </div>
            <!--<div class="qa-answer">
              <div class="qa-answer-text"> 
                <span class="qa-answer-preview">
                  
                </span>
              </div>
            </div> -->
          </div>
    
          <div class="waiting-answer-container">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0m8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m1 4a1 1 0 1 0-2 0v6a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586z" fill="#fff"/></svg>
            <span class="like-counter">Aguardando <br> resposta</span>
          </div>
          `;
    
            return article;
        }
    
        qaAnswerList.addEventListener("click", (e) => {
            const target = e.target.dataset.commentId ? e.target : e.target.closest("[data-comment-id]");
    
            if (!target) return;
    
            const commentId = target.dataset.commentId;
            if (!commentId) return;
    
            idbGet("SetupNinjaDB", "comment_likes", commentId).then((hasLiked) => {
                if (hasLiked?.liked) return;
    
                likeComment(commentId)
                    .then((d) => {
                        const container = target.closest(".like-container");
                        const likeCounter = container.querySelector("span.like-counter");
    
                        if (d != "ReLiked") {
                            likeCounter.textContent = Number(likeCounter.textContent) + 1;
                        }
    
                        target.classList.add("liked-button");
                    })
                    .catch(() => { });
            });
        });
    
        async function loadQuestions() {
            try {
                const data = await GET_CACHED_DATA(
                    `questions_${PRODUCT_SKU}`,
                    20 * 60 * 1000,
                    () =>
                        fetch(`${API_URL}questions/answers/sku/${PRODUCT_SKU}?page=1`)
                            .then((r) => r.json())
                            .then(({ data }) => data ?? []),
                    true,
                    "SetupNinjaDB",
                    "qa_section",
                );
    
                allQuestions = data ?? [];
                renderList(allQuestions);
    
                if (allQuestions.length <= PAGE_SIZE - 1) qaFooter.style.display = "none";
            } catch {
                qaAnswerList.innerHTML = `<p class="qa-state-msg">Não foi possível carregar as perguntas.</p>`;
            }
        }
    
        function openContactModal() {
            return new Promise((resolve, reject) => {
                if (document.querySelector("#qa-contact-modal")) return reject(null);
    
                const bg = createModalBg();
                bg.innerHTML = `
        <div class="qa-modal-box qa-contact-modal" id="qa-contact-modal">
          <div class="qa-modal-header">
            <h3>Seja notificado pelo WhatsApp</h3>
            <button class="qa-modal-close" aria-label="Fechar">${closeIcon()}</button>
          </div>
          <p>Digite seus dados para ser notificado quando sua pergunta for respondida.</p>
          <div class="create-modal-div-row">
            <div><label for="cc-alias" class="label-for-input">Seu Nome (Obrigatório)</label> <p id="cc-alias-length">0/50</p></div>
            <input type="text" id="cc-alias" placeholder="Seu nome" autocomplete="name" maxlength="${aliasMax}" minlength="${aliasMin}" required>
          </div>
          <div class="create-modal-div-row">
            <label for="cc-phone" class="label-for-input">Seu Telefone (Opcional)</label>
            <input type="text" id="cc-phone" placeholder="(21) 99999-9999" autocomplete="tel">
          </div>
          <p class="qa-field-error" id="cc-error"></p>
          <button class="qa-contact-submit" id="cc-submit">Perguntar</button>
        </div>`;
    
                const aliasInput = bg.querySelector("#cc-alias");
                const phoneInput = bg.querySelector("#cc-phone");
                const errorMsg = bg.querySelector("#cc-error");
                const submitBtn = bg.querySelector("#cc-submit");
                const closeBtn = bg.querySelector(".qa-modal-close");
                const aliasInputLength = bg.querySelector("#cc-alias-length");
    
                qaInput.blur();
                let lastAliasState = inputStates.ACCEPT;
    
                closeBtn.addEventListener("click", () => {
                    bg.remove();
                    showElements();
                    reject(null);
                });
    
                aliasInput.addEventListener("input", (e) => {
                    const len = e.target.value.trim().length;
                    lastAliasState = updateInputCounter(
                        len,
                        aliasMax,
                        aliasMin,
                        aliasInputLength,
                        lastAliasState,
                    );
                });
    
                aliasInput.addEventListener("change", (e) => {
                    const len = e.target.value.trim().length;
                    lastAliasState = updateInputCounter(
                        len,
                        aliasMax,
                        aliasMin,
                        aliasInputLength,
                        lastAliasState,
                    );
                });
    
                phoneInput.addEventListener("input", () => {
                    const digits = sanitizePhone(phoneInput.value);
                    phoneInput.value = formatPhone(digits);
                    if (isValidBRPhone(digits)) errorMsg.textContent = "";
                });
    
                [aliasInput, phoneInput].forEach((input) => {
                    input.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            submitBtn.click();
                        }
                    });
                });
    
                submitBtn.addEventListener("click", () => {
                    const raw = phoneInput.value;
                    const digits = sanitizePhone(phoneInput.value);
                    const alias = sanitize(aliasInput.value);
    
    
    
    
    
                    if (!alias || alias.length < aliasMin) {
                        errorMsg.textContent = "Informe seu nome (mín. 4 caracteres).";
    
                        return;
                    }
    
                    if (digits && !isValidBRPhone(digits)) {
                        errorMsg.textContent = "Número inválido.";
    
                        return;
                    }
    
                    let body = {
                        alias,
                    };
    
                    if (digits) {
                        body.phone = digits;
                    }
    
                    const clientObject = {
                        name: alias,
                        phone: digits,
                        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                    }
    
    
    
                    localStorage.setItem("qa-section-client", JSON.stringify(clientObject));
    
                    bg.remove();
                    showElements();
                    resolve(body);
                });
    
                document.body.appendChild(bg);
    
                aliasInput.focus();
            });
        }
    
        function setSubmitFeedback(type) {
            const messages = {
                loading: { text: "Enviando…", disabled: true },
                success: { text: "Enviado! ✓", disabled: false },
                error: { text: "Erro. Tente novamente", disabled: false },
                idle: { text: "Perguntar", disabled: false },
            };
            const state = messages[type] ?? messages.idle;
            qaSubmit.textContent = state.text;
            qaSubmit.disabled = state.disabled;
        }
    
        qaSubmit.addEventListener("click", async () => {
            const question = sanitize(qaInput.value);
            if (!question || question.length < qaInputMin) return;
    
            const body = {
                product: {
                    name: MAIN_INFO_DIV.dataset.productName ?? "Nome não encontrado",
                    sku: PRODUCT_SKU ?? "SKU não encontrado",
                    link: window.location.pathname.replace("/", "") || "URL não encontrada",
                    img:
                        (MAIN_INFO_DIV.dataset.productImgUrl ?? "")
                            .replace("https://cdn.dooca.store/174137/products/", "")
                            .split("?v")[0] || "IMG não encontrada",
                },
                question: {
                    text: question,
                    customer: {
                        uuid: clientUUID,
                    },
                },
            };
    
            const stored = localStorage.getItem("_dc_customer");
            const parsed = JSON.parse(stored);
    
            if (stored && parsed) {
                try {
                    if (parsed?.id) body.question.customer.id = String(parsed.id);
                } catch { }
            } else {
                try {
                    const clientObject = localStorage.getItem("qa-section-client");
                    let contact
    
                    if (!clientObject) {
    
                        contact = await openContactModal();
                    } else {
                        const client = JSON.parse(clientObject);
    
                        if (client) {
                            const expired = new Date(client.expiresAt) < new Date();
    
                            if (expired) {
    
                                localStorage.removeItem("qa-section-client");
                                contact = await openContactModal();
                            } else {
                                if (!client?.name || !client?.phone) {
    
                                    localStorage.removeItem("qa-section-client");
                                    contact = await openContactModal();
                                } else {
                                    const alias = sanitize(client.name);
                                    const phone = sanitizePhone(client.phone);
    
    
    
    
    
    
    
                                    if (isValidBRPhone(phone) && alias.length < aliasMax && alias.length > aliasMin) {
                                        contact = {
                                            alias: client.name,
                                            phone: sanitizePhone(client.phone)
                                        }
                                    } else {
    
                                        localStorage.removeItem("qa-section-client");
                                        contact = await openContactModal();
                                    }
                                }
                            }
                        } else {
    
                            localStorage.removeItem("qa-section-client");
                            contact = await openContactModal();
                        }
                    }
    
                    if (contact) {
                        body.question.customer.alias = String(contact.alias);
    
                        if (contact.phone) {
                            body.question.customer.phone = String(contact.phone);
                        }
                    }
                } catch {
                    return;
                }
            }
    
            setSubmitFeedback("loading");
    
    
    
            fetch(`${API_URL}questions/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
                .then(async (r) => {
                    if (r.status == 201) {
                        const data = await r.json();
                        const message = sanitize(qaInput.value);
    
                        qaInput.value = "";
                        lastQaInputState = inputStates.ACCEPT;
                        qaInputLmt.textContent = `0/${qaInputMax}`;
                        qaInputLmt.style.color = "";
    
                        const username =
                            body.question.customer.alias ||
                            `${parsed.first_name}${" " + parsed.last_name[0] ?? ""}.`;
    
                        await idbSet("SetupNinjaDB", "answer_status", data._id, {
                            status: "pending",
                            message: message,
                            sku: PRODUCT_SKU,
                            viewed: false,
                            username: username,
                            product_image:
                                (MAIN_INFO_DIV.dataset.productImgUrl ?? "")
                                    .replace("https://cdn.dooca.store/174137/products/", "")
                                    .split("?v")[0] || null,
                            product_link: window.location.pathname,
                        });
                        setSubmitFeedback("success");
    
                        if (window.updateNotificationList) {
                            await window.updateNotificationList();
                        }
    
                        qaAnswerList.insertAdjacentElement(
                            "afterbegin",
                            buildPendingComment(username, message),
                        );
                        const el = section.querySelector(".qa-state-msg");
    
                        if (el) {
                            el.style.display = "none";
                        }
    
                        setTimeout(() => setSubmitFeedback("idle"), 2000);
                    } else {
                        setSubmitFeedback("error");
                        setTimeout(() => setSubmitFeedback("idle"), 3000);
                    }
                })
                .catch((e) => {
                    setSubmitFeedback("error");
                    setTimeout(() => setSubmitFeedback("idle"), 3000);
                });
            setTimeout(() => setSubmitFeedback("idle"), 2000);
        });
    
        qaInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                qaSubmit.click();
            }
        });
    
        qaSeeAll.addEventListener("click", openAllQuestionsModal);
        await loadQuestions();
    })();
}
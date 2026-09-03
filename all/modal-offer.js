class OfferModal extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })

        this.shadowRoot.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

            :host {
                --primary-color: #ff7300;
                --secondary-color: #052301;
                font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                line-height: 1;
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                line-height: 1;
            }

            h1, h2, h3, h4, .offer-product-name {
                font-family: "Barlow Condensed", -apple-system, sans-serif;
                line-height: 1;
            }

            #modal-surface {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: opacity 0.35s ease, visibility 0.35s ease;
            }

            #modal-surface.open {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
            }

            dialog {
                position: relative;
                margin: 0;
                border: 0;
                border-radius: 3px;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                color: #ffffff;
                max-width: 680px;
                width: 90vw;
                padding: 0;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
                overflow: hidden;
                opacity: 0;
                transform: scale(0.92) translateY(14px);
                transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }

            #modal-surface.open dialog {
                opacity: 1;
                transform: scale(1) translateY(0);
            }

            dialog::backdrop {
                background: transparent;
            }

            .content {
                position: relative;
                padding: 10px 18px 28px 18px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                border-radius: 0;
                background: linear-gradient(135deg, rgba(5, 35, 1, 0.88) 0%, rgba(0, 0, 0, 0.88) 100%);
            }

            .close-pop-up {
                position: absolute;
                top: 14px;
                right: 14px;
                z-index: 10;
            }

            #close-modal {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 100%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #ffffff;
                transition: all 0.2s ease;
            }

            #close-modal:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: scale(1.08);
            }

            .promotion-logo {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #promotion-logo-image {
                width: 140px;
                height: 140px;
                object-fit: contain;
            }

            .promotion-offer {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 24px;
            }

            .promotion-details {
                flex: 1.2;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .offer-tag {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                color: #fff;
                padding: 4px 10px;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 700;
                width: fit-content;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }

            .offer-tag span {
                line-height: .8;
            }

            .offer-tag svg {
                width: 20px;
                height: 20px;
                stroke: #fff;
            }

            .offer-product-name {
                font-family: "Barlow Condensed", sans-serif;
                font-size: 1.85rem;
                font-weight: 800;
                line-height: 1;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .offer-discount {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 2px;
            }

            #discount-value {
                color: #a1a1aa;
                text-decoration: line-through;
                font-size: 1.5rem;
                font-weight: bolder;
                font-family: "Barlow Condensed";
            }

            #discount-percent {
                background-color: var(--primary-color);
                color: var(--secondary-color);
                font-weight: 800;
                font-size: 0.8rem;
                padding: 2px 8px;
                border-radius: 0;
                letter-spacing: 0.5px;
                padding: 3px 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
            }

            .offer-price {
                font-size: 2.4rem;
                font-weight: 900;
                color: #00CE3E;
                font-family: "Barlow Condensed";
            }

            #buy-now-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                background: var(--primary-color);
                color: #fff;
                font-size: 1rem;
                font-weight: 800;
                text-decoration: none;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                padding: 18px 24px;
                border-radius: 5px;
                margin-top: 20px;
                transition: transform 0.2s ease, filter 0.2s ease;
            }

            #buy-now-button:hover {
                filter: brightness(1.1);
                transform: translateY(-2px);
            }

            .product-images {
                flex: 0.9;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #product-link {
                display: block;
                text-decoration: none;
            }

            #product-image {
                max-width: 230px;
                max-height: 230px;
                width: 100%;
                height: auto;
                object-fit: contain;
                transition: transform 0.3s ease;
            }

            #product-image:hover {
                transform: scale(1.05);
            }

            @media (max-width: 600px) {
                .promotion-offer {
                    flex-direction: column-reverse;
                    gap: 16px;
                    text-align: center;
                }

                .promotion-details {
                    align-items: center;
                }

                .offer-product-name {
                    font-size: 1.05rem;
                }

                .offer-price {
                    font-size: 1.6rem;
                }

                #product-image {
                    max-width: 170px;
                    max-height: 170px;
                }

                #buy-now-button {
                    width: 100%;
                }
            }
        </style>

        <div id="modal-surface">
            <dialog>
                <section class="content">
                    <div class="content-row close-pop-up">
                        <button id="close-modal" aria-label="Fechar modal">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                    </div>

                    <div class="content-row promotion-logo">
                        <img id="promotion-logo-image" width="140" height="140"/>
                    </div>

                    <div class="content-row promotion-offer">
                        <div class="promotion-details">
                            <div class="offer-tag">
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>
                                <span>Oferta Imperdível</span>
                            </div>
                            <h2 class="offer-product-name" id="product-name">

                            </h2>
                            <div class="product-prices">
                                <div class="offer-discount">
                                    <span id="discount-value"></span>
                                    <span id="discount-percent"></span>
                                </div>
                                <span class="offer-price" id="offer-price"></span>
                            </div>

                            <a href="" id="buy-now-button">
                                Comprar Agora
                            </a>
                        </div>

                        <div class="product-images">
                            <a href="" id="product-link">
                                <img id="product-image" />
                            </a>
                        </div>
                    </div>
                </section>
            </dialog>
        </div>
        `;
    }

    connectedCallback() {
        this.surface = this.shadowRoot.querySelector("#modal-surface");
        this.dialog = this.shadowRoot.querySelector("dialog");

        this.shadowRoot.querySelector("#close-modal").addEventListener("click", () => this.close());

        this.surface.addEventListener("mousedown", event => {
            if (event.target === this.surface) {
                this.close();
            }
        });

        this.dialog.addEventListener("cancel", () => {
            this.close();
        });

        this.render();

        
        this.hasShownModal = false;
        this.canShowExitIntent = false;

        this.exitIntentTimeout = setTimeout(() => {
            this.canShowExitIntent = true;
        }, 200);

        
        this.handleMouseLeave = event => {
            if (!this.canShowExitIntent || this.hasShownModal) return;

            if (event.clientY <= 0 || !event.relatedTarget) {
                this.hasShownModal = true;
                this.open();
                document.removeEventListener("mouseleave", this.handleMouseLeave);
            }
        };

        document.addEventListener("mouseleave", this.handleMouseLeave);
    }

    disconnectedCallback() {
        if (this.exitIntentTimeout) {
            clearTimeout(this.exitIntentTimeout);
        }
        if (this.handleMouseLeave) {
            document.removeEventListener("mouseleave", this.handleMouseLeave);
        }
    }

    set product(value) {
        this._product = value;
        this.render();
    }

    get product() {
        return this._product;
    }

    formatPrice(value) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(Number(value));
    }

    render() {
        if (typeof MODAL_POPUP_PRODUCTS === "undefined" || typeof ACTUAL_PROMOTION === "undefined" || typeof FILE_IMG_PREFIX === "undefined") {
            return;
        }

        if (ACTUAL_PROMOTION.primaryColor) {
            this.style.setProperty("--primary-color", ACTUAL_PROMOTION.primaryColor);
        }
        if (ACTUAL_PROMOTION.secondaryColor) {
            this.style.setProperty("--secondary-color", ACTUAL_PROMOTION.secondaryColor);
        }
        if (ACTUAL_PROMOTION.rectColor) {
            this.style.setProperty("--rect-color", ACTUAL_PROMOTION.rectColor);
        }
        if (ACTUAL_PROMOTION.shadowColor) {
            this.style.setProperty("--shadow-color", ACTUAL_PROMOTION.shadowColor);
            this.style.setProperty("--border-color", `${ACTUAL_PROMOTION.shadowColor}66`);
        }

        if (this.dialog) {
            if (ACTUAL_PROMOTION.offersPopupBg) {
                this.dialog.style.backgroundImage = `url("${FILE_IMG_PREFIX}${ACTUAL_PROMOTION.offersPopupBg}")`;
            }
            if (ACTUAL_PROMOTION.rectColor) {
                this.dialog.style.backgroundColor = ACTUAL_PROMOTION.rectColor;
            }
        }

        
        const logoImg = this.shadowRoot.querySelector("#promotion-logo-image");
        if (logoImg) {
            const logoSrc = ACTUAL_PROMOTION.logo
                ? FILE_IMG_PREFIX + ACTUAL_PROMOTION.logo
                : (MODAL_POPUP_PRODUCTS.logoImg || "");
            logoImg.src = logoSrc;
            logoImg.alt = ACTUAL_PROMOTION.title || "Logo da Promoção";
        }

        
        if (!this._product) {
            const productsList = MODAL_POPUP_PRODUCTS.products || [];
            const activeProducts = productsList.filter(p => p.on !== false);
            const selectableProducts = activeProducts.length > 0 ? activeProducts : productsList;

            if (selectableProducts.length > 0) {
                this._product = selectableProducts[Math.floor(Math.random() * selectableProducts.length)];
            }
        }

        if (!this.isConnected || !this._product) return;
        
        this.shadowRoot.querySelector(".offer-tag span").textContent = this.product.cn ?? "Oferta Imperdível";
        this.shadowRoot.querySelector("#product-name").textContent = this.product.n ?? "";

        
        const productImg = this.shadowRoot.querySelector("#product-image");
        if (productImg) {
            productImg.src = FILE_IMG_PREFIX + (this.product.i ?? "");
            productImg.alt = this.product.n ?? "Produto em Oferta";
        }

        
        const baseUrl = "https://www.setupninja.com.br/" + (this.product.u ?? "");
        const url = new URL(baseUrl);
        url.searchParams.set("utm_source", "modal-oferta");
        const productUrl = url.toString();

        const buyNowBtn = this.shadowRoot.querySelector("#buy-now-button");
        if (buyNowBtn) {
            buyNowBtn.href = productUrl;
            buyNowBtn.target = "_blank";
            buyNowBtn.rel = "noopener noreferrer";
        }

        const productLink = this.shadowRoot.querySelector("#product-link");
        if (productLink) {
            productLink.href = productUrl;
            productLink.target = "_blank";
            productLink.rel = "noopener noreferrer";
        }

        
        this.shadowRoot.querySelector("#offer-price").textContent = this.formatPrice(this.product.p);
        this.shadowRoot.querySelector("#discount-value").textContent = this.formatPrice(this.product.pc);

        if (this.product.pc && this.product.pc > this.product.p) {
            const discountPercentage = Math.round(((this.product.pc - this.product.p) / this.product.pc) * 100);
            this.shadowRoot.querySelector("#discount-percent").textContent = `-${discountPercentage}%`;
            this.shadowRoot.querySelector("#discount-percent").style.display = "inline-block";
        } else {
            this.shadowRoot.querySelector("#discount-percent").textContent = "";
            this.shadowRoot.querySelector("#discount-percent").style.display = "none";
        }
    }

    open() {
        if (this.dialog && !this.dialog.open) {
            if (typeof this.dialog.show === "function") {
                this.dialog.show();
            } else {
                this.dialog.setAttribute("open", "");
            }
        }
        requestAnimationFrame(() => {
            if (this.surface) {
                this.surface.classList.add("open");
            }
        });
    }

    close() {
        if (this.surface) {
            this.surface.classList.remove("open");
        }
        setTimeout(() => {
            if (this.dialog && this.dialog.open && !this.surface?.classList.contains("open")) {
                this.dialog.close();
            }
        }, 350);
    }
}

customElements.define("offer-modal", OfferModal);
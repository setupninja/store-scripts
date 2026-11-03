(() => {
    if (window.location.pathname === "/") return;

    let initialized = false;
    let isVisible = true;

    const SELECTORS = {
        productInfo: ".product-info .product-info-content",
        formAddCart: "#form-add-cart",
        priceDiscount: "#form-add-cart .product-values .product-action-price .product-price-discount",
        priceFinal: "#form-add-cart .product-values .product-action-price .product-price-final span.total",
        creditParcel: '#form-add-cart .product-values .product-action-price.creditcard div[data-price-method="creditcard"] span.parcel',
        creditParcelPrice: '#form-add-cart .product-values .product-action-price.creditcard div[data-price-method="creditcard"] span.parcel-price',
        fabButton: ".fab-button",
        ninjaChat: "#ia-fab-wrap",
        footer: "footer.footer",
    };

    const LOADING_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#e6e6e6"><path fill-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>';
    const BUY_COOLDOWN_MS = 4000;
    const OBSERVER_TIMEOUT_MS = 10000;
    const CHAT_RETRY_DELAY_MS = 1000;
    const CHAT_MAX_RETRIES = 5;

    const FabButton = {
        _el: null,
        _baseBottom: null,
        _chatNodes: null,
        _chatDir: null,

        init() {
            this._el = document.querySelector(SELECTORS.fabButton);
            if (this._el) {
                this._baseBottom = parseFloat(getComputedStyle(this._el).bottom);
            }
        },

        _getChatNodes() {
            if (this._chatNodes) return this._chatNodes;
            const host = document.getElementById("ninja-chat-host");
            if (!host?.shadowRoot) return null;

            const root = host.shadowRoot.querySelector(".ia-widget-root");
            const fabWrap = host.shadowRoot.querySelector(".ia-fab-wrap");
            if (!root && !fabWrap) return null;

            const nodes = [];
            if (root) {
                nodes.push({
                    el: root,
                    baseBottom: parseFloat(getComputedStyle(root).bottom) || 30
                });
            }
            if (fabWrap) {
                nodes.push({
                    el: fabWrap,
                    baseBottom: parseFloat(getComputedStyle(fabWrap).bottom) || 30
                });
            }

            this._chatNodes = nodes;
            return this._chatNodes;
        },

        _slideChat(dir, bar, tries = 0) {
            this._chatDir = dir;
            const nodes = this._getChatNodes();

            if (!nodes || nodes.length === 0) {
                if (dir === "up" && tries < CHAT_MAX_RETRIES) {
                    setTimeout(() => {
                        if (this._chatDir === dir) this._slideChat(dir, bar, tries + 1);
                    }, CHAT_RETRY_DELAY_MS);
                }
                return;
            }

            const targetBottom = bar.getBoundingClientRect().height + 30;

            nodes.forEach(({ el, baseBottom }) => {
                if (dir === "up") {
                    el.style.setProperty("bottom", `${targetBottom}px`, "important");
                } else {
                    el.style.removeProperty("bottom");
                    if (!isNaN(baseBottom)) {
                        el.style.bottom = `${baseBottom}px`;
                    }
                }
            });
        },

        slide(dir, bar) {
            this._slideChat(dir, bar);

            if (!this._el) {
                this._el = document.querySelector(SELECTORS.fabButton);
                if (this._el) this._baseBottom = parseFloat(getComputedStyle(this._el).bottom);
            }
            if (!this._el || this._baseBottom == null) return;

            const targetBottom = bar.getBoundingClientRect().height + 30;

            this._el.style.bottom = dir === "up"
                ? `${targetBottom}px`
                : `${this._baseBottom}px`;
        },
    };

    const STYLES = `
.alternative-pd-style {
    position: fixed;
    bottom: -400px;
    left: 0;
    width: 100%;
    z-index: 9999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #25252d;
    padding: 10px 30px;
    gap: 8px;
    transition: bottom .5s ease-in-out;
    box-shadow: 0 -6px 7px rgba(0,0,0,.2);
}

.alternative-pd-style > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
}

.alternative-pd-style.show-alternative {
    bottom: -1px;
}

.alternative-pd-style .prices-div {
    display: flex;
    flex-direction: column;
}

.alternative-pd-style .prices-div span {
    line-height: 22px;
}

.alternative-pd-style .prices-div .alternative-pd-discount {
    color: #CF0000;
    font-weight: 700;
    text-decoration: line-through;
    font-size: 18px;
    margin-bottom: 3px;
}

.alternative-pd-style .prices-div .alternative-pd-price {
    color: #00CE3E;
    font-weight: 700;
    font-size: 22px;
}

.alternative-pd-style .prices-div .alternative-pd-price .pay-mth {
    color: #00CE3E;
    position: relative;
    font-size: .55em;
    opacity: .8;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    gap: 3px;
}

.alternative-pd-style .prices-div .alternative-pd-price .pay-mth::after {
    content: "";
    width: 17px;
    height: 17px;
    display: inline-block;
    background-color: #00CE3E;
    -webkit-mask: url('data:image/svg+xml;utf8,<svg fill="%2300CE3E" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path d="m14.377 6.496-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg>') no-repeat center / contain;
    mask: url('data:image/svg+xml;utf8,<svg fill="%2300CE3E" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path d="m14.377 6.496-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg>') no-repeat center / contain;
}

.alternative-pd-style .credit-card-price {
    font-size: 15px;
}

.alternative-pd-style .credit-card-price .credit-card-parcel-hightlight {
    color: #ff7300;
    font-size: 1.1em;
}

.alternative-pd-style .action-buy-product {
    margin-top: 4px;
}

.alternative-pd-style .action-buy-product button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    padding: 10px 20px;
    background-color: #00CE3E;
    color: #fff;
    font-weight: 400;
    font-size: 15px;
    text-transform: uppercase;
    border: 0;
    outline: 0;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
    cursor: pointer;
}

.alternative-pd-style #alternative-pd-action-buy-button.alt-buy-button-loading {
    background-color: #01aa34;
}

.alternative-pd-style #alternative-pd-action-buy-button.alt-buy-button-loading svg {
    animation: loadingSpin 1s linear infinite;
    width: 50px;
    height: 50px;
    opacity: .8;
}

@keyframes loadingSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

@media (max-width: 520px) {
    .alternative-pd-style {
        padding: 10px;
    }

    .alternative-pd-style > div {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    .alternative-pd-style .price-container,
    .alternative-pd-style .action-buy-product {
        width: 100%;
    }

    .alternative-pd-style .credit-card-price {
        font-size: 13px;
    }

    .alternative-pd-style .action-buy-product button {
        width: 100%;
    }
}`;

    function initTarget(target) {
        if (!target || initialized) return;
        initialized = true;

        const text = (sel) => target.querySelector(sel)?.textContent || "";
        const pdPrice       = text(SELECTORS.priceDiscount);
        const pdDiscount    = text(SELECTORS.priceFinal);
        const ccParcel      = text(SELECTORS.creditParcel);
        const ccParcelPrice = text(SELECTORS.creditParcelPrice);

        const styleEl = document.createElement("style");
        styleEl.textContent = STYLES;
        document.head.appendChild(styleEl);

        const bar = document.createElement("div");
        bar.className = "alternative-pd-style";
        bar.innerHTML = `
            <div>
                <div class="price-container">
                    <div class="prices-div">
                        <span class="alternative-pd-discount">${pdPrice}</span>
                        <span class="alternative-pd-price">${pdDiscount} <span class="pay-mth">no pix</span></span>
                    </div>
                    <div class="credit-card-price">em <span class="credit-card-parcel-hightlight">até ${ccParcel} ${ccParcelPrice}</span> sem juros</div>
                </div>
                <div class="action-buy-product">
                    <button type="submit" id="alternative-pd-action-buy-button">Comprar</button>
                </div>
            </div>`;

        const buyBtn = bar.querySelector("#alternative-pd-action-buy-button");
        let canClick = true;

        buyBtn.addEventListener("click", (e) => {
            if (!canClick) { e.preventDefault(); return; }
            canClick = false;

            buyBtn.classList.add("alt-buy-button-loading");
            buyBtn.innerHTML = LOADING_SVG;

            setTimeout(() => {
                buyBtn.classList.remove("alt-buy-button-loading");
                buyBtn.textContent = "Comprar";
                canClick = true;
            }, BUY_COOLDOWN_MS);
        });

        const form = target.querySelector(SELECTORS.formAddCart);
        form.style.position = "relative";
        form.append(bar);

        const footer = document.querySelector(SELECTORS.footer);
        if (footer) {
            const barHeight = bar.getBoundingClientRect().height || 65;
            footer.style.paddingBottom = `${barHeight + 30}px`;
        }

        FabButton.init();

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting === isVisible) return;
                isVisible = entry.isIntersecting;

                if (isVisible) {
                    bar.classList.remove("show-alternative");
                    FabButton.slide("down", bar);
                } else {
                    bar.classList.add("show-alternative");
                    FabButton.slide("up", bar);
                }
            },
            { root: null, threshold: 0 },
        );
        io.observe(target);
    }

    const target = document.querySelector(SELECTORS.productInfo);
    if (target) { initTarget(target); return; }

    const domObs = new MutationObserver(() => {
        const el = document.querySelector(SELECTORS.productInfo);
        if (el) { domObs.disconnect(); initTarget(el); }
    });

    domObs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => domObs.disconnect(), OBSERVER_TIMEOUT_MS);
})();

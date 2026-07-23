
(() => {
    if (window.location.pathname === "/") return;
    // if(localStorage.getItem("dev-mode") === "true") {
    // const MOBILE_BREAK_POINT = 445;
    let targetInsert = false
    // if (window.innerWidth > MOBILE_BREAK_POINT) return;

    let visivel = true;

    function initTarget(target) {
        if (!target || targetInsert) return;

        targetInsert = true
        const alternative_pd_info = document.createElement("div");
        alternative_pd_info.classList.add("alternative-pd-style");

        const pd_price = target.querySelector("#form-add-cart .product-values .product-action-price .product-price-discount")?.textContent || "";
        const pd_discount = target.querySelector("#form-add-cart .product-values .product-action-price .product-price-final span.total")?.textContent || "";
        const credit_card_price = target.querySelector('#form-add-cart .product-values .product-action-price.creditcard div[data-price-method="creditcard"] span.total')?.textContent || "";
        const credit_card_parcel = target.querySelector('#form-add-cart .product-values .product-action-price.creditcard div[data-price-method="creditcard"] span.parcel')?.textContent || "";
        const credit_card_parcel_price = target.querySelector('#form-add-cart .product-values .product-action-price.creditcard div[data-price-method="creditcard"] span.parcel-price')?.textContent || "";
        const action_buy_button = target.querySelector('#form-add-cart .product-buy .product-action-buy')
        const pd_title = target.querySelector(".product-title h1.h1")?.textContent

        const FabButton = {
            _fabEl: document.querySelector(".fab-button"),
            _originalBottom: null,

            init: function () {
                const style = window.getComputedStyle(this._fabEl);
                this._originalBottom = parseFloat(style.bottom);
            },

            slideFab: function (dir, target) {
                if (!target || !this._fabEl || this._originalBottom === null) return;

                if (dir === "up") {
                    const offset = 10;
                    const height = target.offsetHeight;

                    this._fabEl.style.bottom = `${this._originalBottom + height + offset}px`;
                } else {
                    this._fabEl.style.bottom = `${this._originalBottom}px`;
                }
            }
        }

        FabButton.init()

        const form_add_card = target.querySelector("#form-add-cart");
        form_add_card.style.position = "relative";
        // <div class="product-name-alternative"><h2>${pd_title}</h2></div>

        const footerContainer = document.querySelector("footer.footer")
        footerContainer.style = "padding-bottom: 95px;"

        alternative_pd_info.innerHTML = `
                <div>
                    <div class="price-container">
                        <div class="prices-div"><span class="alternative-pd-discount">${pd_price}</span><span class="alternative-pd-price">${pd_discount} <span class="pay-mth">no pix</span></span></div>
                        <div class="credit-card-price">em <span class="credit-card-parcel-hightlight">até ${credit_card_parcel} ${credit_card_parcel_price}</span> sem juros</div>
                    </div>
                    <div class="action-buy-product">
                        <button type="submit" id="alternative-pd-action-buy-button">Comprar</button>
                    </div>
                </div>
            `;

        let canHandleClick = true

        alternative_pd_info.querySelector("#alternative-pd-action-buy-button")?.addEventListener("click", (e) => {
            if (!canHandleClick) {
                e.preventDefault()
                return
            };
            canHandleClick = false;

            e.target.classList.add("alt-buy-button-loading")
            e.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#e6e6e6"><path fill-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"/></svg>'

            setTimeout(() => {
                e.target.classList.remove("alt-buy-button-loading")
                e.target.innerHTML = "Comprar"
                canHandleClick = true
            }, 4000);
        })

        form_add_card.append(alternative_pd_info);

        const alternative_pd_style = document.createElement("style");
        alternative_pd_style.innerHTML = `
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
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
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

.alternative-pd-style .product-name-alternative {
    margin-bottom: 6px;
}

.alternative-pd-style .product-name-alternative h2 {
    font-size: 14px;
    opacity: .8;
}

.alternative-pd-style .action-buy-product {
    margin-top: 4px;
}

.alternative-pd-style .action-buy-product button {
    width: 100%;
    background-color: #00CE3E;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #fff;
    padding: 10px 20px;
    border: 0;
    outline: 0;
    text-transform: uppercase;
    box-shadow: 0 0 5px rgba(0,0,0,.4);
    cursor: pointer;
    height: 50px;
    width: 200px;
}

@media (max-width: 768px) {
    .alternative-pd-style > div{
        flex-direction: row;
        justify-content: space-between;
    }
}

@media (max-width: 520px) {
    .alternative-pd-style > div {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }
        
    .alternative-pd-style {
        padding: 10px 10px;
    }
        
    .alternative-pd-style #alternative-pd-action-buy-button {
            
    }

    .alternative-pd-style > div {
        flex-direction: column;
    }
    
    .alternative-pd-style .price-container, .alternative-pd-style .action-buy-product {
        width: 100%;
    }

    .alternative-pd-style .credit-card-price {
        font-size: 13px;
    }

    .alternative-pd-style .action-buy-product button {
        width: 100%;
    }
}`;
        document.head.appendChild(alternative_pd_style);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !visivel) {
                    visivel = true;
                    FabButton.slideFab("down", alternative_pd_info)
                    alternative_pd_info.classList.remove("show-alternative")
                } else if (!entry.isIntersecting && visivel) {
                    visivel = false;
                    FabButton.slideFab("up", alternative_pd_info)
                    alternative_pd_info.classList.add("show-alternative")
                }
            },
            { root: null, threshold: 0 }
        );

        observer.observe(target);
    }

    const domObserver = new MutationObserver(() => {
        const target = document.querySelector(".product-info .product-info-content");
        if (target) {
            initTarget(target);
            domObserver.disconnect();
        }
    });

    setTimeout(() => {
        domObserver.disconnect()
    }, 10000);

    domObserver.observe(document.body, { childList: true, subtree: true });

    const target = document.querySelector(".product-info .product-info-content");
    if (target) { initTarget(target); domObserver.disconnect() };
    // }
})();

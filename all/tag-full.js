document.addEventListener("DOMContentLoaded", function () {
    ("true" === localStorage.getItem("habilitado-full") ||
        window.location.search.includes("utm_source=full")) &&
        document.querySelectorAll(".product-card").forEach(t => {

            const productName = t.dataset.productName || "";

            if (/\bpc\s*gamer\b/i.test(productName)) return;

            const n = t.querySelector(".product-image .product-tags");

            if (
                !n ||
                t.querySelector("#entrega-full-tag") ||
                t.querySelector('.TA--tag [data-tag="16987"]')
            ) return;

    window.innerWidth >= 1200
    ? n.insertAdjacentHTML("beforeend", `
                <div
                    id="entrega-full-tag"
                    title="Compre e receba HOJE ou AMANHÃ!"
                    onclick="event.stopPropagation(); event.preventDefault(); window.location.href='https://www.setupninja.com.br/entrega-full-rj';"
                    style="
                        color: white !important;
                        position: absolute !important;
                        top: 0px !important;
                        right: 0px !important;
                        max-width: 77px !important;
                        max-height: 37px !important;
                        z-index: 11 !important;
                        cursor: pointer !important;
                        font-size: 10px !important;
                        background-color: #00FF00 !important;
                        padding-top: 9px !important;
                        padding-bottom: 13px !important;
                        padding-left: 8px !important;
                        padding-right: 8px !important;
                        line-height: 13px !important;
                        word-spacing: 0px !important;
                        display: flex !important;
                        align-items: center !important;
                        gap: 5px;
                    "
                >
                    <div class="entrega-full-tag-icon"></div>

                    <div style="
                        display: flex !important;
                        flex-direction: column !important;
                        color: black !important;
                    ">
                        <span>Entrega</span>
                        <span style="align-self: center !important;">FULL</span>
                    </div>
                </div>
            `)
    : window.innerWidth <= 425
        ? n.insertAdjacentHTML("beforeend", `
                    <div
                        id="entrega-full-tag"
                        title="Compre e receba HOJE ou AMANHÃ!"
                        onclick="event.stopPropagation(); event.preventDefault(); window.location.href='https://www.setupninja.com.br/entrega-full-rj';"
                        style="
                            color: white !important;
                            position: absolute !important;
                            top: 0px !important;
                            right: 0px !important;
                            max-width: 77px !important;
                            max-height: 37px !important;
                            z-index: 11 !important;
                            font-weight: bold !important;
                            cursor: pointer !important;
                            font-size: 10px !important;
                            background-color: #00FF00 !important;
                            padding-top: 3px !important;
                            padding-bottom: 2px !important;
                            padding-left: 8px !important;
                            padding-right: 8px !important;
                            line-height: 13px !important;
                            word-spacing: 0px !important;
                            display: flex !important;
                            align-items: center !important;
                            gap: 5px;
                        "
                    >
                        <div class="entrega-full-tag-icon"></div>

                        <div style="
                            display: flex !important;
                            flex-direction: column !important;
                            color: black !important;
                        ">
                            <span>Entrega</span>
                            <span style="align-self: center !important;">FULL</span>
                        </div>
                    </div>
                `)
        : window.innerWidth <= 767
            ? n.insertAdjacentHTML("beforeend", `
                        <div
                            id="entrega-full-tag"
                            title="Compre e receba HOJE ou AMANHÃ!"
                            onclick="event.stopPropagation(); event.preventDefault(); window.location.href='https://www.setupninja.com.br/entrega-full-rj';"
                            style="
                                color: white !important;
                                position: absolute !important;
                                top: 0px !important;
                                right: 0px !important;
                                max-width: 77px !important;
                                max-height: 37px !important;
                                z-index: 11 !important;
                                cursor: pointer !important;
                                font-size: 10px !important;
                                background-color: #00FF00 !important;
                                padding-top: 3px !important;
                                padding-bottom: 2px !important;
                                padding-left: 8px !important;
                                padding-right: 8px !important;
                                line-height: 13px !important;
                                word-spacing: 0px !important;
                                display: flex !important;
                                align-items: center !important;
                                gap: 5px;
                            "
                        >
                            <div class="entrega-full-tag-icon"></div>

                            <div style="
                                display: flex !important;
                                flex-direction: column !important;
                                color: black !important;
                            ">
                                <span>Entrega</span>
                                <span style="align-self: center !important;">FULL</span>
                            </div>
                        </div>
                    `)
            : (window.innerWidth <= 991 || window.innerWidth <= 1199) &&
            n.insertAdjacentHTML("beforeend", `
                            <div
                                id="entrega-full-tag"
                                title="Compre e receba HOJE ou AMANHÃ!"
                                onclick="event.stopPropagation(); event.preventDefault(); window.location.href='https://www.setupninja.com.br/entrega-full-rj';"
                                style="
                                    color: white !important;
                                    position: absolute !important;
                                    top: 0px !important;
                                    right: 0px !important;
                                    max-width: 77px !important;
                                    max-height: 37px !important;
                                    z-index: 11 !important;
                                    cursor: pointer !important;
                                    font-size: 10px !important;
                                    background-color: #00FF00 !important;
                                    padding-top: 4px !important;
                                    padding-bottom: 4px !important;
                                    padding-left: 8px !important;
                                    padding-right: 8px !important;
                                    word-spacing: 0px !important;
                                    display: flex !important;
                                    flex-direction: row !important;
                                "
                            >
                                <div class="entrega-full-tag-icon"></div>

                                <div style="
                                    display: flex !important;
                                    flex-direction: column !important;
                                    color: black !important;
                                ">
                                    <span>Entrega</span>
                                    <span style="align-self: center !important;">FULL</span>
                                </div>
                            </div>
                        `);
        });
});
(() => {
    const FAB_ID = "setup-ninja-fab"
    const LOGO_URL = "https://cdn.dooca.store/174137/files/logo-white-100.png?v=1761155777"

    if (document.getElementById(FAB_ID)) return

    const path = window.location.pathname
    const isMonteSeuPc = path.includes("monte-seu-pc")
    const isHome = path === "/"

    const icons = {
        link: `
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    d="M7.05025 1.53553C8.03344 0.552348 9.36692 0 10.7574 0C13.6528 0 16 2.34721 16 5.24264C16 6.63308 15.4477 7.96656 14.4645 8.94975L12.4142 11L11 9.58579L13.0503 7.53553C13.6584 6.92742 14 6.10264 14 5.24264C14 3.45178 12.5482 2 10.7574 2C9.89736 2 9.07258 2.34163 8.46447 2.94975L6.41421 5L5 3.58579L7.05025 1.53553Z"
                    fill="currentColor"
                />
                <path
                    d="M7.53553 13.0503L9.58579 11L11 12.4142L8.94975 14.4645C7.96656 15.4477 6.63308 16 5.24264 16C2.34721 16 0 13.6528 0 10.7574C0 9.36693 0.552347 8.03344 1.53553 7.05025L3.58579 5L5 6.41421L2.94975 8.46447C2.34163 9.07258 2 9.89736 2 10.7574C2 12.5482 3.45178 14 5.24264 14C6.10264 14 6.92742 13.6584 7.53553 13.0503Z"
                    fill="currentColor"
                />
                <path
                    d="M5.70711 11.7071L11.7071 5.70711L10.2929 4.29289L4.29289 10.2929L5.70711 11.7071Z"
                    fill="currentColor"
                />
            </svg>
        `,

        instagram: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                    fill="currentColor"/>

                <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="currentColor"/>

                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49605 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                    fill="currentColor"/>
            </svg>
        `,

        youtube: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z"
                    fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z" fill="currentColor"/>
            </svg>
        `,

        whatsapp: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"    aria-hidden="true">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                    fill="currentColor"
                />
            </svg>
        `,

        close: `
            <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    fill="currentColor"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496Z"
                />
            </svg>
        `
    }

    const links = [
        ...(isHome
            ? []
            : [
                  {
                      label: "Setup Ninja",
                      href: "https://www.setupninja.com.br/?utm_source=fabbutton",
                      ariaLabel: "Loja Setup Ninja",
                      iconId: "setup-fab-icon",
                      icon: `
                          <img src="${LOGO_URL}" alt="">
                      `
                  }
              ]),

        {
            label: "Bio",
            href: "https://bio.setupninja.com.br/",
            ariaLabel: "Links da Setup Ninja",
            iconId: "links-fab-icon",
            icon: icons.link
        },

        {
            label: "Instagram",
            href: "https://www.instagram.com/setupninjainfo/",
            ariaLabel: "Instagram da Setup Ninja",
            iconId: "instagram-fab-icon",
            icon: icons.instagram
        },

        {
            label: "YouTube",
            href: "https://www.youtube.com/@setupninja",
            ariaLabel: "YouTube da Setup Ninja",
            iconId: "youtube-fab-icon",
            icon: icons.youtube
        },

        {
            label: "Atendimento",
            href:
                "https://api.whatsapp.com/send" +
                "?l=pt_br" +
                "&phone=5521980115833" +
                "&text=" +
                encodeURIComponent(
                    "Olá! estou na loja Setup Ninja e gostaria de mais informações."
                ),
            ariaLabel: "Iniciar atendimento",
            iconId: "whatsapp-fab-icon",
            icon: icons.whatsapp
        }
    ]

    const renderLink = ({
        label,
        href,
        ariaLabel,
        iconId,
        icon
    }) => `
        <a
            href="${href}"
            class="fab-option-wrapper"
            aria-label="${ariaLabel}"
        >
            <div class="fab-option-row">
                <div class="option-text">
                    <p>${label}</p>
                </div>

                <div
                    class="fab-option"
                    id="${iconId}"
                >
                    ${icon}
                </div>
            </div>
        </a>
    `
    const overlay = document.createElement("div")
    overlay.className = "fab-button-modal-bg"
    overlay.setAttribute("aria-hidden", "true")
    const fab = document.createElement("div")
    fab.id = FAB_ID
    fab.className = [
        "setup-ninja-fab",
        isMonteSeuPc ? "setup-ninja-fab--monte-seu-pc" : ""
    ]
        .filter(Boolean)
        .join(" ")

    fab.innerHTML = `
        <button
            type="button"
            class="fab-button"
            id="closed-icon"
            aria-label="Abrir menu Setup Ninja"
            aria-expanded="false"
            aria-controls="setup-ninja-fab-options"
        >
            <img src="${LOGO_URL}" alt="" class="fab-main-logo">
        </button>
        <div class="fab-options" id="setup-ninja-fab-options" aria-hidden="true">
            ${links.map(renderLink).join("")}

            <div class="fab-option-row">
                <button
                    type="button"
                    class="fab-option fab-close-button"
                    id="opened-icon"
                    aria-label="Fechar menu"
                >
                    ${icons.close}
                </button>
            </div>
        </div>
    `
    document.body.appendChild(overlay)
    document.body.appendChild(fab)
    const openButton = fab.querySelector("#closed-icon")
    const closeButton = fab.querySelector("#opened-icon")
    const options = fab.querySelector(".fab-options")
    const logo = fab.querySelector(".fab-main-logo")
    let shakeTimeout = null
    const isOpen = () => fab.classList.contains("is-open")
    const openMenu = () => {
        if (isOpen()) return
        fab.classList.add("is-open")
        overlay.classList.add("show")
        openButton.setAttribute("aria-expanded", "true")
        options.setAttribute("aria-hidden", "false")
        overlay.setAttribute("aria-hidden", "false")
    }

    const closeMenu = () => {
        if (!isOpen()) return
        fab.classList.remove("is-open")
        overlay.classList.remove("show")
        openButton.setAttribute("aria-expanded", "false")
        options.setAttribute("aria-hidden", "true")
        overlay.setAttribute("aria-hidden", "true")
    }

    const toggleMenu = () => {
        if (isOpen()) {
            closeMenu()
            return
        }
        openMenu()
    }

    const shakeLogo = () => {
        if (!logo || isOpen()) return
        logo.classList.remove("shake-smooth")
        void logo.offsetWidth
        logo.classList.add("shake-smooth")
    }

    const scheduleShake = () => {
        const delay = Math.floor(Math.random() * 7000) + 7000
        shakeTimeout = window.setTimeout(() => {
            shakeLogo()
            scheduleShake()
        }, delay)
    }

    openButton.addEventListener("click", toggleMenu)
    closeButton.addEventListener("click", closeMenu)
    overlay.addEventListener("click", closeMenu)

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return
        closeMenu()
    })

    logo.addEventListener("animationend", () => {
        logo.classList.remove("shake-smooth")
    })

    fab.addEventListener("click", event => {
        const link = event.target.closest("a")
        if (!link) return
        closeMenu()
    })

    scheduleShake()
})()
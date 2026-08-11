document.addEventListener('DOMContentLoaded', function () {
    const docTitle = document.title.toLowerCase().trim()
    const pcsNamesExceptions = ["pc gamer square"]
    const isException = pcsNamesExceptions.some(exception => docTitle.includes(exception))
    if (
        window.location.pathname.length < 4 ||
        !docTitle.includes("pc gamer")
        || isException
    ) { return }

    const sku = document.querySelector(".product-title .product-reference span.text")
        ?.textContent
        ?.replace(/^REF:\s*/i, "")
        ?.trim()
    
    console.log(`SKU PC GAMER DESC ${sku}`)

    let finished = false;
    let lastRun = 0;
    let tries = 0;
    const MAX_TRIES = 20;
    const INTERVAL_MS = 500;

    const observer = new MutationObserver(() => {
        if (finished) return;

        const now = Date.now();
        if (now - lastRun < INTERVAL_MS) return;
        lastRun = now;

        tries++;
        if (tries >= MAX_TRIES) {
            observer.disconnect();
            return;
        }

        const container = document.querySelector('.product-description-item div div')
        if (container) {
            container.insertAdjacentHTML('afterend', `

<style>  

.product-description-item{
line-height: 1.2;
}

.caracts-pc {
    font-family: 'Poppins', sans-serif !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    gap: 10px;
}

.first-row-containers .caract-container {
    height: 425px;
}

.caract-container {
    border-radius: 8px;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px;
    background-color: rgb(75, 75, 75);
    overflow: hidden;
    border: 1px solid rgb(125, 125, 125);
    box-shadow: 0 4px 15px rgb(0 0 0);
}

.caract-highlight-container {
    top: 10px;
    left: 10px;
    position: absolute;
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    line-height: 1;
}

.caract-highlight-viewer {
    top: 10px;
    right: 10px;
    position: absolute;
    width: 2em;
    height: 30px;
    cursor: pointer;
    border: 1px solid rgb(125, 125, 125);
    border-radius: 8px;
    padding: 0 8px;
}

.caract-highlight {
    display: grid;
    grid-template-rows: auto 0fr;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgb(0 0 0);
    overflow: hidden;
    transition: grid-template-rows 0.35s ease;
    transition: border 0.35 ease;
}

.caract-highlight.is-hover {
    cursor: pointer;
    grid-template-rows: auto 1fr;
    border: 1px solid rgb(125, 125, 125);
}

.caract-highlight.is-hover .caract-highlight-desc {
    cursor: default;
    padding: 0.5em;
}

.caract-highlight.is-hover .caract-highlight-header {
    border: 0;
}

.caract-highlight-header {
    font-size: 1.1em;
    padding: 0 10px;
    height: 35px;
    border-radius: 8px;
    border: 1px solid rgb(125, 125, 125);
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.caract-highlight-title {
    text-align: center;
    width: 80%;
    margin: 0 !important;
}

.caract-highlight-desc {
    overflow: hidden;
}

.caract-highlight-desc p {
    text-align: center;
    font-family: "Open Sans", sans-serif !important;
    line-height: 1.3;
}

.caract-highlight-container .caract-highlight img {
    width: 15%;
}

.caract-image {
    position: relative;
}

.first-row-containers .caract-image {
    background-image: url('https://cdn.dooca.store/174137/files/darkbackground2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 60%;
    padding-top: 10px;
    padding-bottom: 10px;
}

.first-row-containers .caract-text {
    height: 40%;
}

.second-row-containers .caract-image {
    background-color: white;
    width: 100%;
    height: 55%;
}

.second-row-containers .caract-text {
    height: 45%;
}

.second-row-containers .caract-highlight-container {
    width: 60%;
    max-width: 210px;
}

.caract-image-img {
    display: block;
    margin: 0 auto;
    max-height: 100%;
    width: auto;
    object-fit: contain;
}

.caract-text {
    background: radial-gradient(circle, rgba(66, 66, 66, 1) 0%, rgba(38, 38, 38, 1) 100%);
    height: 60%;
    min-width: 100%;

    font-size: clamp(14px, 2vw, 10px);
    border-radius: 0 0 8px 8px;
}

.caract-container .caract-text p {
    font-family: "Open Sans", sans-serif !important;
    font-weight: 900 !important;
    padding: 0 10px 10px 10px !important;
    text-align: justify !important;
}

.caract-text h2 {
    text-align: center;
    font-family: "Poppins", sans-serif !important;
    font-weight: bold !important;
    font-style: normal !important;
    text-transform: uppercase !important;
    font-size: clamp(15px, 2.2vw, 20px) !important;
    padding: 0 3px 0 3px !important;
    margin-block-start: 0.5em !important;
    margin-block-end: 0.5em !important;
}

.first-row-containers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 0 auto;
}

.second-row-containers {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 0 auto;
}

.second-row-containers .caract-container {
    height: 400px;
    justify-self: center;
}

.second-row-containers .caract-container.centered {
    grid-column: 2 / span 2;
    justify-self: center;
    margin: 0 25%;
}

.caracts-pc .saiba-mais-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url('https://cdn.dooca.store/174137/files/fundodark.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 12px;
    padding: 0px 4vw;
    border: 1px solid rgb(125, 125, 125);
    box-shadow: 0 4px 15px rgb(0 0 0);
}

.saiba-mais-container img {
    max-width: clamp(250px, 35vw, 500px);

    padding: 10px;
    margin: 0 auto;
}

.caracts-pc .benefits {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 60px;
    margin: 0 auto;
    align-items: start;
    padding: 0 2vw;
}

.caracts-pc .benefit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    max-width: 300px;
}

.caracts-pc .benefit h2 {
    font-size: clamp(15px, 2.2vw, 20px);
    margin: 0;
}

.caracts-pc .benefit p {
    font-size: clamp(14px, 2vw, 10px);
    font-family: 'Open Sans' !important;
}

.caracts-pc .benefit p span {
    font-weight: bold;
}

.caracts-pc .benefit img {
    width: 100px;
}

.main-pc-description {
    font-size: 16px;
    font-family: 'Open Sans';
}

.caracts-pc .observations {
    background: radial-gradient(circle, rgba(38, 38, 38, 1) 0%, rgba(66, 66, 66, 1) 100%);
    border-radius: 12px;
    padding: 0px 4vw;
    border: 1px solid rgb(125, 125, 125);
    box-shadow: 0 4px 15px rgb(0 0 0);
    text-align: center;
    font-size: 12px;
    font-weight: 900 !important;
    font-family: 'Open Sans';
}

.caracts-pc .observations a {
    color: #ff7300;
}

.caracts-pc-title {
    text-align: center !important;
    font-size: clamp(30px, 2.2vw, 40px) !important;
    text-transform: uppercase !important;
}

.fps-table {
    width: 90%;
    font-size: 10px;
}

.caracts-pc .main-section {
    display: flex;
    column-gap: 20px;
    margin: 0 auto;
    max-width: 1000px;
}

.caracts-pc .youtube-column {
    position: relative;
    width: 60%;
    min-height: 400px;
    display: flex;
    justify-content: center;
}

.caracts-pc .youtube-container {
    position: absolute;
    top: 50%;
    transform: translateY(-65%);

    width: 100%;
    max-height: 560px;
    aspect-ratio: 16/9;

    border: 1.5px solid rgb(125, 125, 125);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);

    border-radius: 16px;
    overflow: hidden;
}

.table-column {
    width: 40%;
}


.youtube-container iframe {
    border: none;
    width: 100%;
    height: 100%;
}

.fps-table p {
    color: white;
    margin: 0;
}

#fps-obs {
    font-size: 12px;
    color: gray;
    margin-top: -10px;
}

.caracts-pc h1 {
    margin: 0;
    font-size: clamp(20px, 2.2vw, 40px) !important;
    text-align: center;
    font-family: Poppins, sans-serif;
    font-weight: bold;

    background: linear-gradient(270deg, #ff7300, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
}

table.fps-table {
    width: 100%;
    border-collapse: separate;
    border-radius: 12px;
    border-spacing: 0;
    border: 1px solid rgb(125, 125, 125);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    font-family: Poppins, sans-serif;
    color: white;
    margin: 20px auto;
}

.fps-table th,
.fps-table td {
    text-align: center;
}

.fps-table th {
    background-color: #2A2E33;
    color: #ff7300;
    padding: 6px;
    font-size: 14px;
}

#fps-value-label {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 4px;
}

.fps-table .game-img {
    width: 3.8em;
}

.caracts-pc .fps-table .fps-value {
    padding: 0.5em 0.8em;
}


.fps-table tr {
    font-size: 1.4em
}

.fps-table tr:nth-child(even) {
    background: radial-gradient(circle, rgba(66, 66, 66, 1) 0%, rgba(38, 38, 38, 1) 100%);
}

.fps-table tr:nth-child(odd) {
    background: radial-gradient(circle, rgba(33, 33, 33, 1) 0%, rgba(38, 38, 38, 1) 100%);
}

.fps-table tr:last-child td {
    border-bottom: none;
}

.fps-table .bar-container {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 1.2em;
    background: #818181;
    border-radius: 0.5em;
    overflow: hidden;
    position: relative;

}

.fps-table .bar-fill {
    height: 100%;

    background: linear-gradient(270deg, #ff7300, #ffcc00, #ff7300, #ffcc00);
    background-size: 400% 100%;
    animation: pulseGradient 4s linear infinite;
}

.hidden {
    overflow: hidden;
}

@keyframes scalePulse {
    0% {
    transform: scale(1);
    }

    50% {
    transform: scale(1.05);
    }

    100% {
    transform: scale(1);
    }
}

.scalePulse {
    animation: scalePulse 1s infinite ease-in-out;
}

@keyframes pulseGradient {
    0% {
    background-position: 0% 0%;
    }

    50% {
    background-position: 100% 0%;
    }

    100% {
    background-position: 0% 0%;
    }
}

@media (min-width: 1440px) {

    .second-row-containers .caract-container {
    height: 390px;
    }

}

@media (max-width: 1439px) {

    .second-row-containers .caract-container {
    height: 430px;
    }

}

@media (max-width: 1024px) {

    .first-row-containers {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin: 0 auto;
    width: 100%;
    }

    .second-row-containers {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 0 auto;
    }

    .first-row-containers .caract-highlight-container {
    width: 60%;
    max-width: 250px;
    }

    .second-row-containers .caract-container.centered {
    grid-column: 1 / span 2;
    justify-self: center;
    }

    .second-row-containers .caract-container {
    height: 350px;
    }

    .second-row-containers .caract-image {
    height: 50%;
    }

    .second-row-containers .caract-text {
    height: 50%;
    }

}

@media (max-width: 768px) {

    .caracts-pc .benefits {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px 60px;
    }

    .caracts-pc .benefit img {
    width: 60px;
    }

    .second-row-containers .caract-container {
    height: 405px;
    }

    .second-row-containers .caract-container.centered {
    grid-column: 1 / span 2;
    justify-self: center;
    }

    .first-row-containers .caract-image {
    height: 50%;
    }

    .first-row-containers .caract-text {
    height: 50%;
    }

    .second-row-containers .caract-image {
    height: 45%;
    }

    .second-row-containers .caract-text {
    height: 55%;
    }

    .second-row-containers {
    grid-template-columns: repeat(2, 1fr);
    }

    .caracts-pc .main-section {
    flex-direction: column;
    }

    .caracts-pc .table-column,
    .caracts-pc .youtube-column {
    margin: 0 auto;
    }

    .caracts-pc .youtube-column {
    width: 80%;
    }

    .caracts-pc .table-column {
    width: 65%;
    }

    .caracts-pc .fps-table .fps-value {
    padding-left: 2%;
    padding-right: 2%;
    }

}

@media (max-width: 425px) {

    .first-row-containers .caract-container {
    height: 375px;
    }

    .second-row-containers .caract-container.centered {
    grid-column: 1;
    justify-self: center;
    margin: 0 auto;
    }

    .second-row-containers {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .table-column {
    width: 80%;
    }

    .caracts-pc .youtube-column {
    width: 100%;
    min-height: 250px;
    }

    .fps-table {
    font-size: 8px;
    }

    .caract-highlight-container {
    width: 45%;
    font-size: 14px;
    }

    .caract-highlight p {
    width: 100%;
    }

}

</style>
<section class="caracts-pc">

<div class="saiba-mais-container">

    <img loading="lazy" src="https://cdn.dooca.store/174137/files/saibamaissobrecomseta.png"
    alt="Saiba mais sobre esse produto" />

    <div class="main-pc-description">

    </div>

</div>

<section class="benefits">

    <div class="benefit">
    <img loading="lazy" src="https://cdn.dooca.store/174137/files/badge3.png" alt="Pronto para jogar"
        title="PC Pronto para jogar" />

    <h2>PRONTO PARA JOGAR</h2>
    <p>O PC Gamer Setup Ninja já chega <span>montado</span> e 100% testado por nossos técnicos. <span>Pronto para
        jogar!</span></p>
    </div>

    <div class="benefit">
    <img loading="lazy" src="https://cdn.dooca.store/174137/files/badge2.png" alt="Qualidade Setup Ninja"
        title="Qualidade garantida" />

    <h2>QUALIDADE SETUP NINJA</h2>
    <p>Utilizamos sempre as <span>melhores peças</span> das <span>melhores marcas.</span></p>
    </div>

    <div class="benefit">
    <img loading="lazy" src="https://cdn.dooca.store/174137/files/badge4.png" alt="Garantia"
        title="Garantia de 1 ANO" />

    <h2>GARANTIA DE 1 ANO</h2>
    <p>Todos os computadores da Setup Ninja possuem <span>12 meses de garantia para todo o Brasil.</span> </p>
    </div>

    <div class="benefit">
    <img loading="lazy" src="https://cdn.dooca.store/174137/files/badge1.png" alt="Experiência Setup Ninja"
        title="Experiência Setup Ninja" />

    <h2>EXPERIÊNCIA SETUP NINJA</h2>
    <p>Também possuímos suporte técnico <span>vitalício</span> pronto a lhe auxiliar a solucionar quaisquer
        problemas.</p>
    </div>

</section>

<h1 class="caracts-pc-title">CARACTERÍSTICAS DO PC GAMER</h1>

</section>
    `);
            const LOGO_SETUP_NINJA = FILE_IMG_PREFIX + "setupninjalogosombra.png"
            const YTB_EMBED_SUFIX = "?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0&enablejsapi=1"
            const VIEWER_OPEN_ICON = FILE_IMG_PREFIX + "olho-aberto-branco.svg"
            const VIEWER_CLOSED_ICON = FILE_IMG_PREFIX + "olho-fechado-branco.svg"

            const COLORS = {
                verde: "linear-gradient(77deg,rgba(48, 160, 0, 1) 0%, rgba(21, 71, 0, 1) 100%)",
                laranja: "linear-gradient(77deg,rgba(255, 106, 0, 1) 0%, rgba(107, 45, 0, 1) 100%)",
                ciano: "linear-gradient(77deg,rgba(0, 153, 153, 1) 0%, rgba(0, 82, 82, 1) 100%)",
                cinza: "radial-gradient(circle, rgba(66, 66, 66, 1) 0%, rgba(38, 38, 38, 1) 100%)"
            }

            const caractsHighlight = {
                "DLSS": {
                    desc: "Desempenho muito maior com gráficos nítidos, usando inteligência artificial da NVIDIA.",
                    img: "240fpsbranco.svg",
                    regex: /\bRTX\b/i,
                    cor: "verde"
                },
                "FSR": {
                    desc: "Mais FPS sem perder qualidade de imagem, ideal para rodar jogos pesados com melhor desempenho.",
                    img: "240fpsbranco.svg",
                    regex: /\b(RX|GTX|RTX|ARC)\b/i,
                    cor: "laranja"
                },
                "RAY TRACING": {
                    desc: "Iluminação realista nos jogos, com reflexos e sombras que deixam tudo muito mais bonito e imersivo.",
                    img: "cubobranco.svg",
                    regex: /\b(?:RTX|RX\s?[6-9]\d{3,})\b/i,
                    cor: "verde"
                },
                "3D V-CACHE": {
                    desc: "Com a tecnologia de empilhamento de cache, esse processador entrega muito mais FPS nos jogos, especialmente em títulos competitivos e de mundo aberto.",
                    img: "cuboaltbranco.svg",
                    regex: /\bRyzen\s?\d\s?\d{4}X3D\b/i,
                    cor: "ciano"
                },
                "80 PLUS": {
                    desc: "A certificação 80 Plus garante que sua fonte de alimentação oferece alta eficiência e estabilidade, gerando economia na sua conta de energia.",
                    img: "raiobranco.svg",
                    regex: /80\+/,
                    cor: "verde"
                },
                "AM4": {
                    desc: "O soquete AM4 da AMD é a melhor plataforma para quem busca longevidade e custo benefício, pois suporta mais de 100 processadores únicos, abrindo uma margem incomparável para upgrades futuros.",
                    img: "amdbranco2.svg",
                    regex: /A320|A520|B450/i,
                    cor: "laranja"
                }
            }
            const caractsHighlightEntries = Object.entries(caractsHighlight)

            const data = [
                {
                    name: "Shadow I", cpu: "Intel i5 3470", gpu: "HD Graphics 2500", fonte: "500W", mobo: "H61", gabinete: "MidTowerPreto", tier: "B"
                },
                {
                    name: "Shadow II", cpu: "Intel i5 3470", gpu: "GT 730", fonte: "500W", mobo: "H61", gabinete: "MidTowerPreto", tier: "B"
                },
                {
                    name: "Shadow III", cpu: "Intel i5 3470", gpu: "RX 550", fonte: "500W", mobo: "H61", gabinete: "MidTowerPreto", tier: "B", fps: [
                        "sreZy8g4RtQ", !0
                    ]
                },
                {
                    name: "Nordic I", cpu: "Intel i5 3470", gpu: "HD Graphics 2500", fonte: "500W", mobo: "H61", gabinete: "MidTowerBranco", tier: "B"
                },
                {
                    name: "Nordic II", cpu: "Intel i5 3470", gpu: "GT 730", fonte: "500W", mobo: "H61", gabinete: "MidTowerBranco", tier: "B"
                },
                {
                    name: "Storm I", cpu: "Intel i7 2600K", gpu: "HD Graphics 3000", fonte: "500W", mobo: "H61", gabinete: "MidTowerPreto", tier: "B"
                },
                {
                    name: "Storm II", cpu: "Intel i7 2600K", gpu: "GT 730", fonte: "500W", mobo: "H61", gabinete: "MidTowerPreto", tier: "B"
                },
                {
                    name: "Blade I", cpu: "Intel i5 3470", gpu: "HD Graphics 2500", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "B"
                },
                {
                    name: "Blade II", cpu: "Intel i5 3470", gpu: "GT 730", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "B"
                },
                {
                    name: "Blade III", cpu: "Intel i5 3470", gpu: "RX 550", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "A", fps: [
                        "sreZy8g4RtQ", !0
                    ]
                },
                {
                    name: "Blade IV", cpu: "Intel i5 3470", gpu: "GTX 1050 Ti", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "A", fps: [
                        "05hMTZAaXkY", !0
                    ]
                },
                {
                    name: "Blade V", cpu: "Intel i5 3470", gpu: "RX 580", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "S", fps: [
                        "oGpRbW7QCYo", !0
                    ]
                },
                {
                    name: "Revenger I", cpu: "Intel i7 2600K", gpu: "HD Graphics 3000", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "A"
                },
                {
                    name: "Revenger II", cpu: "Intel i7 2600K", gpu: "GT 730", fonte: "500W", mobo: "H61", gabinete: "GB1787", tier: "A"
                },
                {
                    name: "Titan", cpu: "Intel i5 4440", gpu: "HD Graphics 4600", fonte: "500W", mobo: "H81", gabinete: "MidTowerPreto", tier: "B"
                },
                {
                    name: "Kratos IV", cpu: "Ryzen 5 4500", gpu: "RTX 3050", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        "FOVQuHdLbPY", !0
                    ]
                },
                {
                    name: "Kratos II", cpu: "Ryzen 5 4500", gpu: "GTX 1050 Ti", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        ""
                    ]
                },
                {
                    name: "Kratos III", cpu: "Ryzen 5 4500", gpu: "RX 580", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        "anlXC16RMT0", !0
                    ]
                },
                {
                    name: "Kratos I", cpu: "Ryzen 5 4500", gpu: "RX 550", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        "HpN6ybWsNqw", !0
                    ]
                },
                {
                    name: "Kratos V", cpu: "Ryzen 5 4500", gpu: "RX 6600", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "S", fps: [
                        "ceo9E676VN4", !0
                    ]
                },
                {
                    name: "Kratos VI", cpu: "Ryzen 5 4500", gpu: "RTX 3060", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "S", fps: [
                        "2Fy7sriryFc", !0
                    ]
                },
                {
                    name: "Kratos VII", cpu: "Ryzen 5 4500", gpu: "RTX 5050", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "S", fps: [
                        "4Xp3fPINmcs", !1
                    ]
                },
                {
                    name: "Kratos VIII", cpu: "Ryzen 5 4500", gpu: "RTX 5060", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", tier: "S", fps: [
                        "-j5hSZbrMzw", !1
                    ]
                },
                {
                    name: "Kratos IX", cpu: "Ryzen 5 4500", gpu: "RTX 5060 Ti", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", tier: "S", fps: [
                        "wupKyWpaIgA", !1
                    ]
                },
                {
                    name: "Sten III", cpu: "Ryzen 5 4500", gpu: "RX 580", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "A", fps: [
                        "anlXC16RMT0", !0
                    ]
                },
                {
                    name: "Sten IV", cpu: "Ryzen 5 4500", gpu: "RTX 3050", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "A", fps: [
                        "FOVQuHdLbPY", !0
                    ]
                },
                {
                    name: "Sten V", cpu: "Ryzen 5 4500", gpu: "RX 6600", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "S", fps: [
                        "ceo9E676VN4", !0
                    ]
                },
                {
                    name: "Aric V", cpu: "Ryzen 5 5500", gpu: "RX 6600", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "S", fps: [
                        "BiYp-lr38Xc", !0
                    ]
                },
                {
                    name: "Aric VI", cpu: "Ryzen 5 5500", gpu: "RTX 3060", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "S", fps: [
                        "_yMwYxWZXzk", !0
                    ]
                },
                {
                    name: "Aric VII", cpu: "Ryzen 5 5500", gpu: "RTX 5060", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "S", fps: [
                        "-j5hSZbrMzw", !0
                    ]
                },
                {
                    name: "Ivar", cpu: "Ryzen 7 5700G", gpu: "Vega 8", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "A", fps: [
                        "Oi_4EAto-Nk", !0
                    ]
                },
                {
                    name: "Olav", cpu: "Ryzen 5 5600GT", gpu: "Vega 7", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCornerPreto", tier: "A", fps: [
                        "-GYV5mvNpLs", !0
                    ]
                },
                {
                    name: "Magnus", cpu: "Ryzen 7 5700G", gpu: "Vega 8", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "A", fps: [
                        "Oi_4EAto-Nk", !0
                    ]
                },
                {
                    name: "Erik", cpu: "Ryzen 7 5700G", gpu: "Vega 8", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "A", fps: [
                        "Oi_4EAto-Nk", !0
                    ]
                },
                {
                    name: "Ragnar III", cpu: "Ryzen 5 4500", gpu: "RX 580", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "A", fps: [
                        "anlXC16RMT0", !0
                    ]
                },
                {
                    name: "Ragnar IV", cpu: "Ryzen 5 4500", gpu: "RTX 3050", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "A", fps: [
                        "FOVQuHdLbPY", !0
                    ]
                },
                {
                    name: "Ragnar V", cpu: "Ryzen 5 4500", gpu: "RX 6600", fonte: "500W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "S", fps: [
                        "ceo9E676VN4", !0
                    ]
                },
                {
                    name: "Thor V", cpu: "Ryzen 5 5500", gpu: "RX 6600", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "S", fps: [
                        "BiYp-lr38Xc", !0
                    ]
                },
                {
                    name: "Thor VI", cpu: "Ryzen 5 5500", gpu: "RTX 3060", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "S", fps: [
                        "_yMwYxWZXzk", !0
                    ]
                },
                {
                    name: "Thor VII", cpu: "Ryzen 5 5500", gpu: "RTX 5060", fonte: "600W80+", mobo: "A520", gabinete: "AquarioCurvoPreto", tier: "S", fps: [
                        "-j5hSZbrMzw", !0
                    ]
                },
                {
                    name: "Loki I", cpu: "Ryzen 7 5700X", gpu: "RX 580", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", waterCooler: "Water Cooler 120mm", tier: "S", fps: [
                        "iA5ioypfAsQ", !0
                    ]
                },
                {
                    name: "Loki II", cpu: "Ryzen 7 5700X", gpu: "RTX 3050", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", waterCooler: "Water Cooler 120mm", tier: "S", fps: [
                        "ysq-XzxT-vM", !0
                    ]
                },
                {
                    name: "Loki III", cpu: "Ryzen 7 5700X", gpu: "RTX 3060", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", waterCooler: "Water Cooler 120mm", tier: "S", fps: [
                        "XONaCO_77YE", !0
                    ]
                },
                {
                    name: "Loki IV", cpu: "Ryzen 7 5700X", gpu: "RTX 5060", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", waterCooler: "Water Cooler 120mm", tier: "S", fps: [
                        "9_hY7XHbGvU", !0
                    ]
                },
                {
                    name: "Loki V", cpu: "Ryzen 7 5700X", gpu: "RTX 5060 Ti", fonte: "600W80+", mobo: "B450", gabinete: "AquarioPreto", waterCooler: "Water Cooler 120mm", tier: "S", fps: [
                        "vA2xcP2tkPg", !0
                    ]
                },
                {
                    name: "Magneto", cpu: "Ryzen 7 5700G", gpu: "Vega 8", fonte: "500W80+", mobo: "A520", gabinete: "AquarioBranco", tier: "A", fps: [
                        "Oi_4EAto-Nk", !0
                    ]
                },
                {
                    name: "Thanos", cpu: "Ryzen 5 5600GT", gpu: "Vega 7", fonte: "500W80+", mobo: "A520", gabinete: "AquarioBranco", tier: "A", fps: [
                        "-GYV5mvNpLs", !0
                    ]
                },
                {
                    name: "Lexus", cpu: "Ryzen 7 5700G", gpu: "Vega 8", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        "Oi_4EAto-Nk", !0
                    ]
                },
                {
                    name: "Box", cpu: "Ryzen 3 3200G", gpu: "Vega 8", fonte: "500W80+", mobo: "A320", gabinete: "AquarioBranco", tier: "A", fps: [
                        "AvlfFnnp614", !0
                    ]
                },
                {
                    name: "Odim", cpu: "Ryzen 3 3200G", gpu: "Vega 8", fonte: "500W80+", mobo: "A320", gabinete: "AquarioPreto", tier: "A", fps: [
                        "AvlfFnnp614", !0
                    ]
                },
                {
                    name: "Trigger", cpu: "Ryzen 5 5600GT", gpu: "Vega 7", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "A", fps: [
                        "-GYV5mvNpLs", !0
                    ]
                },
                {
                    name: "Freya I", cpu: "Ryzen 5 5500X3D", gpu: "RX 6600", fonte: "500W80+", mobo: "A520", gabinete: "AquarioBranco", tier: "S", fps: [
                        "Mvhw77cbu5s", !0
                    ]
                },
                {
                    name: "Pegasus I", cpu: "Ryzen 5 5500X3D", gpu: "RX 6600", fonte: "500W80+", mobo: "A520", gabinete: "AquarioPreto", tier: "S", fps: [
                        "Mvhw77cbu5s", !0
                    ]
                },
                {
                    name: "Square", cpu: "Ryzen 5 5500X3D", gpu: "RTX 5060", fonte: "650W80+", mobo: "B550", gabinete: "SquareBranco", tier: "S", fps: [
                        "9_hY7XHbGvU", !1
                    ]
                },
                {
                    name: "Fritz", cpu: "Ryzen 5 5600GT", gpu: "Vega 7", fonte: "500W", mobo: "A520", gabinete: "MidTowerPreto", tier: "A", fps: [
                        "-GYV5mvNpLs", !0
                    ]
                },

                // POR SKU
                {
                    name: "17543218718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5070", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "BR_ukNXS-UI", !0
                    ]
                },
                {
                    name: "17643218718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5070", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "BR_ukNXS-UI", !0
                    ]
                },
                {
                    name: "17543214718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060 Ti", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "MK5JpoI1QDA", !0
                    ]
                },
                {
                    name: "17643214718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060 Ti", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "MK5JpoI1QDA", !0
                    ]
                },
                
                
                {
                    name: "17643213718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "CIp5E3cicZs", !0
                    ]
                },
                {
                    name: "17543213718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "CIp5E3cicZs", !0
                    ]
                },
                {
                    name: "17541618718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5070", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "BR_ukNXS-UI", !0
                    ]
                },
                {
                    name: "17641618718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5070", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "BR_ukNXS-UI", !0
                    ]
                },
                
                
                {
                    name: "17641614718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060 Ti", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "MK5JpoI1QDA", !0
                    ]
                },
                {
                    name: "17541614718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060 Ti", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "MK5JpoI1QDA", !0
                    ]
                },
                {
                    name: "17541613718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "CIp5E3cicZs", !0
                    ]
                },
                {
                    name: "17641613718PR", cpu: "Ryzen 7 5700X", gpu: "RTX 5060", fonte: "650W80+", mobo: "B550", gabinete: "GabineteThermaltake", tier: "S", fps: [
                        "CIp5E3cicZs", !0
                    ]
                },


                {
                    name: "SETUP NINJA", cpu: "PROCESSADOR SETUP NINJA", gpu: "PLACA DE VÍDEO SETUP NINJA", fonte: "500W", mobo: "PLACA MÃE SETUP NINJA", gabinete: "GABINETE SETUP NINJA", tier: "A"
                }
            ]


            const pcNameFromTitle = document.title.replace(/setup ninja/gi, "").trim()
            const normalizedTitle = pcNameFromTitle.toLowerCase()
            const normalizedSku = sku?.toLowerCase()

            // Primeiro procura todos os nomes no título. Os nomes maiores têm
            // prioridade para evitar que "Shadow I" seja escolhido para "Shadow II".
            let selectedPc
            let selectedPcNameLength = -1
            for (const pc of data) {
                if (
                    pc.name &&
                    pc.name.length > selectedPcNameLength &&
                    normalizedTitle.includes(pc.name.toLowerCase())
                ) {
                    selectedPc = pc
                    selectedPcNameLength = pc.name.length
                }
            }

            // Se nenhum nome estiver no título, procura um item cuja chave `sku`
            // corresponda ao SKU exibido na página. Esse item não precisa ter `name`.
            if (!selectedPc && normalizedSku) {
                selectedPc = data.find(pc =>
                    pc.sku != null &&
                    String(pc.sku).trim().toLowerCase() === normalizedSku
                )

                // O restante do script usa `name` para textos de exibição.
                // Preserva o objeto de `data` e usa o título apenas em tempo de execução.
                if (selectedPc && !selectedPc.name) {
                    selectedPc = { ...selectedPc, name: pcNameFromTitle }
                }
            }

            if (!selectedPc) {
                selectedPc = data.find(item => item.name === "SETUP NINJA")
                // /\ tentativa de fallback acima. Se quebrar, apague /\ e descomente \/:
                //return;
            }

            console.log("SELECTEDPC: ")
            console.log(selectedPc)

            const hora = new Date().getHours()
            let periodo
            if (hora >= 5 && hora <= 11) {
                periodo = "Bom dia!"
            }
            else if (hora >= 12 && hora <= 17) {
                periodo = "Boa noite!"
            }
            else {
                periodo = "Boa noite!"
            }
            const linkWhatsaapp = `https://api.whatsapp.com/send?l=pt_br&phone=5521980115833&text=${periodo} Gostaria de saber mais informações sobre o Pc gamer ${selectedPc.name}`







            const ramRegex = /\b(\d+)\s*GB\s*RAM\b/i;
            const ddrRegex = /\b(\d+)\s*GB\s*DDR/i;

            const match = pcNameFromTitle.match(ramRegex) || pcNameFromTitle.match(ddrRegex);

            const ramGb = match ? match[1] : 16

            selectedPc.ram = ramGb + "GB"

            const descs = {
                "Intel i5 3-4gen": `O Intel Core ${selectedPc?.cpu?.split("Intel ")[1]} é um processador de ótimo desempenho, com capacidade para rodar muitos jogos. Com 4 núcleos e 4 threads, oferece uma boa relação custo-benefício.`,

                "Intel i7 2600": `O Intel Core ${selectedPc?.cpu?.split("Intel ")[1]} é um processador de alto desempenho, com capacidade para rodar muitos jogos. Com 4 núcleos e 8 threads, oferece uma ótima relação custo-benefício.`,

                "3D V-CACHE_SUFIX": `Possui a tecnologia 3D V-Cache™ da AMD, que aumenta drasticamente o FPS nos jogos.`,

                "Ryzen 3": `O ${selectedPc?.cpu} é um processador de alto desempenho, com capacidade para rodar jogos modernos e multi tarefas. Com 4 núcleos e 4 threads, oferece uma ótima relação custo-benefício.`,

                "Ryzen 5": `O ${selectedPc?.cpu} é um processador de alto desempenho, ideal para tarefas complexas e jogos modernos. Com 6 núcleos e 12 threads, oferece uma ótima relação custo-benefício.`,

                "Ryzen 7": `O ${selectedPc?.cpu} é um processador de altíssimo desempenho, ideal para multi tarefas pesadas e jogos modernos. Com 8 núcleos e 16 threads, oferece uma ótima relação custo-benefício.`,

                "RTX 5060 Ti": "A RTX 5060 Ti é uma placa de vídeo de altíssima performance, perfeita para jogos em resolução 2K e 4K. Com 8GB de memória GDDR7 e tecnologias como Ray Tracing e DLSS, proporciona gráficos detalhados e desempenho fluido.",

                "RTX 5060": "A RTX 5060 é uma placa de vídeo de alta performance, perfeita para jogos modernos em Full HD Ultra e 2K. Com 8GB de memória GDDR7 e tecnologias como Ray Tracing e DLSS, proporciona gráficos detalhados e desempenho fluido.",

                "RTX 5070": "A RTX 5070 é uma placa de vídeo de altíssima performance, perfeita para jogos em 2K e 4K. Com 12GB de memória GDDR7 e tecnologias como Ray Tracing e DLSS, proporciona gráficos detalhados e desempenho fluido.",

                "RTX 3060": "A RTX 3060 é uma placa de vídeo de alta performance, perfeita para jogos em Full HD e 2K. Com 12GB de memória GDDR6 e tecnologias como Ray Tracing e DLSS, proporciona gráficos detalhados e desempenho fluido.",

                "RTX 3050": "A RTX 3050 é uma placa de vídeo de alta performance, perfeita para jogos em Full HD. Com 6GB de memória GDDR6 e tecnologias como Ray Tracing e DLSS, proporciona gráficos detalhados e desempenho fluido.",

                "GTX 1050 Ti": "A GTX 1050 Ti é uma placa de vídeo de alta performance, perfeita para jogos em HD. Com 4GB de memória GDDR5, proporciona gráficos detalhados e desempenho fluido.",

                "RX 6600": "A RX 6600 é uma placa de vídeo de alta performance, perfeita para jogos em Full HD. Com 8GB de memória GDDR6, proporciona gráficos detalhados e desempenho fluido.",

                "RX 580": "A RX 580 é uma placa de vídeo de alta performance, perfeita para jogos em Full HD. Com 8GB de memória GDDR6, proporciona gráficos detalhados e desempenho fluido.",

                "RX 550": "A RX 550 é uma placa de vídeo de alta performance, perfeita para jogos em HD. Com 4GB de memória GDDR5, proporciona gráficos detalhados e desempenho fluido.",

                "GT 730": "A GT 730 é uma placa de vídeo de boa performance, ideal para jogos em HD. Com 4GB de memória GDDR3, proporciona gráficos detalhados e desempenho fluido.",

                "GT 610": "A GT 610 é uma placa de vídeo de boa performance, ideal para jogos em HD. Com 2GB de memória GDDR3, proporciona gráficos detalhados e desempenho fluido.",

                "Vega 7": "A Radeon Vega 7 é um gráfico integrado de alta perfomance, ideal para jogos em HD. Com 7 núcleos gráficos, proporciona gráficos detalhados e desempenho fluido.",

                "Vega 8": "A Radeon Vega 8 é um gráfico integrado de alta perfomance, ideal para jogos em HD. Com 8 núcleos gráficos, proporciona gráficos detalhados e desempenho fluido.",

                "HD Graphics": "O Intel HD Graphics é um gráfico integrado de boa performance, ideal para jogos em HD.",

                "Curvo": "O gabinete oferece um design moderno com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado com detalhe curvo e suportando até 7 fans.",

                "Corner": "O gabinete oferece um design moderno com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado com detalhe angulado e suportando até 9 fans.",

                "Aquario": "O gabinete oferece um design moderno com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado e suportando até 7 fans.",

                "Square": "O gabinete oferece um design moderno com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado e suportando até 10 fans.",

                "GB1787": "O gabinete oferece um design moderno, compacto e com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado e suportando até 5 fans.",

                "MidTower": "O gabinete é ideal para quem busca espaço e refrigeração, lateral em vidro temperado e suportando até 4 fans.",

                "GabineteThermaltake": "O Gabinete Gamer Thermaltake View 380 é uma escolha robusta para quem busca estilo e resistência. Com estrutura em aço de alta resistência e lateral em vidro temperado, oferece visual moderno e proteção reforçada para seus componentes.",

                "GABINETE SETUP NINJA": "O gabinete oferece um design moderno, compacto e com excelente fluxo de ar, ideal para manter os componentes do seu PC refrigerados, lateral de vidro temperado e suportando fans adicionais.",

                "A520": "A placa-mãe A520 é uma excelente opção para montar um PC com processadores AMD AM4 Ryzen. Suporta memória DDR4, armazenamento M.2 e PCI Express 3.0.",

                "A320": "A placa-mãe A320 é uma excelente opção para montar um PC com processadores AMD AM4 Ryzen. Suporta memória DDR4, armazenamento M.2 e PCI Express 3.0.",

                "B450": "A placa-mãe B450 é uma excelente opção para montar um PC com processadores AMD AM4 Ryzen de última geração. Suporta memória DDR4, armazenamento M.2 e PCI Express 3.0.",

                "B550": "A placa-mãe B550 é uma excelente opção para montar um PC com processadores AMD AM4 Ryzen de última geração. Suporta memória DDR4, armazenamento M.2 e PCI Express 4.0.",

                "H61": "A placa-mãe H61 é uma excelente opção para montar um PC com processadores Intel de até 3ª geração. Suporta memória DDR3 e PCI Express 3.0.",

                "H81": "A placa-mãe H81 é uma excelente opção para montar um PC com processadores Intel de até 4ª geração. Suporta memória DDR3 e PCI Express 3.0.",

                "500W80+": "A fonte 500W possui certificado 80 Plus, garantindo energia estável para todos os componentes do seu PC, assegurando menor desperdício de energia e margem para upgrades futuros.",

                "650W80+": "A fonte 650W possui certificado 80 Plus, garantindo energia estável para todos os componentes do seu PC, assegurando menor desperdício de energia e margem para upgrades futuros.",

                "600W80+": "A fonte 600W possui certificado 80 Plus, garantindo energia estável para todos os componentes do seu PC, assegurando menor desperdício de energia e margem para upgrades futuros.",

                "Water Cooler": `O Water Cooler de ${selectedPc?.waterCooler?.split(" ")[2] || ""} oferece uma refrigeração eficiente para o processador, mantendo temperaturas baixas mesmo em uso intenso, além de proporcionar um visual moderno ao seu PC.`,

                "500W": "A fonte 500W garante energia estável para todos os componentes do seu PC, assegurando menor desperdício de energia e segurança para o sistema.",

                "16GB": "Com 16GB de memória RAM, seu PC terá capacidade suficiente para multitarefas, jogos modernos e aplicações pesadas, garantindo fluidez e desempenho.",

                "8GB": "Com 8GB de memória RAM, seu PC terá capacidade suficiente para trabalho e jogos, garantindo fluidez e desempenho.",

                "PROCESSADOR SETUP NINJA": "O processador garante rapidez e bom desempenho para usar programas, jogar e navegar sem travar.",

                "PLACA DE VÍDEO SETUP NINJA": "A placa de vídeo cuida dos gráficos, deixando jogos e vídeos mais bonitos e rodando de forma suave.",

                "PLACA MÃE SETUP NINJA": "A placa-mãe é o componente central que conecta todos os dispositivos do computador. Conta com slots de expansão, portas de entrada e saída, e suporte para os principais periféricos necessários ao funcionamento do sistema."
            };

            const images = {
                "Ryzen 3": "ryzen-3.png",

                "Ryzen 5": "ryzen-5-box.png",

                "Ryzen 7": "ryzen-7-box.png",

                "i5": "i5-box.png",

                "i7": "i7-box.png",

                "HD Graphics": "intel-hd-graphics.png",

                "Vega": "radeon-vega-graphics-1.png",

                "RX 550": "rx-550.png",

                "RX 580": "rx-580.png",

                "RX 6600": "rx6600.png",

                "GTX 1050 Ti": "gtx-1050-ti.png",

                "GT 610": "gt-730-610-generica.png",

                "GT 730": "gt-730-610-generica.png",

                "RTX 3050": "rtx-3050.png",

                "RTX 3060": "rtx-3060-generica.png",

                "RTX 5050": "rtx5050.png",

                "RTX 5060": "rtx-5060.png",

                "RTX 5060 Ti": "rtx-5060-ti-8gb-generica.png",

                "RTX 5070": "rtx-5070-generica-wrcsr.png",

                "8GB": "umaram.png",

                "16GB": "duasram.png",

                "AquarioBranco": "gb1797-transparente.png",

                "AquarioPreto": "gb1796-transparente.png",

                "SquareBranco": "squarebranco.png",

                "AquarioCurvoPreto": "gb1798.png",

                "AquarioCornerPreto": "cv700.png",

                "GB1787": "gb1787.png",

                "MidTowerPreto": "gb1749-transparente.png",

                "MidTowerBranco": "gb1793-transparente.png",

                "GabineteThermaltake": "gabinete-thermaltake-umgfg.png",

                "GABINETE SETUP NINJA": "gb1796-transparente.png",

                "A320": "a320.png",

                "A520": "a520-generica.png",

                "B450": "b450.png",

                "B550": "b550.png",

                "500W80+": "fonte-pfc-generica.png",

                "600W80+": "fonte600w.png",

                "650W80+": "fonte600w.png",

                "500W": "fonte-pfc-generica.png",

                "H61": "h61-h81-generica.png",

                "H81": "h61-h81-generica.png",

                "Water Cooler 120mm": "watercooler120mm.png",

                "PROCESSADOR SETUP NINJA": "cpu-default.png",

                "PLACA MÃE SETUP NINJA": "b450.png",

                "PLACA DE VÍDEO SETUP NINJA": "rx-580.png"
            }

            const labels = {
                "Aquario": "Gabinete " + selectedPc.name.split(" ")[0],
                "Square": "Gabinete " + selectedPc.name.split(" ")[0],
                "MidTower": "Gabinete " + selectedPc.name.split(" ")[0],
                "GB1787": "Gabinete " + selectedPc.name.split(" ")[0],
                "Ryzen": "Processador AMD " + selectedPc.cpu,
                "Intel": "Processador Intel Core " + selectedPc.cpu.split("Intel")[1],
                "HD Graphics": selectedPc.gpu,
                "Vega": selectedPc.gpu,
                "RTX": "Placa de Vídeo GeForce " + selectedPc.gpu,
                "GT": "Placa de Vídeo GeForce " + selectedPc.gpu,
                "RX": "Placa de Vídeo Radeon " + selectedPc.gpu,
                "GB": "Memória RAM " + selectedPc.ram,
                "A520": "Placa Mãe A520",
                "A320": "Placa Mãe A320",
                "B450": "Placa Mãe B450",
                "B550": "Placa Mãe B550",
                "H61": "Placa Mãe H61",
                "H81": "Placa Mãe H81",
                "500W80+": "Fonte 500W 80 Plus",
                "600W80+": "Fonte 600W 80 Plus",
                "650W80+": "Fonte 650W 80 Plus",
                "500W": "Fonte 500W",
                "Water Cooler": selectedPc.waterCooler,
                "GABINETE SETUP NINJA": "Gabinete Setup Ninja",
                "PROCESSADOR SETUP NINJA": "Processador",
                "PLACA DE VÍDEO SETUP NINJA": "Placa de Vídeo",
                "PLACA MÃE SETUP NINJA": "Placa Mãe"
            }

            const descKeys = ["Curvo", "Corner", "Aquario", "Square", "HD Graphics", "MidTower", "Water Cooler", "Ryzen 3", "Ryzen 5", "Ryzen 7"]
            const labelKeys = [
                "Aquario", "MidTower", "Square", "Ryzen", "Intel", "HD Graphics", "Vega",
                "RTX", "GT", "RX", "GB1787", "GB", "Water Cooler",
                "PROCESSADOR SETUP NINJA", "PLACA DE VÍDEO SETUP NINJA",
                "PLACA MÃE SETUP NINJA", "GABINETE SETUP NINJA"
            ]
            const imageKeys = ["Ryzen 3", "Ryzen 5", "Ryzen 7", "i5", "i7", "HD Graphics", "Vega"]

            function getDesc(target) {
                const sufixKey = caractsHighlightEntries.find(([, value]) =>
                    value.regex.test(target)
                )?.[0]
                for (const key of descKeys) {
                    if (target.includes(key)) return `${descs[key]} ${descs[`${sufixKey}_SUFIX`] ?? ""}`
                }
                if (target.includes("Intel i5 3") || target.includes("Intel i5 4")) {
                    return `${descs["Intel i5 3-4gen"]} ${descs[`${sufixKey}_SUFIX`] ?? ""}`
                }
                if (target.includes("Intel i7 2600")) {
                    return `${descs["Intel i7 2600"]} ${descs[`${sufixKey}_SUFIX`] ?? ""}`
                }


                return descs[target] || "Descrição não disponível no momento.";
            }

            function getLabel(target) {
                for (const key of labelKeys) {
                    if (target.includes(key)) return labels[key]
                }
                return labels[target] || "Título não disponível no momento."
            }

            function getImage(target) {
                for (const key of imageKeys) {
                    if (target.includes(key)) return FILE_IMG_PREFIX + images[key];
                }
                return FILE_IMG_PREFIX + (images[target] || LOGO_SETUP_NINJA)

            }

            const mainDesc = {
                "B": `
<p>
Conheça o PC Gamer ${selectedPc.name}, desenvolvido para quem deseja entrar no universo dos games sem abrir mão da qualidade. Equipado com um ${getLabel(selectedPc.cpu)} e ${selectedPc.ram} de memória RAM, ele garante a execução fluida de jogos leves e intermediários, além de oferecer um bom desempenho para multitarefas.
</p>

<p>
O SSD integrado assegura carregamentos ágeis e um sistema sempre pronto para o uso. Seu design moderno agrega estilo ao ambiente gamer, enquanto a refrigeração eficiente mantém o funcionamento em nível ideal durante longas sessões.
</p>

<p>
A ${getLabel(selectedPc.gpu)} presente neste modelo entrega gráficos consistentes para games casuais e competitivos, tornando o PC Gamer ${selectedPc.name} a escolha ideal para quem busca custo-benefício e confiabilidade. Descubra abaixo todos os detalhes deste computador da Setup Ninja.
</p>
`,

                "A": `
<p>
Apresentamos o PC Gamer ${selectedPc.name}, pensado para jogadores que buscam equilíbrio entre desempenho e valor. Com um ${getLabel(selectedPc.cpu)} aliado a ${selectedPc.ram} de memória RAM, este setup garante performance estável em jogos modernos e aplicações multitarefa sem dificuldades.
</p>

<p>
O SSD integrado assegura carregamentos ágeis e um sistema sempre pronto para o uso. Seu design moderno agrega estilo ao ambiente gamer, enquanto a refrigeração eficiente mantém o funcionamento em nível ideal durante longas sessões.
</p>

<p>
A ${getLabel(selectedPc.gpu)} fornece qualidade gráfica sólida, com excelente fluidez em resoluções Full HD. O PC Gamer ${selectedPc.name} é perfeito para quem quer dar o próximo passo no mundo gamer, unindo potência e preço competitivo. Veja abaixo todas as especificações deste modelo Setup Ninja.
</p>
`,


                "S": `
    <p>
Apresentamos o PC Gamer ${selectedPc.name}, equipado com um ${getLabel(selectedPc.cpu)} e ${selectedPc.ram} de memória RAM. Esta máquina gamer garante performance de alto nível para títulos pesados e aplicações demandantes. Além disso, sua ampla capacidade de memória RAM assegura multitarefa estável e ágil.
</p>

<p>
Com SSD atuando como unidade principal de armazenamento, proporciona inicializações super rápidas, permitindo entrar nas partidas sem esperas. Seu visual sólido e moderno adiciona estilo ao setup, enquanto o eficiente sistema de refrigeração mantém a temperatura controlada mesmo em longas maratonas de jogo.
</p>

<p>
Contando com uma ${getLabel(selectedPc.gpu)}, o PC Gamer ${selectedPc.name} entrega gráficos impressionantes e alta fluidez, oferecendo uma experiência de gameplay totalmente envolvente e imersiva. Confira abaixo mais informações sobre este poderoso computador gamer da Setup Ninja:
</p>
    `
            }



            const caractsPcTitle = document.querySelector('.caracts-pc-title')
            caractsPcTitle.innerHTML = `CARACTERÍSTICAS DO PC GAMER ${selectedPc.name}`

            const mainPcDescription = document.querySelector('.main-pc-description')
            mainPcDescription.innerHTML = mainDesc[selectedPc.tier]

            const caractsPc = document.querySelector('.caracts-pc');


            const firstRowContainers = document.createElement('div');
            firstRowContainers.classList.add('first-row-containers');

            const secondRowContainers = document.createElement('div');
            secondRowContainers.classList.add('second-row-containers');

            function toggleAllHighlights() {
                const allHighlightContainers = document.querySelectorAll('.caract-highlight')
                const allViewers = document.querySelectorAll('.caract-highlight-viewer')
                let highlightsAreVisible = true

                allHighlightContainers.forEach(container => {
                    if (container.style.opacity) {
                        container.style.removeProperty('opacity')
                        highlightsAreVisible = true
                    } else {
                        container.style.opacity = 0.1
                        highlightsAreVisible = false
                    }
                })

                allViewers.forEach(viewer => {
                    viewer.src = highlightsAreVisible ? VIEWER_OPEN_ICON : VIEWER_CLOSED_ICON
                    if (highlightsAreVisible) {
                        viewer.style.removeProperty('opacity')
                    } else {
                        viewer.style.opacity = 0.5
                    }
                })
            }

            [selectedPc.gpu, selectedPc.cpu].forEach((componente, idx) => {
                const componentLabel = getLabel(componente)
                const caractContainer = document.createElement('div');
                caractContainer.classList.add('caract-container');

                const caractImage = document.createElement('div');
                caractImage.classList.add('caract-image');
                caractImage.innerHTML = `<img class="caract-image-img" loading="lazy" src="${getImage(componente)}" alt="${componentLabel}" title="${componentLabel}"/>`;

                const foundHighlight = caractsHighlightEntries.find(([, value]) => value.regex.test(componente))

                if (foundHighlight) {
                    const caractHighlightContainer = document.createElement('div')
                    caractHighlightContainer.classList.add('caract-highlight-container')

                    const highlightContainer = document.createElement('div')
                    highlightContainer.style.background = COLORS[foundHighlight[1].cor]
                    highlightContainer.classList.add('caract-highlight')
                    highlightContainer.innerHTML = `
        <div class="caract-highlight-header"> 
        <img loading="lazy" src="${FILE_IMG_PREFIX + foundHighlight[1].img}" alt="${foundHighlight[0]}" />
            <p class="caract-highlight-title">${foundHighlight[0]}</p>             
            </div>
            <div class="caract-highlight-desc hidden">
            <p>${foundHighlight[1].desc}</p>
            </div>
            `
                    highlightContainer.addEventListener('mouseenter', () => {
                        highlightContainer.classList.add('is-hover')
                    })

                    highlightContainer.addEventListener('mouseleave', () => {
                        highlightContainer.classList.remove('is-hover')
                    })
                    caractHighlightContainer.appendChild(highlightContainer)

                    const caractHighlightViewer = document.createElement('img')
                    caractHighlightViewer.classList.add('caract-highlight-viewer')
                    caractHighlightViewer.src = VIEWER_OPEN_ICON
                    caractHighlightViewer.addEventListener('click', toggleAllHighlights)
                    caractImage.appendChild(caractHighlightViewer)

                    caractImage.appendChild(caractHighlightContainer)
                }


                const caractText = document.createElement('div');
                caractText.classList.add('caract-text');


                if (idx === 0) {
                    caractText.style.background = COLORS.verde

                    if (selectedPc.gpu.includes("RX") || selectedPc.gpu.includes("Vega")) {
                        caractText.style.background = COLORS.laranja
                    }

                    if (selectedPc.gpu.includes("HD Graphics")) {
                        caractText.style.background = COLORS.ciano
                    }

                }

                if (idx === 1) {
                    caractText.style.background = COLORS.laranja
                    if (selectedPc.cpu.includes("Intel")) {
                        caractText.style.background = COLORS.ciano
                    }

                }

                const h2Title = document.createElement('h2');
                h2Title.textContent = componentLabel;

                const pDesc = document.createElement('p');
                pDesc.textContent = getDesc(componente);


                caractText.appendChild(h2Title);
                caractText.appendChild(pDesc);


                caractContainer.appendChild(caractImage);
                caractContainer.appendChild(caractText);

                firstRowContainers.appendChild(caractContainer);

            });

            const secondRowFragment = document.createDocumentFragment();

            const componentes = [
                selectedPc.ram,
                selectedPc.gabinete,
                selectedPc.mobo,
                selectedPc.fonte
            ]

            if (selectedPc.waterCooler) {
                componentes.push(selectedPc.waterCooler)
            }

            componentes.forEach((componente) => {
                const componentLabel = getLabel(componente)
                const caractContainer = document.createElement('div');
                caractContainer.classList.add('caract-container');

                const caractImage = document.createElement('div');
                caractImage.classList.add('caract-image');
                caractImage.innerHTML = `<img class="caract-image-img" loading="lazy" src=${getImage(componente)} alt="${componentLabel}" title="${componentLabel}" />`;

                const foundHighlight = caractsHighlightEntries.find(([, value]) => value.regex.test(componente))

                if (foundHighlight) {
                    const caractHighlightContainer = document.createElement('div')
                    caractHighlightContainer.classList.add('caract-highlight-container')

                    const highlightContainer = document.createElement('div')
                    highlightContainer.style.background = COLORS[foundHighlight[1].cor]
                    highlightContainer.classList.add('caract-highlight')
                    highlightContainer.innerHTML = `
        <div class="caract-highlight-header"> 
        <img loading="lazy" src="${FILE_IMG_PREFIX + foundHighlight[1].img}" alt="${foundHighlight[0]}" />
            <p class="caract-highlight-title">${foundHighlight[0]}</p>             
            </div>
            <div class="caract-highlight-desc hidden">
            <p>${foundHighlight[1].desc}</p>
            </div>
            `
                    highlightContainer.addEventListener('mouseenter', () => {
                        highlightContainer.classList.add('is-hover')
                    })

                    highlightContainer.addEventListener('mouseleave', () => {
                        highlightContainer.classList.remove('is-hover')
                    })
                    caractHighlightContainer.appendChild(highlightContainer)

                    const caractHighlightViewer = document.createElement('img')
                    caractHighlightViewer.classList.add('caract-highlight-viewer')
                    caractHighlightViewer.style.background = COLORS.cinza
                    caractHighlightViewer.src = VIEWER_OPEN_ICON
                    caractHighlightViewer.addEventListener('click', toggleAllHighlights)
                    caractImage.appendChild(caractHighlightViewer)

                    caractImage.appendChild(caractHighlightContainer)
                }

                const caractText = document.createElement('div');
                caractText.classList.add('caract-text');

                const h2Title = document.createElement('h2');
                h2Title.textContent = componentLabel;

                const pDesc = document.createElement('p');
                pDesc.textContent = getDesc(componente);


                caractText.appendChild(h2Title);
                caractText.appendChild(pDesc);


                caractContainer.appendChild(caractImage);
                caractContainer.appendChild(caractText);

                secondRowFragment.appendChild(caractContainer);
            });
            secondRowContainers.appendChild(secondRowFragment);

            caractsPc.appendChild(firstRowContainers);
            caractsPc.appendChild(secondRowContainers);

            const secondRowItems = secondRowContainers.querySelectorAll('.caract-container');
            if (secondRowItems.length === 5) {
                secondRowItems[4].classList.add("centered")
            }

            const allHighlightContainers = document.querySelectorAll('.caract-highlight-container')

            setTimeout(() => {
                const selectedHighlightContainer =
                    allHighlightContainers[Math.floor(Math.random() * allHighlightContainers.length)]
                selectedHighlightContainer.classList.add('scalePulse')
                setTimeout(() => selectedHighlightContainer.classList.remove('scalePulse'), 5_000)
            }, 10_000)

            if (selectedPc.fps) {
                const fpsContainer = document.createElement('section')
                fpsContainer.classList.add('fpsContainer')

                const gamesFps = {
                    "Shadow III": {
                        "gta5": 60,
                        "warzone": 60,
                        "euro truck 2": 60,
                        "red dead 2": 30,
                        "free fire": 80,
                        "minecraft": 100,
                        "fortnite": 70,
                        "valorant": 150,
                        "cs2": 80
                    },
                    "Blade III": {
                        "gta5": 60,
                        "warzone": 60,
                        "euro truck 2": 60,
                        "red dead 2": 30,
                        "free fire": 80,
                        "minecraft": 100,
                        "fortnite": 70,
                        "valorant": 150,
                        "cs2": 80
                    },
                    "Blade IV": {
                        "gta5": 70,
                        "warzone": 50,
                        "euro truck 2": 60,
                        "red dead 2": 30,
                        "free fire": 80,
                        "minecraft": 100,
                        "fortnite": 90,
                        "valorant": 120,
                        "cs2": 90
                    },
                    "Blade V": {
                        "gta5": 70,
                        "warzone": 50,
                        "euro truck 2": 100,
                        "red dead 2": 60,
                        "free fire": 80,
                        "minecraft": 100,
                        "fortnite": 90,
                        "valorant": 150,
                        "cs2": 90
                    },
                    "Kratos IV": {
                        "gta5": 100,
                        "warzone": 80,
                        "spiderman 2": 60,
                        "red dead 2": 70,
                        "cyberpunk 2077": 80,
                        "bf2042": 80,
                        "fortnite": 200,
                        "valorant": 320,
                        "cs2": 240
                    },
                    "Kratos II": {
                        "gta5": 70,
                        "warzone": 60,
                        "euro truck 2": 60,
                        "red dead 2": 30,
                        "free fire": 80,
                        "minecraft": 100,
                        "fortnite": 100,
                        "valorant": 150,
                        "cs2": 100
                    },
                    "Kratos III": {
                        "gta5": 90,
                        "warzone": 70,
                        "euro truck 2": 70,
                        "red dead 2": 60,
                        "free fire": 120,
                        "minecraft": 300,
                        "fortnite": 150,
                        "valorant": 200,
                        "cs2": 100
                    },
                    "Kratos I": {
                        "gta5": 90,
                        "warzone": 70,
                        "euro truck 2": 70,
                        "red dead 2": 60,
                        "free fire": 120,
                        "minecraft": 300,
                        "fortnite": 150,
                        "valorant": 200,
                        "cs2": 100
                    },
                    "Kratos V": {
                        "gta5": 90,
                        "warzone": 90,
                        "euro truck 2": 120,
                        "red dead 2": 90,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Kratos VI": {
                        "gta5": 100,
                        "warzone": 100,
                        "euro truck 2": 120,
                        "red dead 2": 100,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 250,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Kratos VII": {

                    },
                    "Kratos VIII": {
                        "gta5": 120,
                        "warzone": 100,
                        "spiderman 2": 60,
                        "red dead 2": 100,
                        "cyberpunk 2077": 200,
                        "bf2042": 1000,
                        "fortnite": 250,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Kratos IX": {
                        "gta5": 120,
                        "warzone": 100,
                        "spiderman 2": 60,
                        "red dead 2": 80,
                        "cyberpunk 2077": 90,
                        "bf2042": 90,
                        "fortnite": 150,
                        "valorant": 350,
                        "cs2": 250
                    },
                    "Sten III": {
                        "gta5": 90,
                        "warzone": 70,
                        "euro truck 2": 70,
                        "red dead 2": 60,
                        "free fire": 120,
                        "minecraft": 300,
                        "fortnite": 150,
                        "valorant": 200,
                        "cs2": 100
                    },
                    "Sten IV": {
                        "gta5": 100,
                        "warzone": 80,
                        "spiderman 2": 60,
                        "red dead 2": 70,
                        "cyberpunk 2077": 80,
                        "bf2042": 80,
                        "fortnite": 200,
                        "valorant": 320,
                        "cs2": 240
                    },
                    "Sten V": {
                        "gta5": 90,
                        "warzone": 90,
                        "euro truck 2": 120,
                        "red dead 2": 90,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Aric V": {
                        "gta5": 90,
                        "warzone": 90,
                        "euro truck 2": 120,
                        "red dead 2": 90,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Aric VI": {
                        "bf6": 80,
                        "warzone": 150,
                        "spiderman 2": 100,
                        "red dead 2": 90,
                        "gta5": 100,
                        "cyberpunk 2077": 100,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Aric VII": {
                        "bf6": 100,
                        "warzone": 150,
                        "spiderman 2": 100,
                        "red dead 2": 90,
                        "gta5": 100,
                        "cyberpunk 2077": 100,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Ivar": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 100,
                        "lol": 120,
                        "free fire": 90,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Olav": {
                        "gta5": 60,
                        "overwatch 2": 60,
                        "euro truck 2": 100,
                        "roblox": 60,
                        "free fire": 60,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Magnus": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 100,
                        "lol": 120,
                        "free fire": 90,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Erik": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 100,
                        "lol": 120,
                        "free fire": 90,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Ragnar III": {
                        "gta5": 90,
                        "warzone": 70,
                        "euro truck 2": 70,
                        "red dead 2": 60,
                        "free fire": 120,
                        "minecraft": 300,
                        "fortnite": 150,
                        "valorant": 200,
                        "cs2": 100
                    },
                    "Ragnar IV": {
                        "gta5": 100,
                        "warzone": 80,
                        "spiderman 2": 60,
                        "red dead 2": 70,
                        "cyberpunk 2077": 80,
                        "bf2042": 80,
                        "fortnite": 200,
                        "valorant": 320,
                        "cs2": 240
                    },
                    "Ragnar V": {
                        "gta5": 90,
                        "warzone": 90,
                        "euro truck 2": 120,
                        "red dead 2": 90,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Thor V": {
                        "gta5": 90,
                        "warzone": 90,
                        "euro truck 2": 120,
                        "red dead 2": 90,
                        "free fire": 200,
                        "minecraft": 1000,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Thor VI": {
                        "bf6": 80,
                        "warzone": 150,
                        "spiderman 2": 100,
                        "red dead 2": 90,
                        "gta5": 100,
                        "cyberpunk 2077": 100,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Thor VII": {
                        "bf6": 100,
                        "warzone": 150,
                        "spiderman 2": 100,
                        "red dead 2": 90,
                        "gta5": 100,
                        "cyberpunk 2077": 100,
                        "fortnite": 220,
                        "valorant": 300,
                        "cs2": 200
                    },
                    "Loki I": {
                        "gta5": 80,
                        "warzone": 70,
                        "hogwarts legacy": 60,
                        "red dead 2": 70,
                        "cyberpunk 2077": 60,
                        "bf2042": 70,
                        "fortnite": 120,
                        "valorant": 300,
                        "cs2": 150
                    },
                    "Loki II": {
                        "gta5": 80,
                        "warzone": 120,
                        "hogwarts legacy": 60,
                        "red dead 2": 70,
                        "cyberpunk 2077": 70,
                        "bf2042": 80,
                        "fortnite": 120,
                        "valorant": 300,
                        "cs2": 240
                    },
                    "Loki III": {
                        "gta5": 100,
                        "warzone": 120,
                        "hogwarts legacy": 60,
                        "red dead 2": 60,
                        "cyberpunk 2077": 80,
                        "bf2042": 100,
                        "fortnite": 120,
                        "valorant": 300,
                        "cs2": 240
                    },
                    "Loki IV": {
                        "gta5": 90,
                        "warzone": 120,
                        "hogwarts legacy": 80,
                        "red dead 2": 60,
                        "cyberpunk 2077": 70,
                        "bf2042": 100,
                        "fortnite": 80,
                        "valorant": 300,
                        "cs2": 350
                    },
                    "Loki V": {
                        "gta5": 120,
                        "warzone": 180,
                        "hogwarts legacy": 90,
                        "red dead 2": 70,
                        "cyberpunk 2077": 80,
                        "bf2042": 80,
                        "fortnite": 100,
                        "valorant": 400,
                        "cs2": 200
                    },
                    "Magneto": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 100,
                        "lol": 120,
                        "free fire": 90,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Thanos": {
                        "gta5": 60,
                        "overwatch 2": 60,
                        "euro truck 2": 100,
                        "roblox": 60,
                        "free fire": 60,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Lexus": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 100,
                        "lol": 120,
                        "free fire": 90,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Box": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 60,
                        "lol": 90,
                        "free fire": 60,
                        "minecraft": 180,
                        "fortnite": 60,
                        "valorant": 60,
                        "overwatch 2": 60
                    },
                    "Odim": {
                        "gta5": 60,
                        "roblox": 60,
                        "euro truck 2": 60,
                        "lol": 90,
                        "free fire": 60,
                        "minecraft": 180,
                        "fortnite": 60,
                        "valorant": 60,
                        "overwatch 2": 60
                    },
                    "Trigger": {
                        "gta5": 60,
                        "overwatch 2": 60,
                        "euro truck 2": 100,
                        "roblox": 60,
                        "free fire": 60,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Fritz": {
                        "gta5": 60,
                        "overwatch 2": 60,
                        "euro truck 2": 100,
                        "roblox": 60,
                        "free fire": 60,
                        "minecraft": 120,
                        "fortnite": 60,
                        "valorant": 120,
                        "cs2": 60
                    },
                    "Freya I": {
                        "gta5": 180,
                        "warzone": 170,
                        "spiderman 2": 120,
                        "red dead 2": 90,
                        "bf6": 120,
                        "cyberpunk 2077": 100,
                        "fortnite": 400,
                        "valorant": 500,
                        "cs2": 250
                    },
                    "Pegasus I": {
                        "gta5": 180,
                        "warzone": 170,
                        "spiderman 2": 120,
                        "red dead 2": 90,
                        "bf6": 120,
                        "cyberpunk 2077": 100,
                        "fortnite": 400,
                        "valorant": 500,
                        "cs2": 250
                    },
                    "Square": {
                        "gta5": 90,
                        "warzone": 120,
                        "hogwarts legacy": 80,
                        "red dead 2": 60,
                        "cyberpunk 2077": 70,
                        "bf2042": 100,
                        "fortnite": 80,
                        "valorant": 300,
                        "cs2": 350
                    },
                    // POR SKU -- RTX 5070
                    "17543218718PR": {
                        "gta5": 87,
                        "warzone": 150,
                        "hogwarts legacy": 130,
                        "red dead 2": 100,
                        "cyberpunk 2077": 101, 
                        "bf6": 210,
                        "fortnite": 186,
                        "valorant": 520,
                        "cs2": 450
                    },
                    "17643218718PR": {
                        "gta5": 87,
                        "warzone": 150,
                        "hogwarts legacy": 130,
                        "red dead 2": 100,
                        "cyberpunk 2077": 101, 
                        "bf6": 210,
                        "fortnite": 186,
                        "valorant": 520,
                        "cs2": 450
                    },
                    "17541618718PR": {
                        "gta5": 87,
                        "warzone": 150,
                        "hogwarts legacy": 130,
                        "red dead 2": 100,
                        "cyberpunk 2077": 101, 
                        "bf6": 210,
                        "fortnite": 186,
                        "valorant": 520,
                        "cs2": 450
                    },
                    "17641618718PR": {
                        "gta5": 87,
                        "warzone": 150,
                        "hogwarts legacy": 130,
                        "red dead 2": 100,
                        "cyberpunk 2077": 101, 
                        "bf6": 210,
                        "fortnite": 186,
                        "valorant": 520,
                        "cs2": 450
                    },
                    // t1 -- RTX 5060 Ti
                    "17543214718PR": {
                        "gta5": 85,
                        "warzone": 120,
                        "hogwarts legacy": 87,
                        "red dead 2": 100,
                        "cyberpunk 2077": 120, 
                        "bf6": 110,
                        "fortnite": 276,
                        "valorant": 480,
                        "cs2": 290
                    },
                    "17643214718PR": {
                        "gta5": 85,
                        "warzone": 120,
                        "hogwarts legacy": 87,
                        "red dead 2": 100,
                        "cyberpunk 2077": 120, 
                        "bf6": 110,
                        "fortnite": 276,
                        "valorant": 480,
                        "cs2": 290
                    },
                    "17641614718PR": {
                        "gta5": 85,
                        "warzone": 120,
                        "hogwarts legacy": 87,
                        "red dead 2": 100,
                        "cyberpunk 2077": 120, 
                        "bf6": 110,
                        "fortnite": 276,
                        "valorant": 480,
                        "cs2": 290
                    },
                    "17541614718PR": {
                        "gta5": 85,
                        "warzone": 120,
                        "hogwarts legacy": 87,
                        "red dead 2": 100,
                        "cyberpunk 2077": 120, 
                        "bf6": 110,
                        "fortnite": 276,
                        "valorant": 480,
                        "cs2": 290
                    },
                    // t2 -- RTX 5060
                    "17643213718PR": {
                        "gta5": 90,
                        "warzone": 0,
                        "hogwarts legacy": 65,
                        "red dead 2": 75,
                        "cyberpunk 2077": 80, 
                        "bf6": 130,
                        "fortnite": 235,
                        "valorant": 440,
                        "cs2": 310
                    },
                    "17543213718PR": {
                        "gta5": 90,
                        "warzone": 0,
                        "hogwarts legacy": 65,
                        "red dead 2": 75,
                        "cyberpunk 2077": 80, 
                        "bf6": 130,
                        "fortnite": 235,
                        "valorant": 440,
                        "cs2": 310
                    },
                    "17541613718PR": {
                        "gta5": 90,
                        "warzone": 0,
                        "hogwarts legacy": 65,
                        "red dead 2": 75,
                        "cyberpunk 2077": 80, 
                        "bf6": 130,
                        "fortnite": 235,
                        "valorant": 440,
                        "cs2": 310
                    },
                    "17641613718PR": {
                        "gta5": 90,
                        "warzone": 0,
                        "hogwarts legacy": 65,
                        "red dead 2": 75,
                        "cyberpunk 2077": 80, 
                        "bf6": 130,
                        "fortnite": 235,
                        "valorant": 440,
                        "cs2": 310
                    },
                }

                const gamesLabels = {
                    "gta5": "Grand Theft Auto 5",
                    "overwatch 2": "Overwatch 2",
                    "euro truck 2": "Euro Truck Simulator 2",
                    "roblox": "Roblox",
                    "free fire": "Free Fire",
                    "minecraft": "Minecraft",
                    "fortnite": "Fortnite",
                    "valorant": "Valorant",
                    "cs2": "Counter Strike: 2",
                    "hogwarts legacy": "Hogwarts Legacy",
                    "red dead 2": "Red Dead Redemption 2",
                    "bf2042": "Battlefield 2042",
                    "bf6": "Battlefield 6: Redsec",
                    "cyberpunk 2077": "Cyberpunk 2077",
                    "warzone": "Warzone",
                    "spiderman 2": "Spiderman 2",
                    "lol": "League of Legends",
                }

                const gamesImgs = {
                    "gta5": "gtavlogo.png",
                    "overwatch 2": "overwatch2logo-1.png",
                    "euro truck 2": "eurotruck2logo-1.png",
                    "roblox": "robloxlogo-1.png",
                    "free fire": "freefirelogo-1.png",
                    "minecraft": "minecraftlogo-1.png",
                    "fortnite": "fortnitelogo-1.png",
                    "valorant": "valorantlogo-1.png",
                    "cs2": "cs2logo-1.png",
                    "hogwarts legacy": "hogwartslogo-1.png",
                    "red dead 2": "reddead2logo.png",
                    "bf2042": "bf2042logo-1.png",
                    "bf6": "battlefield6logo.png",
                    "cyberpunk 2077": "cyberpunk2077logo-1.png",
                    "warzone": "warzonelogo.png",
                    "spiderman 2": "spiderman2logo.png",
                    "lol": "lollogo-1.png"
                }


                const selectedFpsDataObj = gamesFps[selectedPc.name]
                const fpsTableHtml = Object.entries(selectedFpsDataObj).map(([game, fps]) => `      
    <tr title="${gamesLabels[game]}" alt="${gamesLabels[game]}">
        <td><img loading="lazy" class="game-img" src="${FILE_IMG_PREFIX + gamesImgs[game]}" /></td>

        <td class="fps-value">

        <p id="fps-value-label">${fps}+ FPS</p>
        <div class="bar-container">
            <div class="bar-fill" style="width: ${fps / 0.80}%;"></div>
        </div>

        </td>
    </tr>      
    `).join("")

                fpsContainer.innerHTML = `   
<h1 id="confira-desempenho">CONFIRA O DESEMPENHO DESSE PC NOS <span>SEUS JOGOS FAVORITOS!</span></h1>

<div class="main-section">

    <div class="table-column">

    <table class="fps-table">
        <thead>
        <tr>
        </tr>
        </thead>

        <tbody>
        ${fpsTableHtml}
        </tbody>

    </table>

    </div>

    <div class="youtube-column">

    <div class="youtube-container">
        <iframe
        id="dynamic-desc-ytb-player"
        src="${YTB_EMBED_PREFIX + selectedPc.fps[0] + YTB_EMBED_SUFIX}"
        title="YouTube video player" frameborder="0" allowfullscreen loading="lazy">
        </iframe>
    </div>

    </div>
    
    </div>
    <p id="fps-obs">*Os valores de FPS são estimativas e podem variar conforme configurações gráficas do jogo,
        sistema,
        otimizações de software e atualizações dos jogos. O vídeo apresentado não tem filiação alguma com a Setup Ninja e é meramente um exemplo do desempenho do computador.</p>
                `
                const iframe = fpsContainer.querySelector('#dynamic-desc-ytb-player')

                function onYouTubeIframeAPIReady() {
                    // 2. Passa a referência direta do elemento (meuIframe) em vez de uma string de ID
                    player = new YT.Player(iframe, {
                        events: {
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }

                function onPlayerStateChange(event) {
                    if (event.data === YT.PlayerState.PLAYING) {
                        forceFullscreen(event.target.getIframe());
                    }
                }

                function forceFullscreen(element) {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    }
                }

                caractsPc.appendChild(fpsContainer)
            }

            const observationsContainer = document.createElement('section');
            observationsContainer.classList.add('observations')
            observationsContainer.innerHTML = `
        <p>Oferecemos 12 meses de garantia: 3 meses diretamente conosco e 9 meses de garantia com a fabricante do(s) componente(s).</p>

        <p>Não perca a oportunidade de experimentar jogos em um novo nível de desempenho e qualidade visual. Compre agora na Setup Ninja e leve para casa um produto de alta qualidade! Na Setup Ninja, oferecemos as marcas e
            modelos mais renomados do mercado, garantindo excelência em cada escolha. Caso tenha qualquer dúvida, <a
            href="${linkWhatsaapp}">clique aqui</a> para entrar em contato.
        </p>

        <p class="illustrative-image-txt">Obs.: As imagens utilizadas no anúncio são apenas ilustrativas.</p>
        `
                caractsPc.appendChild(observationsContainer)

            finished = true;
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
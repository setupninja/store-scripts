(async () => {
    const DB_NAME = "SetupNinjaDB"
    const STORE_NAME = "answer_status"
    const STORE_NAME_ANSWERED = "questions_answered"
    const API_URL = "https://customers-stn.vercel.app/"
    const CHECK_INTERVAL_MS = 10 * 60 * 1000

    function getAll(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll()

            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)
        })
    }

    const escapeHtml = (str = "") => str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;")

    const db = await openDb(DB_NAME, STORE_NAME)
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const data = await getAll(store)

    const now = Date.now()

    const pending = data.filter(item => {
        if (item.viewed) return false
        if (!item.last_checked_at) return true
        return (now - item.last_checked_at) >= CHECK_INTERVAL_MS
    })

    const getAnswerFromAPI = async (id, retries = 3) => {
        try {
            const res = await fetch(API_URL + `questions/answers/_id/${id}`)

            if (res.status === 429) {
                if (retries <= 0) {
                    let dat = await idbGet(DB_NAME, STORE_NAME, id)
                    if (!dat) return null
                    dat.last_checked_at = Date.now()
                    await idbSet(DB_NAME, STORE_NAME, id, dat)
                    return null;
                }

                const retryAfter = res.headers.get("Retry-After")
                const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : 60_000

                await new Promise(resolve => setTimeout(resolve, waitMs))
                return getAnswerFromAPI(id, retries - 1)
            }

            const json = await res.json()

            let dat = await idbGet(DB_NAME, STORE_NAME, id)
            dat.last_checked_at = Date.now()

            if (json?.data && json?.data?.length > 0) {
                dat.status = "answered"
                dat.answer = json.data[0].answer.text

                await idbSet(DB_NAME, STORE_NAME, id, dat)
                await idbSet(DB_NAME, STORE_NAME_ANSWERED, id, json)

                return json
            }

            await idbSet(DB_NAME, STORE_NAME, id, dat)
            return null
        } catch (err) {
            console.error("Erro API:", err)
            return null
        }
    }

    const findNextAnswer = async (fromIndex = 0) => {
        for (let i = fromIndex; i < pending.length; i++) {
            let result = null
            if (pending[i].status == "answered") {
                result = await idbGet(DB_NAME, STORE_NAME_ANSWERED, pending[i].id)
            } else {
                result = await getAnswerFromAPI(pending[i].id)
            }

            if (result) return { answer: result, index: i }
        }
        return null
    }

    const showAnswerNotification = (answer, currentIndex) => {
        const answerId = answer.id
        const data = answer.data[0]

        const showAnswerModal = (data) => {
            const answerBg = document.createElement("div")
            answerBg.className = "answer-bg-modal"

            const date = new Date(data.question.date)
            const formatData = date.toLocaleDateString("pt-BR")

            const stpDate = new Date(data.answer.date)
            const stpFormatData = stpDate.toLocaleDateString("pt-BR")

            answerBg.innerHTML = `
        <div class="answer-dt-window">
          <div class="answer-w-top">
            <div class="answer-w-t-left">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.168 8.333a8.333 8.333 0 1 1-4.001-5.554"/><path d="m7.5 9.167 2.5 2.5 8.333-8.334"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>
              <h2>Sua pergunta foi respondida!</h2>
            </div>
            <div class="answer-w-t-right">
              <button id="close-answer-bg"><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 3.75-7.5 7.5m0-7.5 7.5 7.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
          </div>

          <div class="answer-w-body">
            <div class="answer-b-product-details"> 
              <div class="answer-product-photo">
                <img src="https://cdn.dooca.store/174137/products/${data.product.img}" alt="${data.product.name}">
              </div>
              <div class="answer-product-infos">
                <h3>${escapeHtml(data.product.name)}</h3>
                <div class="cupons-product-info">
                  <span><svg fill="#00ce3e" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path d="m14.377 6.496-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg> 15% OFF NO PIX</span>
                </div>
              </div>
            </div>

            <div class="answer-w-chat">
              <div class="answer-chat-message message-right">
                <div class="l1">
                  <span class="answer-customer-alias">
                    ${escapeHtml(data.question.customer.alias)}
                  </span>
                  <div class="message-bobble-wrapper">
                    <div class="answer-message-wrapper">
                      <p>
                        ${escapeHtml(data.question.text)}
                      </p>
                      <div class="tracinho"></div>
                    </div>
                    <div class="answer-message-bottom-f">
                      ${data.question.likes && data.question.likes >= 1 ? `
                        <div class="answer-like-container">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xml:space="preserve"><path d="M11 24V14H5v12h6v-2.4h0c1.5 1.6 4.1 2.4 6.2 2.4h6.5c1.1 0 2.1-.8 2.3-2l1.5-8.6c.3-1.5-.9-2.4-2.3-2.4H20V6.4C20 5.1 18.7 4 17.4 4h0C16.1 4 15 5.1 15 6.4v0c0 1.6-.5 3.1-1.4 4.4l-2.6 3" style="fill:none;stroke:#00CE3E;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10"></path></svg>
                          <span>${data.question.likes}</span>
                        </div>
                      ` : ``}
                      <span class="answer-question-date">${formatData}</span>
                  </div>
                  </div>
                </div>

                <div class="l2">
                  <img src="https://cdn.dooca.store/174137/files/ninja-customer-icone-usqpr.png" alt="ninja da Setup Ninja"/>
                </div>
              </div>
              <div class="answer-chat-message message-left">
                <div class="l2">
                  <img src="https://cdn.dooca.store/174137/files/ninja-atendente-suw1y.png" alt="ninja da Setup Ninja"/>
                </div>
                <div class="l1">
                  <span class="answer-customer-alias">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.406 5.388a2.5 2.5 0 0 1 2.988-2.982 2.5 2.5 0 0 1 4.212 0 2.5 2.5 0 0 1 2.988 2.988 2.5 2.5 0 0 1 0 4.212 2.5 2.5 0 0 1-2.981 2.988 2.5 2.5 0 0 1-4.22 0 2.5 2.5 0 0 1-2.987-2.981 2.5 2.5 0 0 1 0-4.225" fill="#fd7710"/><path d="m5.625 7.5 1.25 1.25 2.5-2.5" stroke="#2b2b2b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Atendente ${escapeHtml(data.answer.user)}
                  </span>
                  <div class="answer-message-wrapper">
                    <p>
                      ${escapeHtml(data.answer.text)}
                    </p>
                    <div class="tracinho"></div>
                  </div>
                  <span class="answer-question-date">${stpFormatData}</span>
                </div>
              </div>
            </div>

            <div class="answer-w-footer">
              <a href="https://www.setupninja.com.br/${data.product.link}?utm_source=setupninja&utm_medium=answermodal">
                Ver produto na Loja <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5 5.5 6 3 3.5m3.5 5L9 6 6.5 3.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>
      `

            const handleModalClose = async () => {
                answerBg.remove()

                const next = await findNextAnswer(currentIndex + 1)
                if (next) showAnswerNotification(next.answer, next.index)
            }

            answerBg.addEventListener("mousedown", (e) => {
                if (e.target == answerBg) handleModalClose()
            })

            answerBg.querySelector("#close-answer-bg").addEventListener("click", () => {
                handleModalClose()
            })

            document.body.insertAdjacentElement("beforeend", answerBg)
        }

        const buildNotEle = (data) => {
            const notDiv = document.createElement("div")
            notDiv.className = "answer-notification-popup"
            notDiv.innerHTML = `
      <div class="answer-notification-header">
        <div class="answer-notification-header-left">
          <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.99 12.25a1.167 1.167 0 0 0 2.02 0m4.823-7.583c0-1.342-.466-2.509-1.166-3.5M1.903 8.94a.583.583 0 0 0 .43.977h9.334a.584.584 0 0 0 .431-.976c-.775-.8-1.598-1.65-1.598-4.274a3.5 3.5 0 0 0-7 0c0 2.624-.823 3.474-1.597 4.273m.43-7.773c-.7.991-1.166 2.158-1.166 3.5"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z"/></clipPath></defs></svg>
          <h2 class="answer-title">Sua pergunta foi respondida!</h2>
        </div>
        <div class="answer-notification-header-right">
          <button id="close-answer-notification"><svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 3.75-7.5 7.5m0-7.5 7.5 7.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>

      <div class="answer-notification-body">
        <div class="answer-notification-body-wrapper">
          <div class="answer-notification-photo">
            <img src="https://cdn.dooca.store/174137/products/${data.product.img}" />
          </div>
          <div class="answer-notification-text">
            <p>❝${data.answer.text.length > 80 ? escapeHtml(data.answer.text.slice(0, 80)) + "..." : escapeHtml(data.answer.text)}❞</p>
          </div>
        </div>
      </div>

      <div class="answer-notification-footer">
        <button id="see-answer-button" type="button">Ver resposta <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5 5.5 6 3 3.5m3.5 5L9 6 6.5 3.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      `

            const handleNotClose = async () => {
                notDiv.remove()

                const next = await findNextAnswer(currentIndex + 1)
                if (next) showAnswerNotification(next.answer, next.index)
            }

            notDiv.querySelector("#close-answer-notification").addEventListener("click", (e) => {
                handleNotClose()
            })

            notDiv.querySelector("#see-answer-button").addEventListener("click", async () => {
                notDiv.remove()

                showAnswerModal(data)

                let dat = await idbGet(DB_NAME, STORE_NAME, answerId)
                if (!dat) return null
                dat.viewed = true

                await idbSet(DB_NAME, STORE_NAME, answerId, dat)
            })

            return notDiv
        }

        document.body.insertAdjacentElement("beforeend", buildNotEle(data))
    }

    const first = await findNextAnswer(0)
    if (first) showAnswerNotification(first.answer, first.index)
})()
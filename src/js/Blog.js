// модальное окно которое будет запрашивать гео и потом передавать его в класс для рендеринга элемента
// класс для рендеринга элемента. Должен хранить контейнер куда рендерить элемент
// класс для события поле для ввода текста а затем вызов мод. окна для гео и рендеринг элемента через класс
// класс для события аудио для ввода текста а затем вызов мод. окна для гео и рендеринг элемента через класс
import CreateItemList from "./CreateItemList";

// класс для события видео для ввода текста а затем вызов мод. окна для гео и рендеринг элемента через класс
class Blog {
  constructor(container) {
    this.container = container;
  }

  init() {
    this.container.innerHTML = `<main class="main">
    <ul class="list"></ul>
    <div class="textarea-wrapper">
      <textarea
        class="textarea"
        cols="30"
        rows="4"
      ></textarea>
      <button class="button button-stop">Остановить запись</button>
      <button class="button button-micro"><svg width="32" height="32" viewBox="0 0 32 32" fill="black" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 14V17C23 18.8565 22.2625 20.637 20.9497 21.9497C19.637 23.2625 17.8565 24 16 24C14.1435 24 12.363 23.2625 11.0503 21.9497C9.7375 20.637 9 18.8565 9 17V14H7V17C7.00105 19.2131 7.81745 21.3482 9.29322 22.9973C10.769 24.6465 12.8006 25.6941 15 25.94V28H11V30H21V28H17V25.94C19.1994 25.6941 21.231 24.6465 22.7068 22.9973C24.1825 21.3482 24.9989 19.2131 25 17V14H23Z" fill="black"/>
      <path d="M16 22C17.3261 22 18.5979 21.4732 19.5355 20.5355C20.4732 19.5979 21 18.3261 21 17V7C21 5.67392 20.4732 4.40215 19.5355 3.46447C18.5979 2.52678 17.3261 2 16 2C14.6739 2 13.4021 2.52678 12.4645 3.46447C11.5268 4.40215 11 5.67392 11 7V17C11 18.3261 11.5268 19.5979 12.4645 20.5355C13.4021 21.4732 14.6739 22 16 22Z" fill="black"/>
      </svg>
      </button>
      <button class="button button-video"><svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_891_2029)">
      <path d="M20.2291 15.2598L17.6891 14.9698C17.3904 14.9347 17.0877 14.9678 16.8036 15.0665C16.5196 15.1652 16.2616 15.327 16.0491 15.5398L14.2091 17.3798C11.3703 15.936 9.06284 13.6286 7.61906 10.7898L9.46906 8.93977C9.89906 8.50977 10.1091 7.90977 10.0391 7.29977L9.74906 4.77977C9.69237 4.29194 9.45826 3.842 9.0913 3.51561C8.72434 3.18923 8.25017 3.00918 7.75906 3.00977H6.02906C4.89906 3.00977 3.95906 3.94977 4.02906 5.07977C4.55906 13.6198 11.3891 20.4398 19.9191 20.9698C21.0491 21.0398 21.9891 20.0998 21.9891 18.9698V17.2398C21.9991 16.2298 21.2391 15.3798 20.2291 15.2598Z" fill="black"/>
      </g>
      <defs>
      <filter id="filter0_d_891_2029" x="-3" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_891_2029"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_891_2029" result="shape"/>
      </filter>
      </defs>
      </svg>
      </button>
    </div>
  </main>`;

    this._registerEvents();
  }

  _registerEvents() {
    this._addText();
    this._addAudio();
    this._addVideo();
  }

  _addText() {
    document.querySelector(".textarea").addEventListener("keyup", (e) => {
      if (e.code === "Enter") {
        new CreateItemList(this.container, "text", e.target.value).init();
        document.querySelector(".textarea").value = "";
      }
    });
  }

  _addAudio() {
    document
      .querySelector(".button-micro")
      .addEventListener("click", async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.addEventListener("start", () => {
          console.log("start");
        });

        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(chunks);

          new CreateItemList(
            this.container,
            "audio",
            URL.createObjectURL(blob)
          ).init();
        });

        recorder.start();
        document.querySelector(".button-stop").style = "display: block";

        document.querySelector(".button-stop").addEventListener("click", () => {
          document.querySelector(".button-stop").style = "display: none";
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        });
      });
  }

  _addVideo() {
    document
      .querySelector(".button-video")
      .addEventListener("click", async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.addEventListener("start", () => {
          console.log("start");
        });

        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        recorder.addEventListener("stop", () => {
          const blob = new Blob(chunks);

          new CreateItemList(
            this.container,
            "video",
            URL.createObjectURL(blob)
          ).init();
        });

        recorder.start();
        document.querySelector(".button-stop").style = "display: block";

        document.querySelector(".button-stop").addEventListener("click", () => {
          document.querySelector(".button-stop").style = "display: none";
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        });
      });
  }
}

export default Blog;

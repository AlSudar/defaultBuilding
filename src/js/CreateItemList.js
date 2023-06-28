import CreateAudioItem from "./CreateAudioItem";
import CreateTextItem from "./CreateTextItem";
import CreateVideoItem from "./CreateVideoItem";

class CreateItemList {
  constructor(container, type, data) {
    this.container = container;
    this.modal = undefined;
    this.coordinats = null;
    this.type = type;
    this.data = data;
  }

  _modalGeo() {
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");

    this.modal.innerHTML = `<h2>Что-то пошло не так</h2>
    <p>
      К сожалению, нам не удалось определить ваше местоположение.
      Пожалуйста, дайте разрешение на получение местоположения или введите
      его вручную
    </p>
    <label for="coordinats">Широта и долгота через запятую</label>
    <input
      id="coordinats"
      placeholder="Введите ширину и долготу"
      class="modal-input"
    />
    <div class="modal-buttons">
      <button class="modal-button modal-button-cancel">Отмена</button>
      <button class="modal-button modal-button-submit" disabled>Ок</button>
    </div>`;

    this.container.appendChild(this.modal);
    this._registerEvents();
  }

  _registerEvents() {
    document.querySelectorAll(".modal-button").forEach((item) => {
      item.addEventListener("click", () => {
        this.modal.remove();
        this._renderItemList();
      });
    });

    document.querySelector(".modal-input").addEventListener("change", () => {
      if (document.querySelector(".modal-input").value.length > 0) {
        document
          .querySelector(".modal-button-submit")
          .removeAttribute("disabled");
        this.coordinats = document
          .querySelector(".modal-input")
          .value.split(",");
      } else {
        this.coordinats = null;
        document
          .querySelector(".modal-button-submit")
          .setAttribute("disabled", "true");
      }
    });
  }

  _renderItemList() {
    switch (this.type) {
      case "video":
        return new CreateVideoItem(this.data, this.coordinats).render();
      case "audio":
        return new CreateAudioItem(this.data, this.coordinats).render();
      case "text":
      default:
        return new CreateTextItem(this.data, this.coordinats).render();
    }
  }

  init() {
    if (navigator.geolocation) {
      const errorCallback = () => this._modalGeo();

      const successCallback = (position) => (this.coordinats = position);

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }
}

export default CreateItemList;

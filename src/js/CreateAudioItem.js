class CreateAudioItem {
  constructor(data, coordinats) {
    this.data = data;
    this.timeCreate = undefined;
    this.coordinats = coordinats;
  }

  render() {
    this.timeCreate = `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
    document.querySelector(".list").innerHTML += `<li class="list-item">
    <div class="list-item-dot"></div>
    <div class="list-item-content">
      <span class="list-item-time">${this.timeCreate}</span>
      <audio controls src=${this.data}> </audio>
      <span class="list-item-geo">[${this.coordinats}]</span>
    </div>
  </li>`;
  }
}

export default CreateAudioItem;

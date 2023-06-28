import Blog from "./Blog";

const container = document.querySelector("#root");
const app = new Blog(container);
app.init();
console.log("script is loading");

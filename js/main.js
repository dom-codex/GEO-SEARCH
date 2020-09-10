const openConverter = document.querySelector(".open-conv");
const converter = document.querySelector(".calculator");
const closeConverter = document.querySelector(".close");
openConverter.addEventListener("click", () => {
  if (converter.classList.contains("openconverter")) {
    return converter.classList.remove("openconverter");
  }
  converter.classList.add("openconverter");
});
closeConverter.addEventListener("click", () => {
  converter.classList.remove("openconverter");
});

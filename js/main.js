const searchBtn = document.querySelector(".search-btn");
const openConverter = document.querySelector(".open-conv");
const converter = document.querySelector(".calculator");
const closeConverter = document.querySelector(".close");
const reports = document.querySelector(".weather-reports");
const map = document.querySelector(".mapview");
const openMap = document.querySelector(".openMap");
const closeMap = document.querySelector(".map-close");

openConverter.addEventListener("click", () => {
  if (converter.classList.contains("openconverter")) {
    return converter.classList.remove("openconverter");
  }
  converter.classList.add("openconverter");
});
closeConverter.addEventListener("click", () => {
  converter.classList.remove("openconverter");
});
openMap.addEventListener("click", () => {
  reports.classList.add("fadeout");
  map.classList.add("fadein");
});
closeMap.addEventListener("click", () => {
  reports.classList.remove("fadeout");
  map.classList.remove("fadein");
  map.classList.add("fadeout");
  reports.classList.add("fadein");
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = $(".search input").val(); // location string is extracted from  the input section
  if (input === "") {
    // makes dialog box visible
    openDialog("Please enter a location..");
    $(".retry").css("display", "none");
  } else {
    geoCodeString(input); // call to geocode location string,
  }
});
const dialogClose = document.querySelector(".d-close");
dialogClose.addEventListener("click", closeDialog);
const retry = document.querySelector(".retry");
retry.addEventListener("click", () => {
  const input = $(".search input").val();
  geoCodeString(input);
  closeDialog();
});

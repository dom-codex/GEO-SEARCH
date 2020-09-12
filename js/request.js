const openDialog = (text) => {
  document.querySelector(".dialog").style.display = "flex";
  document.querySelector(".dialog-text").textContent = text;
};
const closeDialog = () => {
  document.querySelector(".dialog").style.display = "none";
};
const hideMapBtn = () => {
  $(".openMap").css("display", "none");
};
const showMapBtn = () => {
  $(".openMap").css("display", "block");
};
const hideLoader = () => {
  $(".loading").css("display", "none");
};
const showLoader = () => {
  $(".loading").css("display", "block");
};
const getPostalCode = (lat, long) => {
  const getPost = $.ajax({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=55488fd190be439292788dc14376416c`,
    type: "GET",
    dataType: "json",
    success: (resp) => {
      const postCode = `${resp.results[0].components.postcode}`;
      const timeZone = `${resp.results[0].annotations.timezone.name}`;
      const details = [timeZone, lat, long, postCode];
    },
    timeout: 20000,
    error: (e) => {
      if (e.statusText === "timeout") {
        getPost.abort();
      } else {
        getPost.abort();
      }
    },
  });
};
const weather = (lat, long, locationName) => {
  const weatherRequest = $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?APPID=29e61bdb5e72aabc168d437416e51f4b&lat=${lat}&lon=${long}&units=metric`,
    type: "GET",
    dataType: "json",
    success: (resp) => {
      hideLoader();
      $("img").attr(
        "src",
        `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&scale=4&format=png32&size=400x400&markers=size:mid%7Ccolor:0xFFFF00%7Clabel:C%7C${lat},${long}&key=AIzaSyCBWYroFnjgJuHpcuhkk9Zf7vPgVNJknCk`
      );
      showMapBtn();
      const description = `${resp.weather[0].description}`;
      const temperature = `${resp.main.temp}`;
      const pressure = `${resp.main.pressure}`;
      const humidity = `${resp.main.humidity}`;
      const windSpeed = `${resp.wind.speed}`;
      $(".location-name p").text(locationName);
      $(".desc").text(description);
      $(".temperature p").html(`${temperature} &deg;<small>C</small>`);
      $(".lat").html(`${lat}&deg;`);
      $(".long").html(`${long}&deg;`);
      $(".ws").text(`${windSpeed}m/s`);
      $(".humidity div").text(`${humidity}%`);
      $(".pressure div").text(`${pressure}Kpa`);
    },
    timeout: 20000,
    error: (e) => {
      hideLoader();
      weatherRequest.abort();
      $(".retry").css("display", "block");
      $(".d-close").css("display", "none");
      openDialog("An error occurred,please try again");
    },
  });
};
const geoCodeString = (locationName) => {
  showLoader();
  hideMapBtn();
  const geoCode = $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=AIzaSyCBWYroFnjgJuHpcuhkk9Zf7vPgVNJknCk`,
    type: "GET",
    dataType: "json",
    success: (data) => {
      hideLoader();
      if (data.status === "OK") {
        const lat = `${data.results[0].geometry.location.lat}`;
        const long = `${data.results[0].geometry.location.lng}`;
        //   getPostalCode(lat, long); // call to get postcode
        weather(lat, long, locationName); // call to weather api
      } else {
        geoCode.abort(); // aborts the ajax call to the weather api
        // removes the loading class from the body element
        // $("#warningText").text("Place not found...!"); // notify the user place
        openDialog("An error occured or place not found");
        $(".retry").css("display", "block");
        $(".d-close").css("display", "none");
      }
    },
    timeout: 20000,
    error: (e) => {
      hideLoader();
      $(".retry").css("display", "block");
      openDialog("An error occurred,please try again");
      geoCode.abort();
    },
  });
};

// handles conversion from farenheit to celsius
const convertToCelsius = (F) => {
  const C = (F - 32) * (5 / 9);
  return C;
};
// handles conversion from celsuis to farenheit
const convertToFarenheit = (C) => {
  const F = (C * 9) / 5 + 32;
  return F;
};
// handles calls to the above functions depending on the user's choice
const tempConverter = (temp) => {
  let value; // converted value will be stored here
  const convertFrom = $("#selectFrom :selected").val(); // gets the
  // scale we want to convert from
  const convertTo = $("#selectTo :selected").val(); // gets the scale
  // we want to convert to from
  // the if statements are used to prevent the conversion to same scale
  if (convertTo === "degree" && convertFrom === "farenheit") {
    value = convertToCelsius(temp);
    return `${value}°C`;
  }
  if (convertTo === "farenheit" && convertFrom === "degree") {
    value = convertToFarenheit(temp);
    return `${value}°F`;
  }
  // line 26,27,&28 handles the situation whereby the user tries to
  // convert between same scale
  if (convertTo === convertFrom) {
    const box = document.querySelector(".modal");
    $("#warningText").text(
      "Cannot carry out conversion between the same scale"
    );
    box.classList.add("show");
  }
  return "";
};
const converterButton = $("#converter"); // selects the convert button
// click eventlistener added to the convert button
converterButton.on("click", () => {
  const temperature = $("#inputArea").val(); // get the value the user wants to convert
  if (temperature === "") {
    openDialog("Please input a temperature value..");
    $(".retry").css("display", "none");
  } else {
    $("#result").val(tempConverter(temperature)); // the converted value is displayed
    // in the result area after the conversion operation
  }
});

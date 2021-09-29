//console.log("Client side javascript file is loaded");

//fetch is a browser API
fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

//for testing code
const search = document.querySelector("input");
const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

/*render content to paragraph, Select the second message p.
render loading msg, rendor error if any. No error render location and forecast*/
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value; // para makuha yung value
  //messageOne.textContent = ""; //# yan startsince nasa paragraph.
  //part ng chalenge
  messageOne.textContent = "loading...";
  messageTwo.textContent = " ";
  // remove the url if online
  //fetch("http://localhost:3000/weather?address=" + location).then(
  fetch("/weather?address=" + location).then((response) => {
    //ito na lang
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        //console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        //console.log(data.location);
        messageTwo.textContent = data.forecast;
        //console.log(data.forecast);
      }
    });
  });
});

/*Input value to get weather
Migrate fetch, Use search text, must have error*/

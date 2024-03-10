"use strict";
// api key = b7cfffa5610dac46cc196b4a4a8de699
const searchInp = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-icon");
const weatherImg = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const humidityPercentage = document.querySelector(".humidity-percentage");
const windSpeed = document.querySelector(".wind-speed");
// FUNCTIONS

// Fetching data and request to server with async await
const fetcher = async function (cityName) {
  // Using try catch block
  try {
    const deliver = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&q=${cityName}&appid=b7cfffa5610dac46cc196b4a4a8de699&units=metric`
    );
    console.log(deliver);
    if (!deliver.ok)
      throw new Error("Cant find your city, Please add another city");

    // Returning the data
    return await deliver.json();
  } catch (error) {
    // Error handling
    alert(`Error: ${error.message}`);
  }
};

// EVENT HANDLERS
searchBtn.addEventListener("click", async function () {
  // Using guard clause
  if (!searchInp.value) return;

  const data = await fetcher(searchInp.value);
  searchInp.value = "";
  // check for data validity
  if (!data) return;

  // Inserting data text into the page
  cityName.textContent = data.name;
  humidityPercentage.textContent = `${data.main.humidity}%`;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  weatherImg.src = `svg/${data.weather[0].main}.svg`;
});

// @js-challenges

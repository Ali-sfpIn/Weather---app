"use strict";
// api key = b7cfffa5610dac46cc196b4a4a8de699
const searchInp = document.querySelector(".search-inp");
const searchBtn = document.querySelector(".search-icon");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const humidityPercentage = document.querySelector(".humidity-percentage");
const windSpeed = document.querySelector(".wind-speed");
// FUNCTIONS
const fetcher = async function (cityName) {
  try {
    const deliver = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&q=${cityName}&appid=b7cfffa5610dac46cc196b4a4a8de699&units=metric`
    );
    if (!deliver.ok)
      throw new Error("Cant find your city, Please add another city");
    return await deliver.json();
  } catch (error) {
    alert(`Error:${error.message}`);
  }
};

// EVENT HANDLERS
searchBtn.addEventListener("click", async function () {
  if (!searchInp.value) return;
  const data = await fetcher(searchInp.value);
  searchInp.value = "";
  if (!data) return;
  cityName.textContent = data.name;
  humidityPercentage.textContent = `${data.main.humidity}%`;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  weatherIcon.src = `svg/${data.weather[0].main}.svg`;
});

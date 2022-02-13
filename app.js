"use strict";

let hamburger = document.querySelector(".menu__hamburger");
let menuList = document.querySelector(".menu__list");
let locationInput = document.querySelector("#location-input");
let city = document.querySelector(".weather-today__city");
let temp = document.querySelector(".weather-today__temperature");
let extrasFeels = document.querySelector(".feels-like");
let extrasHigh = document.querySelector(".high-temp");
let extrasLow = document.querySelector(".low-temp");
const geoMarker = document.querySelector(".fa-map-marker-alt");
let forecastDayHi = document.querySelector(".forecast-day__hi");
let forcastDayLo = document.querySelector(".forecast-day__lo");
// just wanted to use a random object for the api... because I was bored
const api = {
	apiKey: "74a6a74158e6ab0a7c7537bafef62835",
};

hamburger.addEventListener("click", () => {
	menuList.classList.toggle("open");
	// menuList.classList.toggle("open");

	console.log("hamburger is clicked");
});

locationInput.addEventListener("keydown", function (e) {
	let apiCity;
	if (e.keyCode == 13) {
		//keyCode for enter
		e.preventDefault();
		apiCity = locationInput.value;
		apiCitySplit = apiCity.split(" ");
		inputApi(
			apiCitySplit
				.map((cityUpper) => {
					return (
						cityUpper[0].toUpperCase() + cityUpper.substring(1).toLowerCase()
					);
				})
				.join(" ")
		);
	}
});

let inputApi = async (cityValue) => {
	try {
		let response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=imperial&appid=${api.apiKey}`
		);
		let data = await response.json();
		// console.log(data.main);
		mainTemp(cityValue, Math.round(data.main.temp));
		extras(
			Math.round(data.main.feels_like),
			Math.round(data.main.temp_max),
			Math.round(data.main.temp_min)
		);
	} catch (e) {
		// throw new Error(e);
		console.log(e, ":there's a mistake somewhere!!!");
	}
};

// seeing if i can make individual functions for each element, just for fun (and practice)

let mainTemp = (cityName, mainTemp) => {
	// city.textContent = cityName;
	city.textContent = cityName;
	// city.textContent = `yoooooo`;
	temp.textContent = mainTemp;
};

let extras = (feelsLike, highTemps, lowTemps) => {
	extrasFeels.textContent = feelsLike;
	extrasHigh.textContent = highTemps;
	extrasLow.textContent = lowTemps;
};

geoMarker.addEventListener("click", () => {
	navigator.geolocation.getCurrentPosition(successCall, errorCall, {
		enableHighAccuracy: true,
	});
});
let geoBtnApi = async (cityGeoUpdateParam, lat, long) => {
	try {
		let response = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${cityGeoUpdateParam}&units=imperial&appid=${api.apiKey}`
		);
		let data = await response.json();

		mainTemp(cityGeoUpdateParam, Math.round(data.main.temp));
		extras(
			Math.round(data.main.feels_like),
			Math.round(data.main.temp_max),
			Math.round(data.main.temp_min)
		);
	} catch (e) {
		console.log(e, ":there's a mistake somewhere!!!");
	}
};

const successCall = (position) => {
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	console.log(lat, long);
	// apiCity = locationInput.value;
	forecastFunc(lat, long);
	cityApiCall(lat, long);
};
const errorCall = () => {
	throw new Error(console.log(`It's a no for me dawg"`));
};

let cityApiCall = async (lat, long) => {
	try {
		let response = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
		);

		let cityApiCallData = await response.json();
		// console.log(cityApiCallData);
		let cityGeoUpdate = city.textContent;
		cityGeoUpdate = cityApiCallData.locality;

		// provides lat and long for 10 forcast api

		geoBtnApi(cityGeoUpdate, lat, long);
		// console.log(mainTemp(cityGeoUpdate));
		// console.log(mainTemp);
	} catch (e) {
		throw new Error(console.log(e));
	}
};

// *** *** *** 5 DAY FORECAST CONSTRUCTOR*** *** ***

let forecastFunc = async (lat, long) => {
	try {
		let resp = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=imperial&appid=${api.apiKey}`
		);

		let respData = await resp.json();

		let forecast8Days = respData.daily;
		// console.log(forecast8Days);
		//daily returns the 8 day forecast
		//day 0 is todays high and low date
		//figure out how to have the high and low sent to a new class call.

		for (let i = 0; i <= forecast8Days.length - 1; i++) {
			// console.log(forecast8Days[i].temp.max);
			// console.log(forecast8Days[i].temp.min);
			const dailyForecastObj = new DailyforecastInfo(
				forecast8Days[i].temp.max,
				forecast8Days[i].temp.min
			);
			console.log(forecast8Days);
			console.log(dailyForecastObj);
			console.log(typeof forecast8Days[i].temp.min);
			// let forecastWrapper = document.querySelector(".forecast-wrapper");
			// // creates outer forecast wrapper
			// let newForecastSection = document.createElement("section");
			// newForecastSection.classList.add("forecast");
			// forecastWrapper.appendChild(newForecastSection);
			// // creates inner forecast-day div and appends it to forecastWrapper
			// let newForecastDay = document.createElement("div");
			// newForecastDay.classList.add("forecast-day");
			// newForecastSection.appendChild(newForecastDay);
			// // Creates image
			// let newForecastImg = document.createElement("img");
			// newForecastImg.classList.add("new-forecast-img");
			// newForecastImg.src = "/images/07-sun.svg";
			// newForecastDay.appendChild(newForecastImg);
			// // Creates Hi: p tag
			// let newForecastParaHi = document.createElement("p");
			// newForecastParaHi.classList.add(
			// 	"forecast-day__hi",
			// 	"forecast-day__common"
			// );
			// newForecastDay.appendChild(newForecastImg);
			let forecast = document.querySelector(".forecast");
			let forecastDay = document.querySelector(".forecast-day");
			let forecastImg = document.querySelector(".forecast-img");
			let forecastPara = document.querySelectorAll("forecast-day p");
			let forecastSpanHi = document.querySelectorAll(".forecast-day__hi");

			forecastSpanHi[i].textContent = Math.round(forecast8Days[i].temp.max);
			console.log(Math.round(forecast8Days[i].temp.max));

			let forecastSpanLo = document.querySelectorAll(".forecast-day__lo");
			forecastSpanLo[i].textContent = Math.round(forecast8Days[i].temp.min);
		}
	} catch (e) {
		throw new Error(console.log(e));
	}
};

class DailyforecastInfo {
	constructor(highTempForecast, lowTempForecast) {
		this.forecastDayHi = highTempForecast;
		this.forecastDayLow = lowTempForecast;
	}
}

// function updateForecastContent() {
// 	forecastDayHi.textContent = 0;
// }

// updateForecastContent();
console.log(document.body);

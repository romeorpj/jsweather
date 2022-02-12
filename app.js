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
// just wanted to use a random object... because I was bored
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

		// apiCity = cityApiCall();
		// inputApi(apiCity);
		// console.log(apiCity);
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

			// `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,alerts,hourly&appid=${api.apiKey}`
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
		console.log(respData.daily);
		let forecast8Days = respData.daily;
		//daily returns the 8 day forecast
		//day 0 is todays high and low date
		//figure out how to have the high and low sent to a new class call.
		forecast8Days.map((element)=>{
			console.log("test")
		})
	} catch (e) {
		throw new Error(console.log(e));
	}
};

class Forecast {
	constructor(forecastFunc) {
		this.forecastDayHi = forecastFunc.current.cloud;
	}
}
newForecast = new Car("Ford");

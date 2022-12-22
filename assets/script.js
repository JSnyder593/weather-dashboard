//global variables
var inputEl = $("#city-input")
var searchEl = $("#submit-button")
var weatherEl = $("#weather")
var forecastEl = $("weeks-forecast")
var btnHit = false;

var searchHistory = [];
var cityInput;
var prevInput;
var cityLat;
var cityLon;

var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q="

//setup API key
var APIKey = "f870f861932b4a0d394d100e06527d69"

//gets current date
var today = moment();
$('#current-date').text(today.format('MMM DD, YYYY'));

//gets latitude and longitude
function getLatLong () {
    weatherEl.empty();
    if (!btnHit) {
        cityInput = inputEl.val();
        console.log(cityInput)
    } 
    
    else {
        cityInput = prevInput;
    }
    
    fetch(geoURL + cityInput + "&limit=1&appid=" + APIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.length > 0) {
            var cityNameEl = $("<h2>").text(cityInput + "(" + moment().format("MM/DD/YY") + ")"
    );
    cityNameEl.css("display", "inline");
        weatherEl.append(cityNameEl);
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        if (!searchHistory.includes(cityInput)) {
            searchHistory.push(cityInput);
            localStorage.setItem("searchHistory",
            JSON.stringify(searchHistory));
        }
        btnHit = false;
        console.log(data);
}

    })
};

//stores user input as a value in local storage
function returnCity() {
    const cityInput = document.getElementById("city-input").value;

    weatherToday(cityInput)
    weeksForecast(cityInput)
    getLatLong()

    if (cityInput) {
        localStorage.setItem("city", cityInput);
    }

};

// //gets current weather info based on the users input
function weatherToday(cityInput) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appID=" + APIKey + "&units=imperial";

    console.log(queryURL);

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentWeather.append(`<h2>${data.name}</h2>`);
            currentWeather.append(`<p><img src="https://openweathermap.org/img/wn/${(data.weather[0].icon)}.png"></img></p>`);
            currentWeather.append(`<p>Temp: <span>${data.main.temp}°F</span></p>`);
            currentWeather.append(`<p>Wind: <span>${data.wind.speed}MPH</span></p>`);
            currentWeather.append(`<p>Humidity: <span>${data.main.humidity}%</span></p>`);
        });
};

// gets five day forecast based on users input
function weeksForecast() {

    var cityInput = localStorage.getItem("city")
    let fiveDayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appID=" + APIKey + "&units=imperial";


    fetch(fiveDayURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            fiveDayForecast.append(`<div class="col-2 border border-secondary m-1 bg-dark text-white"><p>${moment(data.main.dt_txt).format('MMM DD, YYYY')}</p><p><img src="https://openweathermap.org/img/wn/${(data.weather[0].icon)}.png"></img></p><p>Temp: <span>${data.main.temp}°F</span></p><p>Wind: <span>${data.wind.speed}MPH</span></p><p>Humidity: <span>${data.main.humidity}%</span></p></div>`);
        })
};

searchEl.on("click", getLatLong)
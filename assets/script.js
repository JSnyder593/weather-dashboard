//global variables
var submitBtn = document.getElementById('submit-button');
var currentWeather = $('#weather');
var weekForecast = $('#weeks-forecast');

//setup API key
var APIKey = "4d23d9d4be9f729849f35822048b70d9"

//gets current date
var today = moment();
$('#current-date').text(today.format('MMM DD, YYYY'));

//stores user input as a value in local storage
function returnCityName() {
    let cityInput = document.getElementById("city-input").value;
    console.log(cityInput)

    if (cityInput) {
        localStorage.setItem("city", cityInput);
        retrieveWeather();
    }
};

//gets current weather info based on the users input
function retrieveWeather() {
    var city = localStorage.getItem("city")
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appID=" + APIKey + "&units=imperial";

    console.log(queryURL);

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentWeather.append(`<h2>${data.name}</h2>`);
            currentWeather.append(`<p><img src="https://openweathermap.org/img/wn/${(data.weather[0].icon)}.png"></img></p>`);
            currentWeather.append(`<p>Temp: <span>${data.main.temp}°F</span></p>`);
            currentWeather.append(`<p>Wind: <span>${data.wind.speed}MPH</span></p>`);
            currentWeather.append(`<p>Humidity: <span>${data.main.humidity}%</span></p>`);
        });
};

// gets five day forecast based on users input
function weeksForecast() {
    var city = localStorage.getItem("city")
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appID=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var weeksArray = data.list;
            console.log(weeksArray)

            for (var i = 2; i < weeksArray.length; i += 8) {
                
                weekForecast.append(`<div class="col-2 border border-secondary m-1 bg-dark text-white"><p>${moment(forecast.dt_txt).format('MMM DD, YYYY')}</p><p><img src="https://openweathermap.org/img/wn/${(forecast.weather[0].icon)}.png"></img></p><p>Temp: <span>${forecast.main.temp}°F</span></p><p>Wind: <span>${forecast.wind.speed}MPH</span></p><p>Humidity: <span>${forecast.main.humidity}%</span></p></div>`);
            }
        })
}

submitBtn.addEventListener('click', returnCityName);
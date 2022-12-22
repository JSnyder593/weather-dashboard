//global variables
var inputEl = $("#city-input")
var searchEl = $("#submit-button")
var weatherEl = $("#weather")
var forecastEl = $("weeks-forecast")
var searchHistoryEl = $("#search-history")
var btnHit = false;

var searchHistory = [];
var cityLat;
var cityLon;
var cityInput;
var prevInput;

var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q="
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=";

//setup API key
var APIKey = "f870f861932b4a0d394d100e06527d69"

//gets current date
var today = moment();
$('#current-date').text(today.format('MMM DD, YYYY'));

//gets latitude and longitude
function getLatLong() {
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
                return weatherData();
            } else {
                alert("Not a valid city name. Please try again.")
            }
        })
}

//gets current weather info based on the users input/lat/lon
function weatherData() {
    fetch(queryURL + cityLat + "&lon=" + cityLon + "&appid=" + APIKey)
        .then(function (response) {
            return response.json();
        })
        .then (function(data) {
            var temp = ((9 / 5) * (data.list[0].main.temp - 273) + 32).toFixed(1);

            var wind = data.list[0].wind.speed;
            var humidity = data.list[0].main.humidity;
            var icon = data.list[0].weather[0].icon;

            var tempEl = $("<p>").text("Temp: " + temp + " F");
            var windEl = $("<p>").text("Wind: " + wind + " MPH");
            var humidityEl = $("<p>").text("Humidity: " + humidity + " %");
            var iconEl = $("<img>").attr(
                "src",
                "https://openweathermap.org/img/w/" + icon + ".png"
            );

            weatherEl.append(iconEl, tempEl, windEl, humidityEl)
            forecastEl.empty();

            for (let i = 7; i < data.list.length; i += 8) {
                temp = ((9 / 5) * (data.list[i].main.temp - 273) + 32).toFixed(1);
                var date = moment.unix(data.list[i].dt).format("MM/DD/YY");
                wind = data.list[i].wind.speed;
                humidity = data.list[i].main.humidity;
                icon = data.list[i].weather[0].icon;

                var cardEl = $("<div>").attr("class", "card col-lg-2 col-sm-12 m-3");
                var cardBodyEl = $("<div>").attr("class", "card-body");
                var newDateEl = $("<h5>").text(date);
                var newIconEl = $("<img>").attr(
                    "src",
                    "https://openweathermap.org/img/w/" + icon + ".png"
                );
                var newTempEl = $("<p>").text("Temp: " + temp + " F");
                var newWindEl = $("<p>").text("Wind: " + wind + " MPH");
                var newHumidityEl = $("<p>").text("Humidity: " + humidity + " %");

                cardEl.css(
                    "background",
                    "linear-gradient(90deg, rgb(135, 178, 235), rgb(27, 27, 180))"
                );
                cardBodyEl.css("color", "white");
                cardBodyEl.css("padding", "0");
                cardBodyEl.append(
                    newDateEl,
                    newIconEl,
                    newTempEl,
                    newWindEl,
                    newHumidityEl
                );
                cardEl.append(cardBodyEl);
                forecastEl.append(cardEl);
            }
        });
};

function init() {
    // checks for search history and renders buttons based on that
   searchHistoryEl.empty();
    if (localStorage.getItem("searchHistory") !== null) {
      searchHistory = JSON.parse(localStorage.getItem("searchHistory"));
      for (let i = 0; i < searchHistory.length; i++) {
        var newBtn = $("<button>").text(searchHistory[i]);
        newBtn.attr("class", "btn btn-secondary mb-2 text-center col-lg-12");
       searchHistoryEl.append(newBtn);
      }
    }
  }

function loadHistory(e) {
    if (e.target.tagName === 'BUTTON') {
        pastBtnEl = e.target;
        prevInput = pastBtnEl.innerHTML;
        btnHit = true;
        getLatLong();

    }
}

init();
searchEl.on("click", getLatLong)
searchHistoryEl.on("click", loadHistory);

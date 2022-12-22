//global variables
var submitBtn = document.getElementById('submit-button');
var currentWeather = $('#weather');
var fiveDayForecast = $('#weeks-forecast');

//setup API key
var APIKey = "f870f861932b4a0d394d100e06527d69"

//gets current date
var today = moment();
$('#current-date').text(today.format('MMM DD, YYYY'));

//stores user input as a value in local storage
function returnCity() {
    const cityInput = document.getElementById("city-input").value;

    weatherToday(cityInput)
    weeksForecast(cityInput)

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
        
    
    
    
    
    
    // forecast => {
    //         forecast.list.array.forEach(day => {
            
    //         const dayContainer = document.createElement('div')

    //         const temp = day.main.temp;
    //         const tempElem = document.createElement('div')
    //         tempElem.innerText = Math.round(temp) + '°F'
    //         dayContainer.appendChild(tempElem)

    //         const icon = day.weather[0].icon;
    //         const iconElem = document.createElement('img')
    //         iconElem.src = 'http://openweathermap.org/img/wn/' + icon + '.png'
    //         dayContainer.appendChild(iconElem)

    //         document.body.appendChild(dayContainer, '#weeks')
    //     })
    // })

        //     for (let i = 2; i < fiveDay.length; i+=8) {

                

        //     }
        // })
};

submitBtn.addEventListener('click', returnCity);
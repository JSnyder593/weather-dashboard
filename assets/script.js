//global variables
var submitBtn = document.getElementById('submit-button');

//setup API key
var APIKey = "4d23d9d4be9f729849f35822048b70d9"

//stores user input as a value in local storage
function returnCityName(){
    let cityInput = document.getElementById("city-input").value;

    if (cityInput){
        localStorage.setItem("city", cityInput);
    }
};
//gets weather info based on the users input
function retrieveWeather(){
    var city = localStorage.getItem("city", cityInput)
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appID=" + APIKey;
    console.log(queryURL)
};

submitBtn.addEventListener('click', returnCityName);
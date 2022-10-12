//global variables
var submitBtn = document.getElementById('submit-button')
var input = document.getElementById('city-input')
var city = document.getElementById('city')
var temp = document.getElementById('temp')
var wind = document.getElementById('wind')
var humidity = document.getElementById('humidity')
var APIKey = "4d23d9d4be9f729849f35822048b70d9"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appID=" + APIKey

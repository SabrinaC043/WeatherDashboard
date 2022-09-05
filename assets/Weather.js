var apiKey = 'd91f911bcf2c0f925fb6535547a5ddc9' //temp apikey
var searchForm = document.getElementById('search-form');
var userInput = document.getElementById('userInput');
var largeWeatherCardContainer = document.getElementById('sameDayLgDisplay');//does this one change at all upon click, it doesn't really say?
var largeCardText = document.getElementsByClassName('card-text'); //plug in API data into the text. 
var fiveDayForeCastContainer = document.getElementById('fiveDayForecast'); // five day card container


function handleFormSubmit(e) {
    if (!userInput.value) {
        return;
    }
    e.preventDefault();
    fetchLatLon(userInput.value.trim())
}

function fetchLatLon(city) {
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    fetch(url).then(function (res) {
        return res.json()
    }).then(function (data) {
        fetchOneCall(data)
    })
}

function fetchOneCall(coords){
    var lat = coords[0].lat;
    var lon = coords[0].lon;
    var name= coords[0].name;
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + lon +'&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey;

    fetch(url).then(function (res) {
        return res.json()
    }).then(function (data) {
        console.log(data);
    })
}




searchForm.addEventListener('submit', handleFormSubmit)
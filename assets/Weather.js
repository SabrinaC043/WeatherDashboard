var apiKey = 'd91f911bcf2c0f925fb6535547a5ddc9' //temp apikey
var searchForm = document.getElementById('search-form');
var userInput = document.getElementById('userInput');
var sameDayLgDisplay = document.getElementById('sameDayLgDisplay');//does this one change at all upon click, it doesn't really say?
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
        // console.log(data);

        // traverse the data and create variables for all the content from the data
        var temp = data.current.temp;
        var uvi = data.current.uvi;
        var humidity = data.current.humdity;
        var wind = data.current.wind_speed;
        var icon =data.current.weather[0].icon;
        // create all the new elements for the card to house all the info
       var card= document.createElement('div');
       var cardBody= document.createElement('div');
       var cardTitle= document.createElement('h5');
       var tempEl=document.createElement('p');
       var uviEl=document.createElement('p');
       var humidityEl=document.createElement('p');
       var windEl=document.createElement('p');
       var iconEl=document.createElement('img');
       // set attributes
       card.setAttribute('class', 'card mb-3');
       cardBody.setAttribute('class', 'card-body');
       cardTitle.setAttribute('class', 'card-title');
       tempEl.setAttribute('class', 'card-text');
       uviEl.setAttribute('class', 'card-text');
       humidityEl.setAttribute('class','card-text');
       windEl.setAttribute('class','card-text');
       iconEl.setAttribute('class', 'img');


        //append the content to the new element
        // card.textContent=temp;
        // cardBody.textContent=uvi;
        // cardTitle.textContent=humidity;
    
        cardTitle.textContent=name;
        tempEl.textContent=temp;
        uviEl.textContent=uvi;
        humidityEl.textContent=humidity;
        windEl.textContent=wind;
       // how do I get an icon to show?? 
        iconEl.appendContent=icon;

        // iconEl.lastElementChild=icon;

        //append the new elements to the sameDayLgDisplay
        sameDayLgDisplay.appendChild(card);
        sameDayLgDisplay.appendChild(cardBody);
        sameDayLgDisplay.appendChild(cardTitle);
        sameDayLgDisplay.appendChild(tempEl);
        sameDayLgDisplay.appendChild(uviEl);
        sameDayLgDisplay.appendChild(humidityEl);
        sameDayLgDisplay.appendChild(windEl);
        sameDayLgDisplay.appendChild(iconEl);

        console.log(card);


 });
}




searchForm.addEventListener('submit', handleFormSubmit)
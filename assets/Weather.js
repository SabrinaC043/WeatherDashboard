var apiKeyTemp = 'd91f911bcf2c0f925fb6535547a5ddc9' //temp apikey
var apiKey = '1865e03d2a2264f30eaea6c7bb36bae2'
var searchForm = document.getElementById('search-form');
var userInput = document.getElementById('userInput');
var sameDayLgDisplay = document.getElementById('sameDayLgDisplay');//does this one change at all upon click, it doesn't really say? 
var fiveDayForeCast = document.getElementById('fiveDayForecast'); // five day card container



function handleFormSubmit(e) {
    if (!userInput.value) {
        return;
    }
    e.preventDefault();
    fetchLatLon(userInput.value.trim())


}

function fetchLatLon(city) {
    var url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(url).then(function (res) {
        return res.json()
    }).then(function (data) {

        fetchOneCall(data)

    })
}

function fetchOneCall(coords) {
    var lat = coords[0].lat;
    var lon = coords[0].lon;
    var name = coords[0].name;
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&cnt=3&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKeyTemp;

    fetch(url).then(function (res) {
        return res.json()
    })
    .then(function (data) {
        // console.log(data);
        //     // traverse the data and create variables for all the content from the data
        var temp = data.current.temp;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var wind = data.current.wind_speed;
        var icon = data.current.weather[0].icon;
        // console.log(temp);
        // create all the new elements for the card to house all the info
        var card = document.createElement('div');
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h2');
        var tempEl = document.createElement('p');
        var uviEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        var windEl = document.createElement('p');
        var iconEl = document.createElement('img');
        // set attributes
        card.setAttribute('class', 'card mb-3');
        cardBody.setAttribute('class', 'card-body');
        cardTitle.setAttribute('class', 'card-title');
        tempEl.setAttribute('class', 'card-text');
        uviEl.setAttribute('class', 'card-text');
        humidityEl.setAttribute('class', 'card-text');
        windEl.setAttribute('class', 'card-text');
        iconEl.setAttribute('class', 'img');

        iconEl.src = 'http://openweathermap.org/img/wn/' + icon + '.png';
        cardTitle.textContent = name;
        tempEl.textContent = 'Temperature: ' + temp + '°F';
        uviEl.textContent = 'UV index: ' + uvi;
        humidityEl.textContent = 'Humidity:' + humidity + '%';
        windEl.textContent = 'Wind Speed:' + wind + 'MPH';

        sameDayLgDisplay.appendChild(card);
        sameDayLgDisplay.appendChild(cardBody);
        sameDayLgDisplay.appendChild(cardTitle);
        sameDayLgDisplay.appendChild(tempEl);
        sameDayLgDisplay.appendChild(uviEl);
        sameDayLgDisplay.appendChild(humidityEl);
        sameDayLgDisplay.appendChild(windEl);
        sameDayLgDisplay.appendChild(iconEl);

        var today= new Date();
        var date =today.getMonth()+1 + '/'+ today.getDate() + '/' + (today.getFullYear());
        
        
        // console.log(data);
        // console.log(today);
        var dailyTemp = data.daily[0].temp.day
        var humidityDaily = data.daily[0].humidity;
        var windDaily = data.daily[0].wind_speed;
        var iconDaily = data.daily[0].weather[0].icon;
        // console.log(iconDaily);
        // console.log(humidityDaily);
        //  console.log(windDaily);

        var cardDaily = document.createElement('div');
        var cardBodyDaily = document.createElement('div');
        var cardTitleDaily = document.createElement('h5');
        var dailyDateEl = document.createElement('p');
        var dailyTempEl = document.createElement('p');
        var humidityDailyEl = document.createElement('p');
        var windDailyEl = document.createElement('p');
        var iconDailyEl = document.createElement('img');

        cardDaily.setAttribute('class', 'card mb-2');
        cardBodyDaily.setAttribute('class', 'card-body');
        cardTitleDaily.setAttribute('class', 'card-text');
        dailyDateEl.setAttribute('class', 'card-text');
        dailyTempEl.setAttribute('class', 'card-text');
        windDailyEl.setAttribute('class', 'card-text');
        humidityDailyEl.setAttribute('class', 'card-text');
        iconDailyEl.setAttribute('class', 'img');
   
        
        cardTitleDaily.textContent = date;
        dailyTempEl.textContent = 'Temperature: ' + dailyTemp + '°F';
        windDailyEl.textContent = 'Wind Speed:' + windDaily + 'MPH';
        humidityDailyEl.textContent = 'Humidity:' + humidityDaily + '%';
        iconDailyEl.src = 'http://openweathermap.org/img/wn/' + iconDaily + '.png';

        fiveDayForeCast.appendChild(cardDaily);
        fiveDayForeCast.appendChild(cardBodyDaily);
        fiveDayForeCast.appendChild(cardTitleDaily);
        fiveDayForeCast.appendChild(dailyTempEl);
        fiveDayForeCast.appendChild(windDailyEl);
        fiveDayForeCast.appendChild(humidityDailyEl);
        fiveDayForeCast.appendChild(iconDailyEl);


       // button for history created-#1 

      var historyButton=document.createElement('button');
      searchHistory.setAttribute('class', 'btn btn-secondary');
      searchHistory.textContent='';
      searchForm.AppendChild(historyButton);
     




        
  }
    )};












// // localStorage.setItem('city')
searchForm.addEventListener('submit', handleFormSubmit)
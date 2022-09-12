var apiKeyTemp = 'd91f911bcf2c0f925fb6535547a5ddc9' //temp apikey
var apiKey = '1865e03d2a2264f30eaea6c7bb36bae2'
var searchForm = document.getElementById('search-form');
var userInput = document.getElementById('userInput');
var sameDayLgDisplay = document.getElementById('sameDayLgDisplay');//does this one change at all upon click, it doesn't really say? 
var fiveDayForeCast = document.getElementById('fiveDayForeCast'); // five day card container
const body= document.body 
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

            createCurrentWeatherCard(data, name)
            futureWeatherConditions(data)
            
        })
}

function createCurrentWeatherCard(data,name) {
    var temp = data.current.temp;
    var uvi = data.current.uvi;
    var humidity = data.current.humidity;
    var wind = data.current.wind_speed;
    var icon = data.current.weather[0].icon;
    var today = new Date();
    var formattedDate = today.toLocaleDateString();

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

    card.setAttribute('class', 'card col.row-mb-3-bg-color-primary');
    cardBody.setAttribute('class', 'card-body');
    cardTitle.setAttribute('class', 'card-title');
    tempEl.setAttribute('class', 'card-text');
    uviEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    iconEl.setAttribute('class', 'img');

    
    cardTitle.textContent = name + formattedDate;
    tempEl.textContent = 'Temperature: ' + temp + '°F';
    uviEl.textContent = 'UV index: ' + uvi;
    // if(uvi<=5){ 
    // }else if (uvi>=7){

    // } else{

    // }

    humidityEl.textContent = 'Humidity:' + humidity + '%';
    windEl.textContent = 'Wind Speed:' + wind + 'MPH';
    iconEl.src = 'http://openweathermap.org/img/wn/' + icon + '.png'

    sameDayLgDisplay.appendChild(card);
    sameDayLgDisplay.appendChild(cardBody);
    sameDayLgDisplay.appendChild(cardTitle);
    sameDayLgDisplay.appendChild(tempEl);
    sameDayLgDisplay.appendChild(uviEl);
    sameDayLgDisplay.appendChild(humidityEl);
    sameDayLgDisplay.appendChild(windEl);
    sameDayLgDisplay.appendChild(iconEl);
    
}
function futureWeatherConditions(data) {
    var daily = data.daily
    for (var i = 1; i < data.daily.length - 2; i++) {
         console.log(daily[i]);
        var today = new Date();
        var date = new Date();
        var future = new Date(date.setDate(today.getDate() + i));
        var formattedDate = future.toLocaleDateString();
        // var cardBorderEl = document.createElement('span');
        // console.log(iconDaily);
        var dailyTemp = daily[i].temp.day;
        var humidityDaily = daily[i].humidity;
        var windDaily = daily[i].wind_speed;
        var iconDaily = daily[i].weather[0].icon;

        var card = document.createElement('div')
        var cardBody = document.createElement('div');
        var cardTitle = document.createElement('h5');
        var dailyDate = document.createElement('p');
        var dailyTemp = document.createElement('p');
        var humidityDaily = document.createElement('p');
        var windDaily = document.createElement('p');
        var iconDaily = document.createElement('img');

        card.setAttribute('class', 'card col.row-mb-2.bg-primary');
        cardBody.setAttribute('class', 'card-body');
        cardTitle.setAttribute('class', 'card-text');
        dailyDate.setAttribute('class', 'card-text');
        dailyTemp.setAttribute('class', 'card-text');
        humidityDaily.setAttribute('class', 'card-text');
        windDaily.setAttribute('class', 'card-text');
        iconDaily.setAttribute('class', 'img');

        
        cardTitle.textContent = iconDaily+formattedDate;
        dailyTemp.textContent = 'Temperature: ' + dailyTemp + '°F';
        windDaily.textContent = 'Wind Speed:' + windDaily + 'MPH';
        humidityDaily.textContent = 'Humidity:' + humidityDaily + '%';
        iconDaily.src = 'http://openweathermap.org/img/wn/' + iconDaily + '.png';
         
        fiveDayForeCast.appendChild(card);
        fiveDayForeCast.appendChild(cardBody);
        cardBody.appendChild(dailyDate);
        cardBody.appendChild(dailyTemp);
        cardBody.appendChild(humidityDaily);
        cardBody.appendChild(windDaily);
        cardBody.appendChild(iconDaily);
        
    
    }

}


var searchHistory=document.getElementById('searchHistory');
var searchBtn=document.createElement('button')


searchHistory.setAttribute('class', 'row row-cols-md-2 g-4');
searchBtn=setAttribute('class', 'btn btn-secondary');
body.append(searchHistory)

searchHistory.addEventListener.on('click', function () {
var key=$(this).parent().attr('id');
var value =$(this).sibling().attr('button').val();
localStorage.setItem(key, value)
});

$('#searchHistory .btn').val(localStorage.getItem('btn'));

for (i=0; i < searchBtn.length; i++)
 { document.body.children[1];
searchBtn.textContent='userInput';
e.preventDefault();
}




searchForm.addEventListener('submit', handleFormSubmit)
searchHistory.addEventListener('click',function())
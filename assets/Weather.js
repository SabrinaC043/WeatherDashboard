
var searchButton = document.getElementById('search-button');
var largeWeatherCard = document.getElementById('sameDayLgDisplay');


function getApi() {

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=32.7831&lon=-96.7836&appid=a8032d6652322cc8dd1fcdb66cf0f2b8"

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++);
            var currentConditions = document.createElement('p');
            var futureConditions = document.createElement('p');


            currentConditions.textContent = data[i].weather.main.description.icon;
            futureConditions.textContent = data[i].weather.main.description.icon;

        });
}


searchButton.addEventListener('click', getApi);

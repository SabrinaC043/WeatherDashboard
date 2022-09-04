
var searchButton = document.getElementById('search-button');



function getApi() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=houston&appid=1554dda1921875abae39b08caa1f2b95";
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
          console.log('data');}
      
        //     for (var i=0; i<data.length; i++);
        //     var currentConditions= document.createElement('p');
        //     var futureConditions=document.createElement('p');

        //     currentConditions.textContent=data[i].weather.main.description.icon;
        //     futureConditions=textContent=data[i].weather.main.description.icon

        // })
)};



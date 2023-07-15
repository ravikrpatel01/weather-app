const apiKey = "70cdc9a9b24ce884c820870570beb0df";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

const searchBox = document.querySelector(".example input");
const searchBtn = document.querySelector(".example button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " KM/hr";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/cloudy-day.png";    
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

var input = document.getElementById("search-button");

input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
    checkWeather(searchBox.value);
  }
});
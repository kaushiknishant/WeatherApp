const api = {
    key: "aplhanumric string",
    base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if(event.keyCode == 13){
        getResults(searchbox.value);
        // console.log(searchbox.value)
    }
}


function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults)
    .catch((err) =>{
        alert('error in fetching data')
    })
} 

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}<span>&deg;C</span> / ${Math.round(weather.main.temp_max)}<span>&deg;C</span>`

}

function dateBuilder(dt) {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday"];

    let day = days[dt.getDay()];
    let date = dt.getDate();
    let month = months[dt.getMonth()]
    let year = dt.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
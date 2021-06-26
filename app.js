// api.openweathermap.org / data / 2.5 / weather ?q = { city name } & appid={ API key }

// Anonumous function call event listener after key press

const weatherApi = {
    key: "c2ccfd9d1c994c584962e12bbafbf022",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
}


const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {

    if (event.key == "Enter") {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

})

// Get weather report 

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`).then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
// show report in


function showWeatherReport(weather) {
    // console.log(weather);  Seeing JSON FILE IN CONSOLE

    // changing Country

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    // Changing Temp 
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    // min-max Tempd
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;


    let weatherType = document.getElementById('weather');
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let windSpeed = document.getElementById('wind');
    windSpeed.innerHTML = `Wind Speed: ${weather.wind.speed}`;
    let humidity = document.getElementById('humid');
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    document.getElementById('image').setAttribute('src', `https://www.countryflags.io/${weather.sys.country}/shiny/64.png`)


    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";

    } else if (weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    } else if (weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";

    } else if (weatherType.textContent == 'Rain') {

        document.body.style.backgroundImage = "url('images/rain.jpg')";

    } else if (weatherType.textContent == 'Snow') {

        document.body.style.backgroundImage = "url('images/snow.jpg')";

    } else if (weatherType.textContent == 'Thunderstorm') {

        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";

    }
}

// date manage

function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;


}
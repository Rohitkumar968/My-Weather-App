const apiKey = "b76261fb3197c2d7aa2b0c6681507c9f";

/* Search Weather by City */
async function searchWeather() {
    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        showWeather(data);
        getForecast(data.coord.lat, data.coord.lon);

    } catch (error) {
        alert("Something went wrong");
        console.log(error);
    }
}

/* Show Current Weather */
function showWeather(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById("desc").innerText = data.weather[0].main;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("pressure").innerText = data.main.pressure;
    document.getElementById("feels-like").innerText = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
}

/* Get 5 Day Forecast */
async function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        let forecast = document.getElementById("forecast");
        forecast.innerHTML = "";

        for (let i = 0; i < 5; i++) {
            let item = data.list[i * 8];

            forecast.innerHTML += `
                <div class="day">
                    <p>${item.dt_txt.split(" ")[0]}</p>
                    <p>${Math.round(item.main.temp)}°C</p>
                    <p>${item.weather[0].main}</p>
                </div>
            `;
        }

    } catch (error) {
        console.log(error);
    }
}

/* Weather by Current Location */
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            showWeather(data);
            getForecast(lat, lon);

        } catch (error) {
            alert("Location fetch failed");
            console.log(error);
        }
    });
}

/* Dark Mode Toggle */
function toggleMode() {
    document.body.classList.toggle("dark");
}
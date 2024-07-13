const apiKey = '76d1f375f8ba59c815680b9fa2ab9201';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.querySelector('.cityName');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.windSpeed');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            getWeather(city);
        } else {
            alert('Please enter a city name');
        }
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.innerHTML = `Температура: <span>${data.main.temp}°C</span>`;
    description.innerHTML = `Описание: <span>${data.weather[0].description}</span>`;
    humidity.innerHTML = `Влажность: <span>${data.main.humidity}%</span>`;
    windSpeed.innerHTML = `Скорость Ветра: <span>${data.wind.speed} m/s</span>`;
}

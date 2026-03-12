const city = 'Bishkek';
const timezone = 'Asia';
const latitude = 42.877;
const longitude = 74.610;

const temperatureHTML = document.getElementById('temperature');
const isDayHTML = document.getElementById('isDay');
const cordsHTML = document.getElementById('cords');
const cityHTML = document.getElementById('city');
const loadingHTML = document.getElementById('loadingCircle');


fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day,temperature_2m,rain,showers,snowfall,relative_humidity_2m,wind_speed_10m&timezone=${timezone}%2F${city}&timeformat=unixtime`)
.then(response => response.json())
.then(data => {
        console.log(data)
        console.log(data.current)
        console.log(data.current.is_day)
        console.log(data.current.temperature_2m)

        loadingHTML.classList.remove('loading-circle')

        cityHTML.innerText = ` ${city}`
        cordsHTML.innerText = `cords: ${latitude}, ${longitude}`
        isDayHTML.innerText = `${data.current.is_day == 1 ? 'Day' : 'Night'}`
        temperatureHTML.innerText = `${data.current.temperature_2m}°C`
})
const city = 'Bishkek';
const timezone = 'Asia';
const latitude = 42.877;
const longitude = 74.610;

const temperatureHTML = document.getElementById('temperature');
const isDayHTML = document.getElementById('isDay');
const cordsHTML = document.getElementById('cords');
const cityHTML = document.getElementById('city');
const loadingHTML = document.getElementById('loadingCircle');

/*
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day`)
.then(response => response.json())
.then(data => {
        console.log(data)
        // console.log(data.current)
        // console.log(data.current.is_day)
        // console.log(data.current.temperature_2m)



        cityHTML.innerText = ` ${city}`
        cordsHTML.innerText = `cords: ${latitude}, ${longitude}`
        isDayHTML.innerText = `${data.current.is_day == 1 ? 'Day' : 'Night'}`
        temperatureHTML.innerText = `${data.current.temperature_2m}°C`
        },
        (error) => {
                cityHTML.innerText = ` ${error}`
                cityHTML.style = 'color: red;'
        }
)
.finally(() => loadingHTML.classList.remove('loading-circle')) */


async function showWeather() {
        try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day`);
                const infoWeather = await response.json();

                console.log(infoWeather)

                cityHTML.innerText = ` ${city}`
                cordsHTML.innerText = `cords: ${latitude}, ${longitude}`
                isDayHTML.innerText = `${infoWeather.current.is_day == 1 ? 'Day' : 'Night'}`
                temperatureHTML.innerText = `${infoWeather.current.temperature_2m}°C`
        } catch(error) {
                cityHTML.innerText = ` ${error}`
                cityHTML.style = 'color: red;'
        } finally {
                loadingHTML.classList.remove('loading-circle')
        }
}


showWeather()
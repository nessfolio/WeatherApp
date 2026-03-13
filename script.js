// let city;
// let latitude;
// let longitude;

const temperatureHTML = document.getElementById('temperature');
const isDayHTML = document.getElementById('isDay');
const cordsHTML = document.getElementById('cords');
const cityHTML = document.getElementById('city');
const loadingHTML = document.getElementById('loadingCircle');
const formHTML = document.getElementById('form');
const inputHTML = document.getElementById('input');

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

getCord('Bishkek')
        .then((arr) => showWeather(arr))




formHTML.addEventListener('submit', (event) => {
        event.preventDefault();

        let inputValue = inputHTML.value 
        
        getCord(`${inputValue}`)
                .then((arr) => showWeather(arr))
})

async function getCord(city) {
        try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
                const cords = await response.json()
                console.log(cords)
                console.log(cords[0].lat)
                console.log(cords[0].lon)
                console.log(cords[0].display_name)
        
                let cityName = cords[0].display_name;
                let latitude = cords[0].lat;
                let longitude = cords[0].lon;
        
                return [cityName, latitude, longitude]
        } catch(error) {
                cityHTML.innerText = ` ${error}`
                cityHTML.style = 'color: red;'
        } finally {
                loadingHTML.classList.remove('loading-circle')
        }
}


async function showWeather(array) {
        try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${array[1]}&longitude=${array[2]}&hourly=temperature_2m&current=temperature_2m,is_day&forecast_days=16`);
                const infoWeather = await response.json();

                console.log(infoWeather)

                cityHTML.innerText = ` ${array[0]}`
                cityHTML.style = 'color: #fff;'
                cordsHTML.innerText = `cords: ${array[1]}, ${array[2]}`
                isDayHTML.innerText = `${infoWeather.current.is_day == 1 ? 'Day' : 'Night'}`
                temperatureHTML.innerText = `${infoWeather.current.temperature_2m}°C`
        } catch(error) {
                cityHTML.innerText = ` ${error}`
                cityHTML.style = 'color: red;'
        } finally {
                loadingHTML.classList.remove('loading-circle')
        }
}
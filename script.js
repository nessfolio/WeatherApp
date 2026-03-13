const temperatureHTML = document.getElementById('temperature');
const isDayHTML = document.getElementById('isDay');
const cordsHTML = document.getElementById('cords');
const cityHTML = document.getElementById('city');
const loadingHTML = document.getElementById('loadingCircle');
const formHTML = document.getElementById('form');
const inputHTML = document.getElementById('input');


getCord('Bishkek')
        .then((arr) => showWeather(arr))


formHTML.addEventListener('submit', (event) => {
        event.preventDefault();

        let inputValue = inputHTML.value 

        cityHTML.innerText = ``
        cordsHTML.innerText = ``
        isDayHTML.innerText = ``
        temperatureHTML.innerText = ``

        loadingHTML.classList.add('loading-circle')
        
        getCord(`${inputValue}`)
                .then((arr) => {
                        if (arr) {
                                showWeather(arr)
                        }
                })
})

async function getCord(city) {
        try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
                const cords = await response.json()
                if(cords.length === 0) throw new Error('Location not found')
                console.log(cords)
                console.log(cords[0].lat)
                console.log(cords[0].lon)
                console.log(cords[0].display_name)
        
                let cityName = cords[0].display_name;
                let latitude = cords[0].lat;
                let longitude = cords[0].lon;
        
                return [cityName, latitude, longitude]
        } catch(error) {
                cityHTML.innerText = `${error}`;
                cityHTML.style = 'color: red;';
        } finally {
                inputHTML.value = '';
                loadingHTML.classList.remove('loading-circle');
        }
}


async function showWeather([cityName, latitude, longitude]) {
        try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day&forecast_days=16`);
                const infoWeather = await response.json();

                console.log(infoWeather)

                cityHTML.innerText = ` ${cityName}`
                cityHTML.style = 'color: #fff;'
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
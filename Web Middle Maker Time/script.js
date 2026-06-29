const city = document.getElementById("entering");
const btnf = document.getElementById("btn");
const imag = document.getElementById("img")

const tempy = document.querySelector(".tem")
const snowy = document.querySelector(".snow")
const windy = document.querySelector(".wind")
const dayy = document.querySelector(".day")

btnf.addEventListener("click", async function () {

    const URL = `https://api.weatherapi.com/v1/forecast.json?key=c9005cee47614db8a80172847260906&q=${city.value}&days=3&aqi=no&alerts=no`
    try {
        let container = document.getElementById("imp")
        container.innerHTML = ''
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }
        const data = await response.json();
        const forecastDays = data.forecast.forecastday;
        console.log(`Прогноз температури для міста ${data.location.name}`);

        forecastDays.forEach(day => {
            const now = day.date;
            const temp = day.day.avgtemp_c;
            const wind = day.day.maxwind_kph;
            const snow = day.day.totalsnow_cm;
            const code = day.day.condition.code;
            
            container.innerHTML += `
                    <div>
                        <div id="naad">
                            <p class="day">День: ${now}</p>
                            <p class="tem">Температура: ${temp}°C</p>
                            <p class="wind">Швидкість вітру: ${wind} км/год</p>
                            <p class="snow">Рівень снігу: ${snow} см</p>
                            <img id="img" src="http:${day.day.condition.icon}">
                        </div>
                    </div>
            `
            console.log(`Дата: ${now} | Температура: ${temp}°C | Вітер: ${wind}°C) | Сніг: ${snow}см | Код: ${code};`);
        })
    } catch (error) {
        console.error("Не вдалося отримати дані:", error);
        alert("Не вдалося отримати дані")
    }
});


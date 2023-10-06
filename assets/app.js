var input = document.querySelector('input');
var key = document.querySelector('.ser');
var status = document.getElementById('meteo');
const name = document.getElementById('name');
const degree = document.getElementById('degree');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');

async function Get_Data(city) {
	const API = "c40efb3e7eb11fcda1990f0825583ede";
	const URL = "https://api.openweathermap.org/data/2.5/weather?q="
	if (city == "")
		return ; 
	var response = await fetch(URL + city + `&appid=${API}&units=metric`);
	if (response.ok) {
		var Data = await response.json();
		name.innerHTML = Data.name;
		degree.innerHTML = Math.round(Data.main.temp) + " °C";
		humidity.innerHTML = "Humidity : " + Data.main.humidity + "%";
		speed.innerHTML = "Speed : " + Data.wind.speed  + " km/h";
		document.getElementById('meteo').style.scale = "1";
		document.querySelector('.met').style.scale = "1";
		document.querySelector('.map').style.scale = "1";
		console.log(Data);
	}
	else {
		document.getElementById('meteo').style.scale = "0";
		document.querySelector('.met').style.scale = "0";
		document.querySelector('.map').style.scale = "0";
	}
}

input.addEventListener('keydown', function(event) {
	if (event.key == "Enter")
		Get_Data(input.value);
});
key.addEventListener('click', () => {
	Get_Data(input.value);
});
var input = document.querySelector('input');
var key = document.querySelector('.ser');
const degree = document.getElementById('degree');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');
const d = document.getElementById('map');

var map = L.map(d).setView([51.505, -0.09], 13);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

function apply(response, Data) {
	if (response.ok) {
		document.getElementById('name').textContent = Data.name;
		degree.textContent = Math.round(Data.main.temp) + " °C";
		humidity.textContent = "Humidity : " + Data.main.humidity + "%";
		speed.textContent = "Speed : " + Data.wind.speed  + " km/h";
		document.getElementById('meteo').style.scale = "1";
		document.querySelector('.met').style.scale = "1";
		document.querySelector('.map').style.scale = "1";
	}
	else {
		document.getElementById('meteo').style.scale = "0";
		document.querySelector('.met').style.scale = "0";
		document.querySelector('.map').style.scale = "0";
		document.querySelector('.search input').value = "";
	}
}

async function Get_Data(city) {
	const API = "c40efb3e7eb11fcda1990f0825583ede";
	const URL = "https://api.openweathermap.org/data/2.5/weather?q="
	
	if (city == "")
		return ;

	const API_K = "Olt9fTDvHNpM3Uqdvoxrg9FADNRNSpFSJCNbVVpdDbpT3jkQMmC72Jdd";
	const URL_K = "https://api.pexels.com/v1/search?query=";

	const _resp = await fetch(URL_K + city ,{
		headers: {
			Authorization: API_K
		}
	})
	var response = await fetch(URL + city + `&appid=${API}&units=metric`);
	var Data = await response.json();
	apply(response, Data);
	const data_ = await _resp.json();
	let ran = Math.floor(Math.random() * 15);
	if (data_.photos[ran])
		document.getElementById('meteo').style.background = `url(${data_.photos[ran].src.landscape})`
	else
		document.getElementById('meteo').style.background = `url(${data_.photos[0].src.landscape})`
}

input.addEventListener('keydown', function(event) {
	if (event.key == "Enter")
		Get_Data(input.value);
});

key.addEventListener('click', () => {
	Get_Data(input.value);
});
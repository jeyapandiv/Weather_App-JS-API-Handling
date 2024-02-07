'use strict'

let cityNameDisplay = document.querySelector(".cityNameDis");
let weatherDisplay = document.querySelector(".weatherDis");
let errorDis = document.querySelector(".error");
let imageDIsplay = document.querySelector(".flipImage").firstElementChild;
let tempDisplay = document.querySelector(".tempDiv").lastElementChild;
let windDisplay = document.querySelector(".windDiv").lastElementChild;
let humidityDisplay = document.querySelector(".humidityDiv").lastElementChild;

weatherDisplay.classList.add("disnone", "bcImage");
errorDis.classList.add("errorDis");
errorDis.classList.remove("displayNone");

let apiKey = "d28adbe4f2a422e20f49deba73a8594e";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=";
let unit = "metric";

function toggle(btn) {
    if (btn.id == "metric") {
        btn.classList.remove("toggleBtn");
        btn.nextElementSibling.classList.add("toggleBtn");
    } else {
        btn.classList.remove("toggleBtn");
        btn.previousElementSibling.classList.add("toggleBtn");
    }
    unit = btn.id;
}

function search(icon) {
    weatherDisplay.classList.remove("disnone", "bcImage");
    errorDis.classList.remove("errorDis");
    errorDis.classList.add("displayNone");

    let cityNameInpt = icon.previousElementSibling;
    let cityName = cityNameInpt.value;
    cityNameDisplay.innerHTML = cityName;

    fetch(`${apiUrl}${unit}&appid=${apiKey}&q=${cityName}`)
        .then(response => response.json())
        .then(data => {
            let temp = data.main.temp;
            if (unit == "metric") {
                tempDisplay.innerHTML = ` ${temp} &#8451;`

                if (temp < 20) {
                    backround("Bg-3.png","linearThree","linerOne", "linearTwo");
                } else if (temp >= 20 && temp <= 25) {
                    backround("Bg-2.png","linearTwo","linerOne", "linearThree");
                } else {
                    backround("Bg-1.png","linearOne","linearTwo", "linearThree");
                }
                temp = 0;
            } else {
                tempDisplay.innerHTML = ` ${temp} &#8457;`

                if (temp < 68) {
                    backround("Bg-3.png","linearThree","linerOne", "linearTwo");
                } else if (temp >= 68 && temp <= 77) {
                    backround("Bg-2.png","linearTwo","linerOne", "linearThree");
                } else {
                    backround("Bg-1.png","linearOne","linearTwo", "linearThree");
                }
                temp = 0;
            }
            
            humidityDisplay.innerHTML = ` ${data.main.humidity} %`
            windDisplay.innerHTML = ` ${data.wind.speed} kmph`

            function backround(bcImg,clsAdd,clsRemove1,clsRemove2) {
                imageDIsplay.src = bcImg;
                weatherDisplay.classList.add(clsAdd);
                weatherDisplay.classList.remove(clsRemove1, clsRemove2);
            }
        })
        .catch(error => {
            console.log(error);
        })
    cityNameInpt.value = '';
}
















let city = ""; //temporary prefilling city
const userInput = document.getElementById('city');
const info = document.getElementById('info');
const inputError = document.getElementById('inputError');


userInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        inputError.innerHTML="";
        info.innerHTML="";
        city = userInput.value;
        loadWeather(city)
            .then(weather => {
                if (weather.ok) {
                    displayWeather(weather);
                } else if (weather.status === 404) {
                    inputError.innerHTML="";
                    inputError.append('Error, city not found. Please enter in the form of "City", "City, State" or "City, Country".');
                    return;
                } else {
                    console.log("Some other error");
                    inputError.innerHTML="";
                    inputError.append('Error, city not found. Please enter in the form of "City", "City, State" or "City, Country".');

                    return Promise.reject;
                }
            })
    }
});


const loadWeather = async function (city) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1ad2dcac3f65222827c21db5d338f53&units=metric`)
        return response;
    }
    catch (error) {
        console.log(error);
        inputError.innerHTML="";
        inputError.append('Error, city not found. Please enter in the form of "City", "City, State" or "City, Country".');
    }

}

const displayWeather = function (weather) {
    //record relevant weather stats in DOM
    weather.json().then(data => {
        info.innerHTML="";
        info.append(`City: ${data.name}`);
        info.append(` Current temp (C): ${data.main.temp}`);
    })
}




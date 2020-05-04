export const fetchCurrWeather = function () {
    var key = 'cfa60c427275f8728cc2d1a469c4edb2';
    //KGTODO: make this variable
    var city = 'Revelstoke'
    return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
        .then(function (response) { return response.json() })
}
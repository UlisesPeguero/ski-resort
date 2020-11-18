$(function() {
    var now = new Date();
    $('#weather-time-date').html(
        new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        } ).format(now));
    $.get({
        url: 'https://api.openweathermap.org/data/2.5/onecall?lat=39.74&lon=-104.98',
        data: {
            lat: 39.74,
            lon: -104.98,
            exclude: 'daily,minutely,hourly',
            units:'imperial',
            appid: '74070c0135be6c40c7665b1a5ecd1f31'
        },
        dataType: 'JSON'        
    }).done(function(data) {
        data = data.current;
        console.log(data);
        $('#weather-location').text("Denver, Colorado");
        $('#weather-temperature').text(data.temp + '°F');
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
        $('#weather-feel').text('Feels like ' + 
                                data.feels_like + '°F. ' + 
                                data.weather[0].description.charAt(0).toUpperCase() + 
                                data.weather[0].description.slice(1));
        $('#weather-wind-speed').append(data.wind_speed);

    });
});
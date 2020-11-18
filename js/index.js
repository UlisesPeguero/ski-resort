// fake list of events
var events =
{
    "monthly": [
        {
            "id": 1,
            "name": "Ski for kids",
            "startdate": "2020-11-15",
            "enddate": "2020-11-18",
            "starttime": "12:00",
            "endtime": "14:00",
            "class": "bg-primary",
            "url": ""
        }, {
            "id": 2,
            "name": "Sleight race",
            "startdate": "2020-11-17",
            "enddate": "",
            "starttime": "14:00",
            "endtime": "16:00",
            "class": "bg-success",
            "url": ""
        }, {
            "id": 3,
            "name": "Snowboard competition",
            "startdate": "2020-11-22",
            "enddate": "",
            "starttime": "11:00",
            "endtime": "15:00",
            "class": "bg-secondaryt",
            "url": ""
        }, {
            "id": 4,
            "name": "Ski classes",
            "startdate": "2020-11-01",
            "enddate": "2020-11-30",
            "starttime": "10:00",
            "endtime": "12:00",
            "class": "bg-info",
            "url": ""
        }
        
    ]
};


$(function() {
    // call openweather api
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
        $('#weather-location').text("Denver, Colorado");
        $('#weather-temperature').text(Math.round(data.temp) + '°F');
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
        $('#weather-feel').text('Feels like ' + 
                                data.feels_like + '°F. ' + 
                                data.weather[0].description.charAt(0).toUpperCase() + 
                                data.weather[0].description.slice(1));
        $('#weather-wind-speed').append('<strong>' + data.wind_speed + '</strong>mph');
        $('#weather-wind-direction').css({
            transform: 'rotate(' + data.wind_deg + 'deg)'
        });
        $('#weather-pressure').append('<strong>' + data.pressure + '</strong>hPa');
        $('#weather-humidity').append('<strong>' + data.humidity + '</strong>%');
        $('#weather-uv').append('<strong>' + data.uvi);
        $('#weather-dew').append('<strong>' + Math.round(data.dew_point) + '</strong>°F');
        $('#weather-visibility').append('<strong>' + data.visibility/1000 + '</strong>Miles');
    });

    // initialize monthly plugin
    $('#calendar-events').monthly({
        mode: 'event',
        dataType: 'json',
        events: events
    });
});
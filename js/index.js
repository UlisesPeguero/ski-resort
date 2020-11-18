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
    // get the moment of the api request
    $('#weather-time-date').html(
        new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        } ).format(now));
    // make ajax.get request for Denver, Colorado
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
        // parse success data into weather layout
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

    // news feed control
    var activeIndex = 0;
    var newsCount = $('.news-item').length;

    function setActiveNews(index, btn, evt) {
        if(index > newsCount - 1) {
            index = newsCount - 1;
        } else if(index < 0) {
            index = 0;
        }
        activeIndex = index;
        // remove focus from button
        btn.blur();
        // prevent <a> to refresh the page
        evt.preventDefault();
        // update the classes 
        $('.news-item').removeClass('active');
        $('.news-item[data=' + index + ']').addClass('active');        
        if(index === newsCount - 1) {
            $('.page-item.old').addClass('disabled');
            $('.page-item.new').removeClass('disabled');
        } else if(index === 0) {
            $('.page-item.old').removeClass('disabled');
            $('.page-item.new').addClass('disabled');
        }
    }

    $('#btn-oldest-news').click(function(evt) {
        setActiveNews(newsCount - 1, $(this), evt);        
    });  
    $('#btn-newest-news').click(function(evt) {
        setActiveNews(0, $(this), evt);       
    });  
    $('#btn-older-news').click(function(evt) {
        setActiveNews(activeIndex + 1, $(this), evt);        
    });
    $('#btn-newer-news').click(function(evt) {
        setActiveNews(activeIndex - 1, $(this), evt);        
    });
});
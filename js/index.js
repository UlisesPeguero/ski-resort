
$(function() {    
    // determinate cardinal wind direction
    function cardinalWindDirection(deg) {
        // (deg < value ) = key
        var cardinalDirections = {
            N: 11.25,
            NNE: 33.75,
            NE: 56.25,
            ENE: 78.75,
            E: 101.25,
            ESE: 123.75,
            SE: 146.25,
            SSE: 168.75,
            S: 191.25,
            SSW: 213.75,
            SW: 236.25,
            WSW: 258.75,
            W: 281.25,
            WNW: 303.75,
            NW: 326.25,
            NNW: 348.75
        };
        for(var key in cardinalDirections) {
            if(deg < cardinalDirections[key]) {                
                return key;
            }
        }
        // N >= 348.75  < 11.25
        return 'N';
    }
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
    // display weather values
    function displayWeather(data){
        $('#weather-location').text("Denver, Colorado");        
        $('#weather-temperature').text(Math.round(data.temp) + '°F');
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');
        $('#weather-feel').text('Feels like ' + 
                                data.feels_like + '°F. ' + 
                                data.weather[0].description.charAt(0).toUpperCase() + 
                                data.weather[0].description.slice(1));
        $('#weather-wind-speed').append('<strong>' + data.wind_speed + '</strong>mph' + ' <strong>' + cardinalWindDirection(data.wind_deg) + '</strong>');
        $('#weather-wind-direction').css({
            transform: 'rotate(' + (270 - data.wind_deg) + 'deg)'
        });
        $('#weather-pressure').append('<strong>' + data.pressure + '</strong>hPa');
        $('#weather-humidity').append('<strong>' + data.humidity + '</strong>%');
        $('#weather-uv').append('<strong>' + data.uvi);
        $('#weather-dew').append('<strong>' + Math.round(data.dew_point) + '</strong>°F');
        $('#weather-visibility').append('<strong>' + data.visibility/1000 + '</strong>Miles');
        // switch spinner with information
        $('.weather-spinner').hide();
        $('#weather-container').show();    
    }
    // make ajax.get request for Denver, Colorado        
    $.get({
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        data: {
            lat: 39.74,
            lon: -104.98,
            exclude: 'daily,minutely,hourly',
            units:'imperial',
            appid: 'c51dbc9484cdacaff7e6217b8836e64f'
        },
        dataType: 'JSON'        
    }).done(function(data) {
        // parse success data into weather layout
        data = data.current;
        displayWeather(data);   
    }).fail(function(event){
        // send back-up object if the API denies access due GitHub
        displayWeather({
            dew_point: 8.51,
            feels_like: 28.53,
            Humidity: 25,
            pressure: 1030,
            temp: 38.46,
            uvi: 2.31,
            visibility: 10000,
            weather: [
                {
                    main: "Clouds", 
                    description: "few clouds",
                    icon: "02d"
                }
            ],
            wind_deg: 100,
            wind_speed: 6.93
        });
    });    

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
                "class": "event-0",
                "url": ""
            }, {
                "id": 2,
                "name": "Sleight race",
                "startdate": "2020-11-17",
                "enddate": "",
                "starttime": "14:00",
                "endtime": "16:00",
                "class": "event-1",
                "url": ""
            }, {
                "id": 3,
                "name": "Snowboard competition",
                "startdate": "2020-11-22",
                "enddate": "",
                "starttime": "11:00",
                "endtime": "15:00",
                "class": "event-2",
                "url": ""
            }, {
                "id": 4,
                "name": "Ski classes",
                "startdate": "2020-11-01",
                "enddate": "2020-11-30",
                "starttime": "10:00",
                "endtime": "12:00",
                "class": "event-3",
                "url": ""
            }
            
        ]
    };
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
        } else {
            $('.page-item.old').removeClass('disabled');
            $('.page-item.new').removeClass('disabled');
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

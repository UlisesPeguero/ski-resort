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
            "color": "#DDDDDD",
            "url": ""
        }, {
            "id": 2,
            "name": "Sleight race",
            "startdate": "2020-11-17",
            "enddate": "",
            "starttime": "14:00",
            "endtime": "16:00",
            "color": "#BBBBBB",
            "url": ""
        }
    ]
};


$(function() {
    // initialize monthly plugin
    $('#calendar-events').monthly({
        mode: 'event',
        dataType: 'json',
        events: events
    });
});
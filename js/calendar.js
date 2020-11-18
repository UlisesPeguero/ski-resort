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
    // initialize monthly plugin
    $('#calendar-events').monthly({
        mode: 'event',
        dataType: 'json',
        events: events
    });
});
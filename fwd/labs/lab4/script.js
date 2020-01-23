 console.log("javascript linked!");
 var latlon;
 var address = "505 27th Way, Boulder, CO";
 var travelMode;
 var map;
 var polygonLayer;
 var lat;
 var lon;

 $(document).ready(function() {

    $('#show').click(geocodeMe);
    map = L.map('map');
    r360.basemap({ style: 'basic', apikey: 'B80PPKFJNMRVS5L830GU92964375' }).addTo(map);
     // create the layer to add the polygons
    polygonLayer = r360.leafletPolygonLayer().addTo(map);
    
});

 function geocodeMe() {
    address = $('#address').val();
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
        console.log("geocoding");
        if (status == 'OK') {
            console.log('geocode success');
            lat = results[0].geometry.location.lat();
            lon = results[0].geometry.location.lng();
            latlon = [lat, lon];
            console.log(latlon);
            showMap();
            getWeather();

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
  });
    travelMode = $('input[name=travelType]:checked').val();

}

function showMap() {
    console.log("show map"); 

    map.setView(latlon);
    // create the marker and add it to the map
    var marker = L.marker((latlon)).addTo(map);

   

    // you need to define some options for the polygon service
    // for more travel options check out the other tutorials
    var travelOptions = r360.travelOptions();
    // please contact us and request your own key if you don't already have one
    travelOptions.setServiceKey('B80PPKFJNMRVS5L830GU92964375');
    // set the service url for your area
    travelOptions.setServiceUrl('https://api.targomo.com/northamerica/');
    // we only have one source which is the marker we just added
    travelOptions.addSource(marker);
    // we want to have polygons for 10 to 30 minutes
    travelOptions.setTravelTimes([600, 1200, 1800]);
    // go by foot
    travelOptions.setTravelType(travelMode);
    polygonLayer.setColors([{
      'time': 600,
      'color': '#00A676'
    }, {
      'time': 1200,
      'color': '#B1DDF1'
    }, {
      'time': 1800,
      'color': '#BF4342'
    }, ]);

    // call the r360°- service
    r360.PolygonService.getTravelTimePolygons(travelOptions, function(polygons){
        // add the returned polygons to the polygon layer
        // and zoom the map to fit the polygons perfectly
        polygonLayer.clearAndAddLayers(polygons, true);
    });
}

function getWeather() {
    //get search value

  //set search parameters
  var params = {
    lat: lat,
    lon: lon,
    APPID: "28c30c6aa8580230acd193fd23a82e3d"
  }

  //url for search
  var url = 'http://api.openweathermap.org/data/2.5/weather';

  //get JSON results
  $.getJSON(url, params, showWeather);
}

function showWeather(response) {
    console.log(response);

    var tempK = response.main.temp;
    //convert to farenheit
    var tempF = (tempK - 273.15) * (9/5) + 32;
    $("#temp").text("Current Temperature(F): " + tempF);
    $("#conditions").text("Conditions: " + response.weather[0].description);
}




var map;
function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(38.893952, -77.029613)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  setMarkers(mapModel.markers);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;


var mapModel = {
    markers: [
        {   
        title: "Thomas Jefferson Memorial",
        lat: 38.881004, 
        lng: -77.036463,
        map: map,
        contentString: "<p>Blah blah blah blah blah</p>"
        },
        {   
        title: "Lincoln Memorial",
        lat: 38.889269, 
        lng: -77.050176,
        map: map,
        },
        {   
        title: "Washington Monument",
        lat: 38.889484, 
        lng: -77.0363733,
        map: map,
        },
        {   
        title: "United States Capital",
        lat: 38.889939, 
        lng: -77.00905,
        map: map,
        },
        {
        title: "United States White House",
        lat: 38.8989013, 
        lng: -77.0324048,
        map: map,
        },
        {   
        title: "National WWII Memorial",
        lat: 38.889443, 
        lng: -77.040556,
        map: map,
        }   
    ]
}

function setMarkers(location) {
    for(i=0; i<location.length; i++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title  
        });
        var infowindow = new google.maps.InfoWindow({
            content: mapModel.markers[i].contentString
        });

        new google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }
};

// function infoWindow(location) {
//     for(i=0; i<location.length; i++) {
//         var marker = new google.maps.Marker({
//           position: new google.maps.LatLng(location[i].lat, location[i].lng),
//           map: map,
//           title: location[i].title  
//         });
//     }
// };
// function setMarkers (map, location) {
//     var image = {
//         url: "img/location-marker.png",
//         size: new google.maps.Size(20, 32),
//         origin: new google.maps.Point(0,0),
//         anchor: new google.maps.Point(0, 32)
//     };

//     var shape = {
//       coords: [1, 1, 1, 20, 18, 20, 18 , 1],
//       type: 'poly'
//   };

// for (var i = 0; i < location.length; i++) {
//     var loc = location[i];
//     var myLatLng = new google.maps.LatLng(38.8871923, -77.0213326);
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         icon: image,
//         shape: shape,
//         title: mapModel.markers[i].title
//     });
// }
// };





// google.maps.event.addDomListener(window, 'load', initialize);




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

//Holds the different street view images for each marker
var flickrPicArray = [];    

var mapModel = {
    markers: [
        {   
        title: "The Thomas Jefferson Memorial",
        lat: 38.881004, 
        lng: -77.036463,
        map: map,
        streetAddress: "701 East Basin SW",
        cityAddress: "Washington, DC 20242"
        },
        {   
        title: "The Lincoln Memorial",
        lat: 38.889269, 
        lng: -77.050176,
        map: map,
        streetAddress: "2 Lincoln Memorial Cir",
        cityAddress: "Washington, DC 20037"
        },
        {   
        title: "The Washington Monument",
        lat: 38.889484, 
        lng: -77.0363733,
        map: map,
        streetAddress: "2 15th St NW",
        cityAddress: "Washington, DC 20007"
        },
        {   
        title: "The United States Capital",
        lat: 38.889939, 
        lng: -77.00905,
        map: map,
        streetAddress: "East Capitol St NE & First St SE",
        cityAddress: "Washington, DC 20004"
        },
        {
        title: "The White House",
        lat: 38.8989013, 
        lng: -77.0324048,
        map: map,
        streetAddress: "1600 Pennsylvania Ave NW SW",
        cityAddress: "Washington, DC 20500"
        },
        {   
        title: "The National WWII Memorial",
        lat: 38.889443, 
        lng: -77.040556,
        map: map,
        streetAddress: "1750 Independence Ave SW",
        cityAddress: "Washington, DC 20006"
        }   
    ]
}

function setMarkers(location) {
    var markers = new Array();
    for(i=0; i<location.length; i++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title  
        });

        var flickrPicSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5a0f379fef5e197fc8e6dbcc7a4e444d&text=" + 
                              mapModel.markers[i].title.replace(/ /g, "+") + 
                              "&accuracy=16&content_type=1&lat=" + 
                              mapModel.markers[i].lat + "&lon=" + 
                              mapModel.markers[i].lng + 
                              "&format=json&nojsoncallback=1";
        var x = 0;
        $.getJSON(flickrPicSearch, function (data) {
            for(x in data.photos.photo) {
                var image = data.photos.photo;
                var location = mapModel.markers;
                flickrPicArray.push(image[x]); //Captures all json data for each location search
            // var randomPic = Math.floor((Math.random() * image.length -1) + 1);
            // location[x].contentString = '<img src="http://farm' + image[randomPic].farm + '.static.flickr.com/' + image[randomPic].server + '/' + image[randomPic].id +'_' + image[randomPic].secret + '_m.jpg"><p>' + mapModel.markers[x].streetAddress + '<br>' + mapModel.markers[x].cityAddress + '</p>';
            };
        });

        location[i].contentString = '<p>' + mapModel.markers[i].streetAddress + '<br>' + mapModel.markers[i].cityAddress + '</p>';

        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
            content: mapModel.markers[i].contentString
        });

        new google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
          }
            
        })(marker, i));

        // var $li = $("li");
        // var searchNavElement = $(".nav")[i].attr("id", '"' + location[i].title.replace(/ /g, "-") + '"');

        searchNavElement.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
          }
            
        })(marker, i));
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

//'<img src="http://farm' + image[randomPic].farm + '.static.flickr.com/' + image[randomPic].server + '/' + image[randomPic].id +'_' + image[randomPic].secret + '_m.jpg">'

//google.maps.event.addDomListener(window, 'load', initialize);


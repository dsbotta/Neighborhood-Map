var map;
var markersArray = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
      '&signed_in=true&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;


function initialize() {  
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(38.893952, -77.029613)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

setMarkers(markers);

setAllMap();
}

function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].boolTest == true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
};

var markers = [
    {   
    title: "The Thomas Jefferson Memorial",
    lat: 38.881004, 
    lng: -77.036463,
    streetAddress: "701 East Basin SW",
    cityAddress: "Washington, DC 20242",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The Lincoln Memorial",
    lat: 38.889269, 
    lng: -77.050176,
    streetAddress: "2 Lincoln Memorial Cir",
    cityAddress: "Washington, DC 20037",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The Washington Monument",
    lat: 38.889484, 
    lng: -77.0363733,
    streetAddress: "2 15th St NW",
    cityAddress: "Washington, DC 20007",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The United States Capital",
    lat: 38.889939, 
    lng: -77.00905,
    streetAddress: "East Capitol St NE & First St SE",
    cityAddress: "Washington, DC 20004",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "The White House",
    lat: 38.8989013, 
    lng: -77.0324048,
    streetAddress: "1600 Pennsylvania Ave NW SW",
    cityAddress: "Washington, DC 20500",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "The National WWII Memorial",
    lat: 38.889443, 
    lng: -77.040556,
    streetAddress: "1750 Independence Ave SW",
    cityAddress: "Washington, DC 20006",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "National Gallery of Art",
    lat: 38.891298, 
    lng: -77.019965,
    streetAddress: "6th & Constitution Ave NW",
    cityAddress: "Washington, DC 20565",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Smithsonian National Museum of Natural History",
    lat: 38.891266, 
    lng: -77.026065,
    streetAddress: "10th St. & Constitution Ave. NW",
    cityAddress: "Washington, DC 20560",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Arts and Industries Building",
    lat: 38.888632, 
    lng: -77.024372,
    streetAddress: "900 Jefferson Dr SW",
    cityAddress: "Washington, DC 20560",
    id: "nav8",
    visible: ko.observable(true),
    boolTest: true
    }   
];

// var mapImage = {
//     image: {
//         url: 'img/marker.png',
//         size: new google.maps.Size(14, 30),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(6, 28)
//     },
//     shape: {
//         coords: [1,1,13,1,13,29,1,29],
//         type: 'poly'
//       },
// };

// $("#button").click(function() {
//     for (var n in markers) {
//     markers[n].imageUrl = 'img/blank-marker.png';
//     };
//     setMarkers(markers);
// });

    // var viewModel = {
    //     query: ko.observable(''),
    // };

    // viewModel.markers = ko.dependentObservable(function() {
    //     var search = this.query().toLowerCase();
    //     return ko.utils.arrayFilter(markers, function(marker) {
    //     if (marker.title.toLowerCase().indexOf(search) >= 0) {
    //             return marker.visible(true)
    //         } else {
    //             clearMarkers()
    //             return marker.visible(false)
    //         }
    //     });       
    // }, viewModel);

    // ko.applyBindings(viewModel);



function setMarkers(location) {
    
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(25, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,25,-40,-25,1],
            type: 'poly'
          }  
        });

        location[i].contentString = '<strong>' + location[i].title + '</strong><br><p>' + location[i].streetAddress + '<br>' + location[i].cityAddress + '</p>';
        // markersArray.push(marker);
        // markersArray.push(location[i].holdMarker);

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
          } 
        })(location[i].holdMarker, i));
        // $("ul").append('<a id="nav' + i + '" data-bind="visible: showContent" href="#"><li>' + mapModel.markers[i].title + '</li></a><hr>');
        
        var searchNav = $('#nav' + i);

        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
          } 
        })(location[i].holdMarker, i));
    }
};

var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true)
        } else {
            marker.boolTest = false;
            setAllMap();
            return marker.visible(false)
        }
    });       
}, viewModel);

ko.applyBindings(viewModel);

$("#input").keyup(function() {
setAllMap();
});

var isNavVisible = true;
function hideNav() {
    if(isNavVisible === true) {
            $("#search-nav").animate({
                height: 0, 
            }, 500);
            setTimeout(function() {
                $("#search-nav").hide();
            }, 500);    
            $("#arrow").attr("src", "img/down-arrow.gif");
            isNavVisible = false;
            
    } else {
            $("#search-nav").show();
            $("#search-nav").animate({
                height: 493, 
            }, 500);
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;  
    };
};

$("#arrow").click(hideNav);    




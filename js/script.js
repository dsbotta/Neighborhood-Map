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

//Initialize the map and its contents
function initialize() {  
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(38.893952, -77.029613)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    setMarkers(markers);

    setAllMap();

    $("#reset").click(function() {
    map.setZoom(15);
    map.setCenter(mapOptions.center);
    });
};

//Determines if markers should be visible
//This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].boolTest == true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
};

//Information about the different locations
//Provides information for the markers
var markers = [
    {   
    title: "The Thomas Jefferson Memorial",
    lat: 38.881004, 
    lng: -77.036463,
    streetAddress: "701 East Basin SW",
    cityAddress: "Washington, DC 20242",
    url: "www.nps.gov/thje/index.htm",
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
    url: "www.nps.gov/linc/index.htm",
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
    url: "www.nps.gov/wamo/index.htm",
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
    url: "www.visitthecapitol.gov",
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
    url: "www.whitehouse.gov",
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
    url: "www.wwiimemorial.com/",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "National Gallery of Art",
    lat: 38.890575, 
    lng: -77.019764,
    streetAddress: "6th & Constitution Ave NW",
    cityAddress: "Washington, DC 20565",
    url: "www.nga.gov/content/ngaweb.html",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Smithsonian National Museum of Natural History",
    lat: 38.890505, 
    lng: -77.026031,
    streetAddress: "10th St. & Constitution Ave. NW",
    cityAddress: "Washington, DC 20560",
    url: "www.mnh.si.edu",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    },
    {
    title: "Arts and Industries Building",
    lat: 38.888771, 
    lng: -77.024374,
    streetAddress: "900 Jefferson Dr SW",
    cityAddress: "Washington, DC 20560",
    url: "www.si.edu/Museums/arts-and-industries-building",
    id: "nav8",
    visible: ko.observable(true),
    boolTest: true
    }   
];

//Sets the markers on the map within the initialize function
    //Sets the infoWindows to each individual marker
    //The markers are inidividually set using a for loop
function setMarkers(location) {
    var headingImageView = [5, 235, 55, 170, 190, 240, -10, 10, 190];
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

        //Gets Google Street View Images for each inidividual marker
            //Passed lat and lng to get each image location
            //Had to pass title for whitehouse & different lat and lng to get images
            //for White House and Capitol 
        var streetViewImage;
        var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=200x100&location=';
        console.log 
        function determineImage() {
            if (i === 3) {
                streetViewImage = streetViewUrl + '38.892052,-77.008888&fov=75&heading=' + headingImageView[i] + '&pitch=10';                 
            } else if (i === 4) {
                streetViewImage = streetViewUrl +
                                location[i].streetAddress + ',' + location[i].cityAddress +
                                '&fov=75&heading=' + headingImageView[i] + '&pitch=10';
            } else {
               streetViewImage = streetViewUrl +
                                location[i].lat + ',' + location[i].lng +
                                '&fov=75&heading=' + headingImageView[i] + '&pitch=10'; 
                            };                   
        };
        determineImage();
        //Binds infoWindow content to each marker
        location[i].contentString = '<img src="' + streetViewImage + 
                                    '" alt="Street View Image of ' + location[i].title + '"><br><hr style="margin-bottom: 5px"><strong>' + 
                                    location[i].title + '</strong><br><p>' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '</p><br><a class="web-links" href="http://' + location[i].url + 
                                    '">' + location[i].url + '</a>';

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });

        //Click marker to view infoWindow
            //zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
          } 
        })(location[i].holdMarker, i));
        
        //Click nav element to view infoWindow
            //zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(16);
            map.setCenter(marker.getPosition());
          } 
        })(location[i].holdMarker, i));
    }
};

//Query through the different locations from nav bar with knockout.js
    //only display markers and nav elements that match query result
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

//show $ hide markers in sync with nav
$("#input").keyup(function() {
setAllMap();
});

//Hide and Show entire Nav/Search Bar
    //Bound to the arrow button
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
            var scrollerHeight = $("#scroller").height() + 55;
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 500, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
            $("#arrow").attr("src", "img/up-arrow.gif");
            isNavVisible = true;  
    };
};
$("#arrow").click(hideNav);



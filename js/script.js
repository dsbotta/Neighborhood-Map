
var map;
function initialize() {
      
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(38.893952, -77.029613)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  infowindow = new google.maps.InfoWindow({
      content: null
    });  

setMarkers(markers);
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

    var markers = [
        {   
        title: "The Thomas Jefferson Memorial",
        lat: 38.881004, 
        lng: -77.036463,
        map: map,
        streetAddress: "701 East Basin SW",
        cityAddress: "Washington, DC 20242",
        id: "nav0",
        visible: ko.observable(true)
        },
        {   
        title: "The Lincoln Memorial",
        lat: 38.889269, 
        lng: -77.050176,
        map: map,
        streetAddress: "2 Lincoln Memorial Cir",
        cityAddress: "Washington, DC 20037",
        id: "nav1",
        visible: ko.observable(false)
        },
        {   
        title: "The Washington Monument",
        lat: 38.889484, 
        lng: -77.0363733,
        map: map,
        streetAddress: "2 15th St NW",
        cityAddress: "Washington, DC 20007",
        id: "nav2",
        visible: ko.observable(true)
        },
        {   
        title: "The United States Capital",
        lat: 38.889939, 
        lng: -77.00905,
        map: map,
        streetAddress: "East Capitol St NE & First St SE",
        cityAddress: "Washington, DC 20004",
        id: "nav3",
        visible: ko.observable(true)
        },
        {
        title: "The White House",
        lat: 38.8989013, 
        lng: -77.0324048,
        map: map,
        streetAddress: "1600 Pennsylvania Ave NW SW",
        cityAddress: "Washington, DC 20500",
        id: "nav4",
        visible: ko.observable(true)
        },
        {   
        title: "The National WWII Memorial",
        lat: 38.889443, 
        lng: -77.040556,
        map: map,
        streetAddress: "1750 Independence Ave SW",
        cityAddress: "Washington, DC 20006",
        id: "nav5",
        visible: ko.observable(true)
        }   
    ];



    var viewModel = {
        query: ko.observable(''),
    };

    viewModel.markers = ko.dependentObservable(function() {
        var search = this.query().toLowerCase();
        return ko.utils.arrayFilter(markers, function(marker) {
        if (marker.title.toLowerCase().indexOf(search) >= 0) {
                return marker.visible(true)
            } else {
                return marker.visible(false)
            }
        });       
    }, viewModel);

    ko.applyBindings(viewModel);


function setMarkers(location) {
    var markers = new Array();
    for(i=0; i<location.length; i++) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          title: location[i].title  
        });

        // var flickrPicSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5a0f379fef5e197fc8e6dbcc7a4e444d&text=" + 
        //                       markers[i].title.replace(/ /g, "+") + 
        //                       "&accuracy=16&content_type=1&lat=" + 
        //                       markers[i].lat + "&lon=" + 
        //                       markers[i].lng + 
        //                       "&format=json&nojsoncallback=1";
        // var x = 0;
        // $.getJSON(flickrPicSearch, function (data) {
        //     for(x in data.photos) {
        //         var image = data.photos;
        //         var location = markers;
        //         flickrPicArray.push(image[x]); //Captures all json data for each location search
        //     // var randomPic = Math.floor((Math.random() * image.length -1) + 1);
        //     // location[x].contentString = '<img src="http://farm' + image[randomPic].farm + '.static.flickr.com/' + image[randomPic].server + '/' + image[randomPic].id +'_' + image[randomPic].secret + '_m.jpg"><p>' + mapModel.markers[x].streetAddress + '<br>' + mapModel.markers[x].cityAddress + '</p>';
        //     };
        // });

        location[i].contentString = '<p>' + location[i].streetAddress + '<br>' + location[i].cityAddress + '</p>';
        markers.push(marker);

        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });
        new google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
          } 
        })(marker, i));
        // $("ul").append('<a id="nav' + i + '" data-bind="visible: showContent" href="#"><li>' + mapModel.markers[i].title + '</li></a><hr>');
        
        var searchNav = $('#nav' + i);

        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
          } 
        })(marker, i));
    }
};

var markerList = mapModel.markers;
    for(var x = 0; x < markerList.length; x++) {
      var markPos = new google.maps.LatLng(
        markerList[x].lat,
        markerList[x].lng
      );

   var marker = new google.maps.Marker({
        position: markPos,
        map: map,
        title: markerList[i].title,
        // url: markerList[x].url,
        // highlight: markerList[x].highlight
      }); 
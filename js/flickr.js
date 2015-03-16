var flickrJSON;

$("#flickr").click(function() {
    $(".modal").css("z-index", "3");
    $(".modal").show()
});

$("#exit-modal").click(function() {
    $(".modal").css("z-index", "0");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    imagesAreSet = true;
});

function getFlickrImages() {
for(var i in markers) {
var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a9d89757115dc9730616d197c683a8f5&text=National+Mall&accuracy=16&lat=38.896952&lon=-77.029713&format=json';
        $.ajax({
            url: flickrUrl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function(data) {
                var photo = data.photos.photo;
                flickrJSON = photo;
            }
        });
};
};
getFlickrImages();


var flickrPhotoArray = [];
var counter = 0;
var imagesAreSet = false;

function setFlickrImages() {
	if(imagesAreSet == false) {
		for(var i=0; i < 25; i++) {
			var number = Math.floor((Math.random() * 250) + 1);
			var photo = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON[number].server + '/' + flickrJSON[number].id + '_' + flickrJSON[number].secret + '.jpg';
			flickrPhotoArray.push(photo);
				$('.flickr-image-container').append('<img id="flickr-image' + i + '" src="' + photo + '">');
				$("#flickr-image" + i).hide();
			if(i < 1) {
				$("#flickr-image" + i).show();
			};
		};
	} else {
		$("#flickr-image" + counter).show();
	}

};

$("#flickr").click(setFlickrImages);

function scrollForward() {
		$('#flickr-image' + counter).hide();
		counter += 1;
		if(counter >= 24) {
			counter = 0;
		};
		$('#flickr-image' + counter).show();	
};

function scrollBackWard() {
		$('#flickr-image' + counter).hide();
		counter -= 1;
		if(counter < 0) {
			counter = 24;
		};
		$('#flickr-image' + counter).show();	
};

$("#right-arrow").click(scrollForward);
$("#left-arrow").click(scrollBackWard);  
       
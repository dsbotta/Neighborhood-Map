// function callfourSquare() {
//             for(var i in markers) {
//                 var foursquareUrl = "https://api.foursquare.com/v2/venues/search?ll=38.896952,-77.029713&query=" + 
//                             markers[i].title +
//                             "&client_id=PIXBCDXFQJKM15VJ3ETPNRMTGY3NROXY2TTP2F1APNS1NMSS&client_secret=UJK4JJQ0MVNTIF1G53ZTKUZ4CRZPFGHZFNH0EYJF0RQLHRCL&v=20150312";

//                 $.ajax({
//                     url: foursquareUrl,
//                     dataType: 'json',
//                     async: false,
//                     success: function(data) {
//                         content = data.response.venues[0].url;
//                         markers[i].url = content;
//                 }
//             });
//          };
//         };    
//         callfourSquare();
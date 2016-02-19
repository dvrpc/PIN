	var map;
	var MY_MAPTYPE_ID = 'Base Map';
	var streetViewService = new google.maps.StreetViewService();
	var markersArray = [];
	  
	var region = new google.maps.LatLng(39.950143, -75.170669);
	var  philadelphia = new google.maps.LatLng(39.99342964441351, -75.15953063964844);
	var NE = new google.maps.LatLng(40.0664842906,-75.0337813006);
	var BKR = new google.maps.LatLng(39.9901632005,-75.0989542836);
	var OLOK = new google.maps.LatLng(40.0462266208,-75.1429634301);
	var GTCH = new google.maps.LatLng(40.0483456922,-75.1935444651);
	var RM = new google.maps.LatLng(40.047828436,-75.2325934041);
	var NP = new google.maps.LatLng(39.9903824688,-75.1581875409);
	var WP = new google.maps.LatLng(39.9724762276,-75.2277634942);
	var CC = new google.maps.LatLng(39.9487758659,-75.1551222974);
	var SP = new google.maps.LatLng(39.9129468867,-75.1718993013);
	var SWP = new google.maps.LatLng(39.9046784725,-75.2282815172);

function toggleLayer(dataLayer,id)
        {
            if ($('#'+id).is(':checked')) {
                dataLayer.setMap(map);
            }
            else
            {
                dataLayer.setMap(null);
            }
        }
 function codeAddress() {
    var address = document.getElementById("address").value;
	var bounds  = new google.maps.LatLngBounds( 
	new google.maps.LatLng( 39.867004,-75.280303 ),
	new google.maps.LatLng( 40.137992,-74.955763 ));
	
    geocoder.geocode( { 'address':address,'bounds':bounds}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
		map.setZoom(15);
        var marker = new google.maps.Marker({
            map: map, 
           position: results[0].geometry.location	  
       });
	    markersArray.push(marker);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
      // Deletes all markers in the array by removing references to them
  function deleteOverlays() {
    if (markersArray) {
      for (i in markersArray) {
        markersArray[i].setMap(null);
      }
      markersArray.length = 0;
    }
  }
function initialize() {
	$('.locBtn').on('click', function () {
	$('.locBtn').removeClass('selected');
    $(this).toggleClass('selected');   
});

var stylez = [
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "landscape",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "poi",
    elementType: "all",
    stylers: [
      { saturation: -15 }
    ]
  },{
    featureType: "road",
    elementType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },{
    featureType: "transit",
    elementType: "all",
    stylers: [
      { saturation: -8 }
    ]
  },{
    featureType: "water",
    elementType: "all",
    stylers: [
      { saturation: -8 }
    ]
  }
];

geocoder = new google.maps.Geocoder();

  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 39.950143, lng:-75.170669 },
    mapTypeId: MY_MAPTYPE_ID,  
	mapTypeControlOptions: {
	mapTypeIds: [MY_MAPTYPE_ID, google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID],
	style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
   // draggableCursor: 'pointer', // every pixel is clickable.
    streetViewControl: true //my favorite feature in V3!
  });
  
  map.enableKeyDragZoom();  
 
     var styledMapOptions = {
    name: "Map",
	alt:"Show base map"
  }; 
  
 var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
 map.mapTypes.set(MY_MAPTYPE_ID,jayzMapType);
  
data1 = new google.maps.Data();
data1.loadGeoJson('data/LargeAreas.js');
data1.setMap(map);
data1.setStyle(function (feature) {
    return { strokeColor: '#A800E6',
    strokeOpacity: 0.8,
    strokeWeight:2,
    fillColor: 'none',
	fillOpacity:0, 
	opacity: 1,
	fill: true,
	clickable: true
   }
	});
 data1.addListener('click', function(e) {
    data1.revertStyle();
    data2.revertStyle();
    data3.revertStyle();
    data4.revertStyle();
        data1.overrideStyle(e.feature,{ 
	//	 clickable: true,
        fillOpacity: 0,   
        strokeColor: '#FFF800' ,
        strokeWeight: 4
		});
    });
     
data2 = new google.maps.Data();
data2.loadGeoJson('data/LNH.js');
data2.setMap(map);
data2.setStyle(function (feature) {
    return { strokeColor: '#00FFC5',
    strokeOpacity: 0.8,
    strokeWeight:2,
    fillColor: 'grey',
	fillOpacity:.55, 
	opacity: 1,
	fill: true,
	clickable: true
   }
	});
	data2.addListener('click', function(e) {
	data1.revertStyle();
    data2.revertStyle();
    data3.revertStyle();
    data4.revertStyle();
        data2.overrideStyle(e.feature,{ 
	//	 clickable: true,
        fillOpacity: .7,   
        strokeColor: '#FFF800' ,
        strokeWeight: 4
		});
    });	
    
data3 = new google.maps.Data();
data3.loadGeoJson('data/small.js');
data3.setMap(map);
data3.setStyle(function (feature) {
    return { strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight:1,
    fillColor: '#FF8800',
    fillOpacity: 0.55,
	clickable: true}
	});
  data3.addListener('click', function(e) {
	data1.revertStyle();
    data2.revertStyle();
    data3.revertStyle();
    data4.revertStyle();
        data3.overrideStyle(e.feature,{ 
	//	 clickable: true,
        fillOpacity: .7,   
        strokeColor: '#FFF800' ,
        strokeWeight: 4
		});
    });
	
data4 = new google.maps.Data();
data4.loadGeoJson('data/LesserKnown.js');
data4.setMap(map);
data4.setStyle(function (feature) {
    return { strokeColor: '#fc9390',
    strokeOpacity: 0.8,
    strokeWeight:2,
    fillColor: '#BF0404',
	fillOpacity:.55, 
	opacity: 1,
	fill: true,
	clickable: true
   }
	});
  
data4.addListener('click', function(e) {
	data1.revertStyle();
    data2.revertStyle();
    data3.revertStyle();
    data4.revertStyle();
        data4.overrideStyle(e.feature,{ 
	//	 clickable: true,
        fillOpacity: .7,   
        strokeColor: '#FFF800' ,
        strokeWeight: 4
		});
    });
$.getJSON('data/Cnty.js', function(d) {
    var data = new google.maps.Data({map: map, style:{stroke:true,fillColor:'none', strokeColor: '#494949',weight: 1.5,fill: true, opacity: 1,fillOpacity:0, clickable: false }});
    data.addGeoJson(d);
});		
	
    data1.addListener('click', function(e) {
	  var content ='<b>Neighborhood: </b>' +e.feature.getProperty('Co_AltName');
       $('#infosidebar').html(content);
    });
	
	 data2.addListener('click', function(e) {
	   var content ='<b>Neighborhood: </b>' +e.feature.getProperty('LNeigh');
       $('#infosidebar').html(content);
    });
	
	data2.addListener('mouseover', function(e) {
   var content ='<b>Neighborhood: </b>' +e.feature.getProperty('LNeigh');
   document.getElementById('info-box').innerHTML = content;
    });
   
 data3.addListener('click', function(e) {
	  var content ='<b>Neighborhood: </b>' +e.feature.getProperty('SNeigh');
       $('#infosidebar').html(content);
    });

	data3.addListener('mouseover', function(e) {
   var content ='<b>Neighborhood: </b>' +e.feature.getProperty('SNeigh');
   document.getElementById('info-box').innerHTML = content;
    });
   
 data4.addListener('click', function(e) {
	  var content ='<b>Neighborhood: </b>' +e.feature.getProperty('LKNeigh');
       $('#infosidebar').html(content);
    });	

    data4.addListener('mouseover', function(e) {
   var content ='<b>Neighborhood: </b>' +e.feature.getProperty('LKNeigh');
   document.getElementById('info-box').innerHTML = content;
    });
     
 $("#zoomToStudy1").click(function(){
    map.setCenter(NE);
    map.setZoom(13);
  });
   $("#zoomToStudy2").click(function(){
    map.setCenter(BKR);
    map.setZoom(13);
  });
   $("#zoomToStudy3").click(function(){
    map.setCenter(OLOK);
    map.setZoom(13);
  });
   $("#zoomToStudy4").click(function(){
    map.setCenter(GTCH);
    map.setZoom(13);
  });
     $("#zoomToStudy5").click(function(){
    map.setCenter(RM);
    map.setZoom(13);
  });
   $("#zoomToStudy6").click(function(){
    map.setCenter(NP);
    map.setZoom(13);
  });
   $("#zoomToStudy7").click(function(){
    map.setCenter(WP);
    map.setZoom(13);
  });
   $("#zoomToStudy8").click(function(){
    map.setCenter(CC);
    map.setZoom(13);
  });
   $("#zoomToStudy9").click(function(){
    map.setCenter(SP);
    map.setZoom(13);
  });
   $("#zoomToStudy10").click(function(){
    map.setCenter(SWP);
    map.setZoom(13);
  });
 
   $("#zoomToRegion").click(function(){
    map.setCenter(region);
    map.setZoom(11);
  });  
  
   google.maps.event.addListener(map, 'click', function() {

	data1.revertStyle();
	data2.revertStyle();
	data3.revertStyle();
    data4.revertStyle();
  });
  
     google.maps.event.addListener(map, 'mouseover', function() {

	data1.revertStyle();
	data2.revertStyle();
	data3.revertStyle();
    data4.revertStyle();
  });
   
}
google.maps.event.addDomListener(window, 'load', initialize);

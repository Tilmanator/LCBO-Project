var numStores=0;
var stores=[];
var currStore = null;
localStorage.currStore=null;

// Object to hold relevant information
function storeInfo(id, name, lat, long,address){
    this.id=id;
    this.name=name;
    this.lat=lat;
    this.long=long;
    this.address=address;
}

// Load all the stores on a given page. Then iterate through the rest of them recursively with loadMore
function loadStores(page) {
  var script = document.createElement('script');
  script.src = 'http://lcboapi.com/stores?per_page=100;where_not=is_dead;page='+page+';callback=loadMore';
  script.async = true;
  document.head.appendChild(script);
}

function loadMore(response){
  for(var i=0; i< response.pager.current_page_record_count; i++){
    var r = response.result[i];
    var c = new storeInfo(r.id, r.name, r.latitude, r.longitude,r.address_line_1);
    stores.push(c);
  }

  numStores+= response.pager.current_page_record_count;
  
  // Recursive call
  if(!response.pager.is_final_page){
    loadStores(response.pager.current_page+1);
  }
  else
  {
    // Start the 
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA3OvksP4D6uxeklO-kGRn8onJvjnVi11A&callback=initMap';
    script.async = true;
    document.head.appendChild(script);
  }
}

function saveFavourite(){
  if(currStore!=null){
  alert('change from '+ localStorage.store+' to '+currStore.id);
  localStorage.store = currStore.id;
}
}

loadStores(1);

 // Calling the google maps API
    // This will occur after all stores have loaded
      var map;
      var markers = [];
      var showInfo= false;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(43.4643,-80.5204),
          mapTypeId: 'terrain'
        });

        // Use current position if available
         if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            map.setCenter(pos);
          }, function() {
            handleLocationError(true, errorWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, errorWindow, map.getCenter());
        }

      var errorWindow = new google.maps.InfoWindow({content:''});
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {

        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

        var infowindow = new google.maps.InfoWindow({
          content: ''
        });

        // the stores variable was already loaded in mapLoad.js
        for (var i = 0; i < numStores; i++) {
          var latLng = new google.maps.LatLng(stores[i].lat,stores[i].long);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: 'Click to view more information'//stores[i].name
            //label: i.toString()
          });

          markers.push(marker);

          // Dictates what happens when a marker is clicked
          markers[i].addListener('click', function() {
          currStore=this.id;
          if(map.getZoom()<12)
              map.setZoom(12);
          map.setCenter(this.getPosition());
          var index = markers.indexOf(this);
          currStore = stores[index];
          document.getElementById('mapBox').innerHTML = currStore.name+'<br>Address: '+
          currStore.address +'<br>Open from whenever <br>'+'<a href="./stores.html">See products at this store</a>';
          localStorage.currStore = currStore.id;
        });

          // Display some information when mouse is on marker
          markers[i].addListener('mouseover', function() {
            var index = markers.indexOf(this);
            infowindow.setContent(stores[index].name);
            infowindow.open(map,this);
            showInfo=true;
        });

        // Set a timer for the window to close
        markers[i].addListener('mouseout', function() {
          showInfo=false;
          var index = markers.indexOf(this);
            window.setTimeout(function() {
              if(!showInfo && infowindow.getContent() == stores[index].name){
                  infowindow.close();}
          }, 3000);
        });
          
      }

          
      }
var numStores=0;
var stores=[];
var currStore = null;

function storeInfo(id, name, lat, long){
this.id=id;
this.name=name;
this.lat=lat;
this.long=long;
}

function loadStores(page) {
  var script = document.createElement('script');
  script.src = 'http://lcboapi.com/stores?per_page=100;where_not=is_dead;page='+page+';callback=loadMore';

  script.async = true;
  document.head.appendChild(script);
}

function loadMore(response){
  for(var i=0; i< response.pager.current_page_record_count; i++){
    var r = response.result[i];
    var c = new storeInfo(r.id, r.name, r.latitude, r.longitude);
    stores.push(c);
  }

  numStores+= response.pager.current_page_record_count;
  
  if(!response.pager.is_final_page){
    loadStores(response.pager.current_page+1);
  }
  else
  {
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
     script.async = true;
     document.head.appendChild(script);
  }
}

loadStores(1);
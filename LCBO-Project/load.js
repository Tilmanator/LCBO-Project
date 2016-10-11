 /*
	This is where we request and receive the data from the API
 */

function store(){
	var v = document.getElementById('num').value;
	var script = document.createElement('script');
  script.src = 'http://lcboapi.com/stores/'+v+'?callback=loadStore';
  script.async = true;
  document.head.appendChild(script);
}

 function loadStore(id) {
  var script = document.createElement('script');
  script.src = 'http://lcboapi.com/stores/'+id+'?callback=loadStore';
  script.async = true;
  document.head.appendChild(script);
}

function loadProductsAtStore(id){
  var script = document.createElement('script');
  script.src = 'http://lcboapi.com/products?store_id='+id+';order=price_in_cents.asc;callback=loadProduct';
  script.async = true;
  document.head.appendChild(script);
}
//for(var i=0;i<654;i++){loadStore(i);}
loadStore(511);
  function loadStore(id) {
  var script = document.createElement('script');

  script.src = 'http://lcboapi.com/stores/'+id+'?callback=loadStore';
  script.async = true;

  document.head.appendChild(script);
}


for(var i=0;i<654;i++){loadStore(i);}
//loadStore(511);
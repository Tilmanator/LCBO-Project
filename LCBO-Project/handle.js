//var validStores =0;
function loadStore(response) {

        var el = document.getElementById('store_name');
        var deprecated = response.result.is_dead;

        // if(response.result.name != null || !deprecated)
        //     validStores++;
        //el.innerHTML =response.result.name +" " + validStores+"<br>";
        el.innerHTML="";

       // var count = Object.keys(response.result[1]).length;
        var obj = Object.keys(response.result);
        var count = obj.length;
        var it=Iterator(obj);

        // Last one is store number which is deprecated
         for(var i=0; i<count-1; i++){
          var current = it.next();
          var str = current[1];
          el.innerHTML=el.innerHTML+ str +"= "+response.result[str] +"<br>";
         }

       // for (var i = 0; i < count; i++){
        // el.innerHTML= el.innerHTML+" "+i+" ";
        // if(i%10==0)
        //   el.innerHTML =el.innerHTML+"<br>";
        // var obj = Object.keys(response.result)[i];
        // el.innerHTML = el.innerHTML+obj;
  // for (var key in obj){
  //   var value = obj[key];
  //   document.write("<br> - " + key + ": " + value);
  //}
//}
}

function loadStores(response){
      var el = document.getElementById('stores');
      el.innerHTML = response.result[2];
     var count = Object.keys(response.result[1]).length;
}
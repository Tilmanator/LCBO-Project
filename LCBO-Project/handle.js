
// Handles basic information to be displayed about a store
function loadStore(response) {
        var el = document.getElementById('store_name');
        var days = ["sunday_open","sunday_close","monday_open","monday_close","tuesday_open","tuesday_close","wednesday_open",
        "wednesday_close","thursday_open","thursday_close","friday_open","friday_close","saturday_open","saturday_close"];

        var d = new Date();
        var open = response.result[days[d.getDay()*2]];
        var close = response.result[days[d.getDay()*2+1]];

        // // Resets the html so it does not interfere with previous models
        el.innerHTML=  response.result.name +  '<br>';
        el.innerHTML +='Open from '+ time((open/60 >> 0),(open%60))+
        ' to '+ time((close/60 >> 0),(close%60))+ '<br>';
        loadProductsAtStore(response.result.id, 1);
}

// Displays all requested products
function loadProduct(response){
        var el = document.getElementById('products');
        el.innerHTML="";
        var imgs = [];
        var numRecords = response.pager.records_per_page;
        for(var i=0;i<numRecords;i++){
           if(response.result[i].image_url!=null){
            var n = response.result[i];

            // Need to assign a value for later reference
            var x = document.createElement("IMG");
            x.src= response.result[i].image_url;
            x.value = i;
            //x.style="width:5%;height:50px;float:left;";
            imgs.push(x);

            // Needs functional return so it does not immediately call the function
            imgs[i].addEventListener('click',function(){ return productInfo(response.result[this.value]); });
            el.appendChild(imgs[i]);
        }
      }
}

// Display basic information as a popup alert
function productInfo(result){
  var str = result.name + "\n";
  str+= "Price: $"+result.price_in_cents/100 + "\n"
  str+="Alcohol/Vol. : "+ (result.alcohol_content/100)+"%\n";
  if(result.origin!=null)str+="Origin: "+result.origin;
  alert(str);
}

// Shows everything about a store
function allInfo (reponse) {
        var obj = Object.keys(response.result);
        var count = obj.length;
        var it=Iterator(obj);

        // Last one is store number which is deprecated
         for(var i=0; i<count-1; i++){
          var current = it.next();
          var str = current[1];
          el.innerHTML=el.innerHTML+ str +"= "+response.result[str] +"<br>";
         }
}

function loadStores(response){
      var el = document.getElementById('stores');
      el.innerHTML = response.result[2];
     var count = Object.keys(response.result[1]).length;
}

// Formatting
function time(n,m){
 var s = n +":";
 if(m>=10){
  s+=m;
 }
 else{
  s+="0" +m;
 }
 return s;
}
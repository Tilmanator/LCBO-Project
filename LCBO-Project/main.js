// For home page graphic WATERLOO    

var count=0;
// Representation of letters
var water=[[1,0,0,0,1,0,0,1,0,0,1,1,1,0,1,1,0,1,1,0],
               [1,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1],
               [1,0,1,0,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0],
               [0,1,1,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1],
               [0,1,0,1,0,0,1,0,1,0,0,1,0,0,1,1,0,1,0,1]
           ];
var loo=[[0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0],
             [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0],
             [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0],
             [0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0],
             [0,0,0,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,0,0]
           ];
 var arr =water;
 var script = document.createElement('script');
 script.src = 'http://lcboapi.com/products?per_page=100;where_not=is_dead;callback=pics';
 script.async = true;
 document.head.appendChild(script);

// Find the first available pictures to use
  function pics(response){
    for(var i=0; i< response.pager.current_page_record_count && count<100; i++){
      if(response.result[i].image_url!=null){

        // Corresponding one or 0
        if(arr[Math.floor(count/20)][count%20]==1){
            var x = document.createElement("IMG");
            x.src= response.result[i].image_url;
            x.style="width:5%;height:50px;float:left;";
            document.getElementById('stores').appendChild(x);
            count++;
        } 
        else{
            var y = document.createElement("IMG");
            y.src= "white.png";
            y.style="width:5%;height:50px;float:left;";
            document.getElementById('stores').appendChild(y);
            count++;
        }
    }
    

    }
     
  // The first line array is still in use     
  if(count!=100){
    script=document.createElement('script');
  script.src = 'http://lcboapi.com/products?page=2;per_page=100;where_not=is_dead;callback=pics';
  script.async = true;
  document.head.appendChild(script);
  }


// Buffer for the next line
  if(count==100){
      for(var i=0;i<20;i++){
        var y = document.createElement("IMG");
        y.src= "white.png";
        y.style="width:5%;height:50px;float:left;";
        document.getElementById('stores').appendChild(y);
    }

// Move on to the second line
  if(arr!=loo){
    arr=loo;
    count=0;
    var script = document.createElement('script');
    script.src = 'http://lcboapi.com/products?per_page=100;where_not=is_dead;callback=pics';
    script.async = true;
    document.head.appendChild(script);
  }
  }

}
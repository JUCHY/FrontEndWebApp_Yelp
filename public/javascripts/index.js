// TODO 
// Add client side JavaScript
//
const APICode = 'ggOvurhzx5e-m7GXrtUOKKqMcV7DOqWvCLcH7mbgYtanfLYjKCOGPHQwCHTD77c5Qr0lCXcEHl1TLPiX6iVeVJXeepI7z4emwHw7Ju8U6ni9kkDeTNci-GTUT7LIXHYx'
function main() {
    //displayYelp();
    makeCorsRequest();
    /*function displayYelp() {
        var URL =
          "https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=40.82783908257346&longitude=-74.10162448883057";
      
        $.ajax({
          url: URL,
          method: "GET",
          headers: {
            Authorization:
              "Bearer ggOvurhzx5e-m7GXrtUOKKqMcV7DOqWvCLcH7mbgYtanfLYjKCOGPHQwCHTD77c5Qr0lCXcEHl1TLPiX6iVeVJXeepI7z4emwHw7Ju8U6ni9kkDeTNci-GTUT7LIXHYx",
          },
        }).then(function(response) {
          console.log(response);
        }).catch(function(err) {
            console.error(err);
          });
      }*/
    /*function reqYelpEvents() {
        var req = new XMLHttpRequest(),
        url = 'https://thingproxy.freeboard.io/fetch/http://api.yelp.com/v3/events?latitude=40.82783908257346&longitude=-74.10162448883057';
        req.addEventListener('load', getYelpEvents);
        req.addEventListener('error', function(e){
            console.log(req);
            console.log(req.responseText);
            console.log("There was an error");
        });
        req.open('GET', url, true);
        req.withCredentials = true;
        req.setRequestHeader('Authorization', 'Bearer '+ APICode);   
        console.log(req); 
        req.send(null);
    }*/

//had trouble with cors
//code taken from https://www.html5rocks.com/en/tutorials/cors/
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url);
        } else {
          // CORS not supported.
          xhr = null;
        }
        xhr.setRequestHeader('Authorization', 'Bearer '+ APICode);   
        return xhr;
      }
      
      // Helper method to parse the title tag from the response.
      
      // Make the actual CORS request.
      function makeCorsRequest() {
        // This is a sample server that supports CORS.
        var date = new Date();
        //console.log(date);
        var timestamp = Math.floor(date.getTime()/1000);
        var nextdate = date.getDate()+1;
        date.setDate(nextdate);
        endtimestamp = Math.floor(date.getTime()/1000);
       // console.log(date);
       // console.log(timestamp);
       // console.log(endtimestamp);

        var url = '/api/events?location=EastVillage,NewYork,NY&limit=20&end_date='+endtimestamp+'&sort_on=time_start&start_date='+timestamp;
        
      
        var xhr = createCORSRequest('GET', url);
        if (!xhr) {
          alert('CORS not supported');
          return;
        }
      
        // Response handlers.
        xhr.onload = function(e){
            if (xhr.status >= 200 && xhr.status < 400) {
                let results = JSON.parse(xhr.responseText);
                var pre = document.getElementById('content');
                results= results.events;
               // console.log(results);
                if(navigator.geolocation){
                    let currlocation = navigator.geolocation.getCurrentPosition(function(position){
                        const pos = {
                        lat : position.coords.latitude,
                        long:  position.coords.longitude
                            }
                       // console.log(results);
                        var promise = new Promise(function(resolve, reject){
                            results.sort(function(a,b){
                           // console.log(pos)
                            return compare(pos, a)-compare(pos,b);
                                })
                            resolve();
                        })
                        promise.then(function(){
                           // console.log('Success')
                            results.forEach(function(obj){
                              //  console.log(obj.name);
                                document.querySelector('#content').appendChild(createEvent(obj));
                            });
                        })

                    })
                }
                else{
                    results.forEach(function(obj){
                        document.querySelector('#content').appendChild(createEvent(obj));
                    });
                }
            }
        }
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
      
        xhr.send();
      }

    function getYelpEvents() {
        var pre = document.getElementById('content');
        pre.textContent = "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    }
    function initMap(mapobj, evt) {
        // The location of Uluru
        var location = {lat: evt.latitude, lng: evt.longitude};
        // The map, centered at Uluru
        var map = new google.maps.Map(
            mapobj, {zoom: 15, center: location});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: location, map: map});
        var mymarker = new google.maps.Marker({clickable: false,
            icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22,22),
            new google.maps.Point(0,18),
            new google.maps.Point(11,11)), map: map});
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(pos) {
            var loc = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            mymarker.setPosition(loc);
        }, function(error){
            alert("This program needs access to geolocation to work best");
        })

    }
    
    function compare(pos, evt){
        let latdif = Math.abs(pos.lat - evt.latitude);
        let longdif = Math.abs(pos.long - evt.longitude);
        let finalans = ((latdif*latdif)+(longdif*longdif));
        evt.distance = finalans;
       // console.log(finalans);
        return finalans;
    }

    function getdistance(dist, evt){
        if(navigator.geolocation){
            let currlocation = navigator.geolocation.getCurrentPosition(function(position){
                const pos = {
                lat : position.coords.latitude,
                long:  position.coords.longitude
                    }
                
                var url = "https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+pos.lat+","+pos.long+"&destinations="+evt.latitude+","+evt.longitude+"&key=AIzaSyAe7UVEFWEKBrEPpDKCQzsa-XTwmVRRO4Y";
                var req = createCORSRequest('GET',url);
                if (!req) {
                    alert('CORS not supported');
                    return;
                  }
            req.onload =  function(e){
                    if (req.status >= 200 && req.status < 400) {
                        results = JSON.parse(req.responseText);
                        results = results.rows[0].elements[0];
                        dist.textContent = "Distance: " + results.distance.text + " Time: " + results.duration.text;
                    }
                
            };
                req.open('GET',url , true);
                req.onerror = function() {
                    console.log('Woops, there was an error making the request.');
                  };
                req.send();

            })

        

    }
}


    function createEvent(evt){
        const event = document.createElement('div');
        event.setAttribute('class',"event");
        const eventname = document.createElement('div');
        eventname.textContent = "Name: " + evt.name;
        eventname.setAttribute('class',"name");
        event.appendChild(eventname);
        const eventime = document.createElement('div');
        eventime.textContent = "Time:" + evt.time_start  + " - " + evt.time_end
        eventime.setAttribute('class',"time");
        event.appendChild(eventime);
        const eventcost = document.createElement('div');
        eventcost.setAttribute('class', "cost");
        eventcost.textContent = "Cost: $" +evt.cost;
        event.appendChild(eventcost);
        const eventdist = document.createElement('div');
        eventdist.setAttribute('class','distance');
        event.appendChild(eventdist);
        getdistance(eventdist, evt);
        const map = document.createElement('div');
        map.setAttribute('class',"map");
        initMap(map, evt)
        event.appendChild(map);
        const button = document.createElement('button');
        button.setAttribute('class','mapbutton');
        button.textContent = "LOCATION";
        button.addEventListener('click',function(){
            if (map.style.display === "none") {
                map.style.display = "block";
              } else {
                map.style.display = "none";
              }
        })
        map.style.display = "none";
        event.appendChild(button);
        return event;

    }
}

document.addEventListener("DOMContentLoaded", main);

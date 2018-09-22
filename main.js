const should = {}

getLocation()

const button = document.getElementById('show_button')
button.addEventListener('click',hideshow,false);

function hide() {
  document.getElementById('answer').innerHTML = "TAK";
  calculateAndRenderDirections()
}

function hideshow() {
  let element = document.getElementById('show_button')
  let policy = document.getElementById('policy')
  fade(element)
  fade(policy)
  setTimeout(hide, 2000)
}   

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.display = 'none';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.1;
  }, 50);
}

let map, marker;

let returnPosition = {
    lat: undefined,
    lng: undefined
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.")
    }
}

function showPosition(position) {
    returnPosition.lat = position.coords.latitude;
    returnPosition.lng = position.coords.longitude;
    console.log(returnPosition)
}

const bieszczady = {lat: 49.273, lng: 22.519}

function initMap() {
    let mapCanvas = document.getElementById('map')
    let mapOptions = {
        center: bieszczady,
        zoom: 12,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

    } 
    
    map = new google.maps.Map(mapCanvas, mapOptions)
    marker = new google.maps.Marker({position: bieszczady, map: map})
}

const calculateAndRenderDirections = (origin, destination) => {
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
        request = {
            origin: returnPosition,
            destination: bieszczady,
            travelMode: 'DRIVING'
        }

    directionsDisplay.setMap(map);
    directionsService.route(request, (result, status) => {
        if (status == 'OK') {
            directionsDisplay.setDirections(result)
        }
    })
}


// Google maps api key
// AIzaSyCykoFJLhcxGyaZ3oZb3YfMEPo_bWl63tU 

// Google directions api key
// AIzaSyD9-VAQ2nuVSQMVKa-LNTGpW0Jqfx_BjUA 
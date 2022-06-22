export const mapService = {
    initMap,
    setMap,
    logChange
}

function setMap() {
    getPosition()


}

var options = {
    types: ['(cities)']
}
var input = document.getElementById('searchTextField')
var autocomplete = new google.maps.places.Autocomplete(input, options)
function logChange(){
  initMap(autocomplete.gm_accessors_.place.hk.place.geometry.location.lat(),autocomplete.gm_accessors_.place.hk.place.geometry.location.lng())

}



function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }

    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    // navigator.geolocation.watchPosition(showLocation, handleLocationError)
}


function showLocation(position) {
    console.log(position)
    // document.getElementById("latitude").innerHTML = position.coords.latitude
    // document.getElementById("longitude").innerHTML = position.coords.longitude
    // document.getElementById("accuracy").innerHTML = position.coords.accuracy

    // var date = new Date(position.timestamp)
    // document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    initMap(position.coords.latitude, position.coords.longitude)
}

function handleLocationError(error) {
    var locationError = document.getElementById('locationError')

    switch (error.code) {
        case 0:
            locationError.innerHTML =
                'There was an error while retrieving your location: ' + error.message
            break
        case 1:
            locationError.innerHTML =
                "The user didn't allow this page to retrieve a location."
            break
        case 2:
            locationError.innerHTML =
                'The browser was unable to determine your location: ' + error.message
            break
        case 3:
            locationError.innerHTML =
                'The browser timed out before retrieving the location.'
            break
    }
}

function initMap(lat, lng) {
    var elMap = document.querySelector('.map-holder')
    var options = {
        center: { lat, lng },
        zoom: 11,
    }

    var map = new google.maps.Map(elMap, options)

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Hello World!',
    })
    google.maps.event.addListener(map, 'click', function (e) {
        console.log(e)
        console.log(map)
        var latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }
        initMap(latLng.lat, latLng.lng)
    })
}

// function saveLocation(ev) {
//   var elLocationName = document.querySelector('[name="locatin-name"]')

//   var locationName = elLocationName.value
//   if (!locationName) return
//   var elLatLocationVal = document.querySelector('.lat-location').innerText
//   var elLngLocationVal = document.querySelector('.lng-location').innerText
//   setNewLocation(elLatLocationVal, elLngLocationVal, locationName)
//   // console.log(locationName.value)
//   elLocationName.value = ''
//   renderLocation()
// }



// function onTypeInput(input) {
//   var elSaveLocationBtn = document.querySelector('.save-location-btn')
//   if (input.length) {
//     elSaveLocationBtn.removeAttribute('disabled')
//   } else {
//     elSaveLocationBtn.setAttribute('disabled', '')
//   }
// }

// function onRemoveLocation(locationId) {
//   removeLocation(locationId)
//   renderLocation()
//   toastMsg('Location Removed', `Location ID: ${locationId} Removed`)
// }

// function toastMsg(tName, msg) {
//   const toastLiveExample = document.getElementById('liveToast')
//   const toast = new bootstrap.Toast(toastLiveExample)
//   const elToast = document.querySelector('#liveToast')
//   elToast.querySelector('.me-auto').innerText = tName
//   elToast.querySelector('.toast-body').innerText = msg

//   toast.show()
// }

// function downloadCSV(elLink) {
//   const csvContent = getAsCSV()
//   // const csvContent = 'Name,Age\nPopo,12\nShraga,30\nToto,19'
//   elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
// }

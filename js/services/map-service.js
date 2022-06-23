export const mapService = {
    initMap,
    setMap,
    logChange,
    getPlaces,
    getWeatherForcast
}
import { storageService } from '/js/services/storage.service.js'
import { utills } from '/js/utills.js'
import { tripTipController } from '/js/trip-tip.controller.js'
const MAP_KEY = 'placesDB'
const W_KEY = 'b81739f6c51c127025b714ee9df6952a'
var gMarker
let gMap
let gPlaces = storageService.loadFromStorage(MAP_KEY) ? storageService.loadFromStorage(MAP_KEY) : []

function setMap() {
    getPosition()
}

var options = {
    types: ['(cities)']
}
var input = document.getElementById('searchTextField')
var autocomplete = new google.maps.places.Autocomplete(input, options)


function logChange() {
    if (!autocomplete) return
    var place = autocomplete.getPlace()

    var lat = place.geometry.location.lat()
    var lng = place.geometry.location.lng()
    console.log(place)
    console.log(place.photos[0].getUrl())
    showPlaceBySearch(place.geometry.location)
    

}



function getPosition() {
    if (!navigator.geolocation) {
        alert('HTML5 Geolocation is not supported in your browser')
        return
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}


function showLocation(position) {
    console.log(position)
    initMap(position.coords.latitude, position.coords.longitude)
    getWeatherForcast(position.coords.latitude,position.coords.longitude).then(tripTipController.renderWeather)
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
        zoom: 12
    }
    gMap = new google.maps.Map(elMap, options)

    gMarker = new google.maps.Marker({
        position: { lat, lng },
        map: gMap,
        title: 'Hello World!',
    })
    // var geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(gMap, 'click', e => {
        console.log(e)
        console.log(gMap)
        var latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }
        saveLocation(e.latLng)
        getWeatherForcast(latLng.lat,latLng.lng).then(tripTipController.renderWeather)


    })
}



function goToLocationOnMap(lat, lng, zoom) {
    var options = {
        center: { lat, lng },
        zoom: 12
    }
}


function getPlaces() {
    return gPlaces
}

function addPlace(place) {
    gPlaces.push(place)
    storageService.saveToStorage(MAP_KEY, gPlaces)
    tripTipController.renderPlaces(gPlaces)
    console.log(place)
    // console.log(getFromLocation(place))
    removeMarker()
    setMarker(place)
}

function setMarker(place) {
    gMarker = new google.maps.Marker({
        position: place,
        map: gMap,
        title: '',
    })

}

function setUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(centerMapOnUser)
    } else {
        console.log('Geolocation is not supported by this browser.')
    }
}

function centerMapOnUser(position) {
    const center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }

    console.log('Centering on', center)
    gMap.setCenter(center)
}

function createPlace(name, location) {
    return {
        id: utills.makeId(),
        name,
        location,
        lat: location.lat(),
        lng: location.lng()
    }
}

function deletePlace(placeId) {
    gPlaces = gPlaces.filter((place) => place.id !== placeId)
    removeMarker(placeId)
    storageService.saveToStorage(MAP_KEY, gPlaces)
}

function removeMarker() {
    gMarker.setMap(null)
    //   gMarkers.splice(markerIdx, 1)[0].setMap(null)
}

function showPlaceById(placeId) {
    removeMarker()
    const place = gPlaces.find((place) => place.id === placeId)
    if (!place) return
    gMap.setCenter(place.location)
    gMarker = new google.maps.Marker({
        position: place,
        map: gMap,
        title: '',
    })

}

function showPlaceBySearch(place) {
    removeMarker()
    console.log(place)
    gMap.setCenter(place)
    gMarker = new google.maps.Marker({
        position: place,
        map: gMap,
        title: '',
    })
    console.log(gMarker)
}


function saveLocation(location) {

    let placeName = prompt('enter a name for this location')
    if (!placeName) return
    const position = { lat: location.lat(), lng: location.lng() }
    const place = createPlace(placeName, location)
    addPlace(place)

}

  
  function getWeatherForcast(lat,lon) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${W_KEY}&units=metric`)
      .then(res => {
          console.log(res.data);
          return {city: res.data.name,
          country: res.data.sys.country,
          temp: {temp: res.data.main.temp, feels_like: res.data.main.feels_like},
          weather: res.data.weather[0].description,}

      })
  }
  
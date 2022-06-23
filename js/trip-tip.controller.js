import { mapService } from './services/map-service.js'
export const tripTipController = {
    renderPlaces,
    renderWeather
}

window.onSearchLoactionSubmit = onSearchLoactionSubmit
window.onClickMyLocation = onClickMyLocation
window.logChange1 = logChange1
window.renderPlaces = renderPlaces


onInit()
function onInit() {

    mapService.setMap()
    addListener()
}


function onSearchLoactionSubmit(ev, element) {
    ev.preventDefault()
    let input = element.querySelector('.search-bar-input')
    console.log(input.value)
    mapService.logChange()
}

function onClickMyLocation() {
    mapService.setMap()

}

function addListener() {
    document.querySelector('.my-location-btn').addEventListener('click', onClickMyLocation)
}

function logChange1() {
    mapService.logChange()
}


function renderPlaces(gPlaces) {
    const places = gPlaces
    console.log(gPlaces)
    let strHtmls = places.map(place => {
        return `
        <div class="locations-card">
        <div onclick="goToPlaceOnMap(${place.id})" class="location-name">
        <strong>${(place.name)}</strong>
        </div>
        <button onclick="onRemoveLocationCard(${place.id})" class="remove-location-card">Remove Location</button>
        </div>
        `
    }
    )
    const elLlocationsCardsContainer = document.querySelector('.locations-cards-container')
    elLlocationsCardsContainer.innerHTML = strHtmls.join('')
}

function onShowPlaceById(id) {

    mapService.showPlaceById(id)
}

function renderWeather(weatherInfo) {
    console.log(weatherInfo);
    document.querySelector('.whather-card').innerHTML = 
    `<h2>${weatherInfo.city}, ${weatherInfo.country}</h2>
    <div class="weather-curr-img"></div>
    <p class="curr-location-weather-info">${weatherInfo.weather.toUpperCase()}: ${weatherInfo.temp.temp} &#8451;, feels Like: ${weatherInfo.temp.feels_like} &#8451;</p>`
}





/////////



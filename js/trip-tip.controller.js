import { mapService } from './services/map-service.js'
export const tripTipController = {
    renderPlaces
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
        <small>Coordinates: Latitude ${place.location.lat} |  Latitude ${place.location.lng} </small>
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






/////////



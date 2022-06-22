import { mapService } from './services/map-service.js'


window.onSearchLoactionSubmit = onSearchLoactionSubmit
window.onClickMyLocation = onClickMyLocation
window.logChange1 = logChange1

onInit()
function onInit() {
    mapService.setMap()
    addListener()
}


function onSearchLoactionSubmit(ev, element) {
    ev.preventDefault()
    let input = element.querySelector('.search-bar')
    console.log(input.value)

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
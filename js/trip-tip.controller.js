import { mapService } from './services/map-service.js'


window.onSearchLoactionSubmit = onSearchLoactionSubmit

onInit()
function onInit() {
    mapService.setMap()
}


function onSearchLoactionSubmit(ev,element) {
    ev.preventDefault()
    let input = element.querySelector('.search-bar')
    console.log(input.value);

}


'use strict'

function initMap() {
    const location = {
        lat: 40.179188,
        lng: 44.499104
    }

    const map = new google.maps.Map(document.getElementById('erevan-map'), {
        zoom: 10,
        center: location
    })
    const marker = new google.maps.Marker({
        position: location,
        map: map
    })
}

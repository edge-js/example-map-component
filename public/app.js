document.addEventListener('alpine:init', () => {
  window.Alpine.data('map', function (data) {
    return {
      createMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmVyZCIsImEiOiJkT3J5RVZJIn0.inJu1QaHtz9g3A7lVXbNCw'
        return new mapboxgl.Map({
          container: this.$root,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: data.center,
          zoom: data.zoom
        })
      },

      addMarker(map, markerData) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(markerData.label);
        new mapboxgl.Marker().setLngLat([markerData.lon, markerData.lat]).setPopup(popup).addTo(map);
      },

      init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoibmVyZCIsImEiOiJkT3J5RVZJIn0.inJu1QaHtz9g3A7lVXbNCw'
        const map = this.createMap()

        if (data.markers && Array.isArray(data.markers)) {
          data.markers.forEach((marker) => {
            this.addMarker(map, marker)
          })
        }
      }
    }
  })
})

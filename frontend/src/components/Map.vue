<template>
  <section id="map"
    v-if="isDisplayMap"
    ref="displayMapAreaRef"
  ></section>
  <p
    v-else
  >地図の表示に失敗しました</p>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'

export default {
  props: {
    lat: {
      type: Number,
      require: true
    },
    long: {
      type: Number,
      require: true
    },
    mapPointers: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const mapLoader = new Loader({
      apiKey: import.meta.env.VITE_MAP_JS_API_KEY,
      version: "weekly"
    })
    const displayMapAreaRef = ref({})
    const isDisplayMap = ref(true)

    const initMap = () => {
      let mapOptions = {
        center: {
          lat:props.lat,
          lng:props.long
        },
        zoom: 16
      }

      let map = {}
      mapLoader.load()
      .then(google => {
        map = new google.maps.Map(displayMapAreaRef.value, mapOptions)

        let marker = {}
        let latlong = {}
        props.mapPointers.forEach(d => {
          latlong = new google.maps.LatLng(d.lat, d.long)
          marker = new google.maps.Marker({
            position: latlong,
            title: d.name
          })
          marker.setMap(map)
        })
      })
      .catch(e => {
        isDisplayMap.value = false
      })
    }

    return {
      displayMapAreaRef,
      initMap,
      isDisplayMap
    }
  }
}
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
@media (min-width: 601px) {
  #map {
    width: 70vw;
  }
}
</style>
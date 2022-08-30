<template>
  <section id="map"
    v-if="isDisplayMap"
    ref="mapRef"
  ></section>
  <p
    v-else
  >地図の表示に失敗しました</p>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    lat: {
      type: Number,
      require: true
    },
    long: {
      type: Number,
      require: true
    }
  },
  setup (props) {
    const mapLoader = new Loader({
      apiKey: import.meta.env.VITE_MAP_JS_API_KEY,
      version: "weekly"
    })
    const vuexManage = useStore()
    const mapRef = ref({})
    const isDisplayMap = ref(true)
    let marker = []

    const initMap = () => {
      let mapOptions = {
        center: {
          lat:props.lat,
          lng:props.long
        },
        zoom: 12
      }

      mapLoader.load()
      .then(google => {
        new google.maps.Map(mapRef.value, mapOptions)
      })
      .catch(e => {
        console.log(e)
        isDisplayMap.value = false
      })

      // vuexManage.getters.getMapPoints.forEach(d => {
      //   mapLatLong = new window.google.maps.LatLng(
      //     d.lat,
      //     d.long
      //   )
      //   marker.push(
      //     new window.google.maps.Marker({
      //       position: mapLatLong,
      //       map: targetMap
      //     })
      //   )
      // })
    }

    return {
      mapRef,
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
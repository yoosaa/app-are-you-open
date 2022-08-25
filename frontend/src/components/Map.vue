<template>
  <section id="map"
    ref="mapRef"
  ></section>
</template>

<script>
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
    const vuexManage = useStore()
    const mapRef = ref({})
    let marker = []
    const initMap = () => {
      let mapLatLong = new window.google.maps.LatLng(
        props.lat,
        props.long
      )
      let targetMap = new window.google.maps.Map(mapRef.value, {
        center: mapLatLong,
        zoom: 15
      })

      vuexManage.getters.getMapPoints.forEach(d => {
        mapLatLong = new window.google.maps.LatLng(
          d.lat,
          d.long
        )
        marker.push(
          new window.google.maps.Marker({
            position: mapLatLong,
            map: targetMap
          })
        )
      })
    }

    return {
      mapRef,
      initMap
    }
  }
}
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 500px;
}
</style>
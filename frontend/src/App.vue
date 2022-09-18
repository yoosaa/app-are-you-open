<template>
  <Header />
  <main>
    <SelectBox
      v-model=""
    />
    <div id="flex-wrap">
      <section
        id="cards-wrapper"
        v-if="isDisplayList"
      >
        <Cards
          :datas="displayStores"
        />
      </section>
      <p class="no-cards"
        v-else
      >{{ errorMessage }}</p>
      <Map
        :lat="latitude"
        :long="longitude"
        ref="mapRef"
      />
    </div>
  </main>
</template>

<script>
import { ref, computed, watch } from 'vue'

import Header from './components/Header.vue'
import SelectBox from './components/SelectBox.vue'
import Map from './components/Map.vue'
import Cards from './components/Cards.vue'

import MapController from './js/map.js'

export default {
  components: {
    Header,
    SelectBox,
    Map,
    Cards
  },
  setup () {
    const mapController = new MapController()
    const radius = ref(100)

    const mapRef = ref({})
    mapController.getTerminalLocation()
     .then(() => {
       mapController.getDataOfPlaceAry(radius.value)
       .then(() => {
         updateStores()
         mapRef.value.initMap()
       })
     })
     .catch(error => {
       console.error(error)
     })

    const displayStores = ref([])
    const updateStores = () => {
      displayStores.value = []
      mapController.placeAry.forEach(element => {
        let inner = []
        inner.push(element.name);
        inner.push(element['opening_hours']['open_now'] ? 'OPEN' : 'CLOSED')
        inner.push(element['opening_hours']['open_now'] ? 'green' : 'red')
        displayStores.value.push(inner)
      });
    }

    watch(radius, () => {
      mapController.getDataOfPlaceAry
      .then(() => {
        updateStores()
        mapRef.value.initMap()
      })
    })

    const isDisplayList = computed(() => {
      if (displayStores.value.length > 0) return true
      else return false
    })

    const errorMessage = computed(() => {
      if (displayStores.value.length === 0) return '条件に一致する結果がありません。'
      else return 'データが取得できませんでした。'
    })

    return {
      displayStores,
      isDisplayList,
      errorMessage,
      mapRef,
      latitude,
      longitude
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Work+Sans:wght@400;700&display=swap');

#cards-wrapper {
  width: 100vw;
  height: 10vh;
  bottom: 0;
  position: sticky;
}
.no-cards {
  font-size: 1.4rem;
  position: sticky;
  bottom: 0;
  text-align: center;
}
@media (min-width: 601px) {
  #flex-wrap {
    display: flex;
  }
  #cards-wrapper {
    width: 30vw;
    height: 100vh;
    position: relative;
    overflow-x: auto;
    overflow-y: scroll;
  }
  .no-cards {
    width: 30vw;
    margin-top: 56px;
  }
}
</style>

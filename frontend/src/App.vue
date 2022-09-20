<template>
  <Header />
  <main>
    <SelectBox
      v-model="radius"
    />
    <div id="flex-wrap">
      <section
        id="cards-wrapper"
        v-if="isDisplayList"
      >
        <Cards
          :datas="displayLists"
        />
      </section>
      <p class="no-cards"
        v-else
      >{{ errorMessage }}</p>
      <Map
        :lat="latlong.lat"
        :long="latlong.long"
        :mapPointers="mapPointers"
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

import ListDataCreater from './js/listDataCreater.js'

export default {
  components: {
    Header,
    SelectBox,
    Map,
    Cards
  },
  setup () {
    const listDataCreater = new ListDataCreater()

    const displayLists = computed(() => listDataCreater.displayList)
    const mapPointers = computed(() => listDataCreater.mapPointers)
    const isDisplayList = computed(() => {
      if (displayLists.value.length > 0) return true
      else return false
    })
    const errorMessage = computed(() => {
      if (displayLists.value.length === 0) return '条件に一致する結果がありません。'
      else return 'データが取得できませんでした。'
    })

    const latlong = ref({})
    const radius = ref(100)
    const mapRef = ref({})
    listDataCreater.getTerminalLocation()
     .then(() => {
      latlong.value = listDataCreater.latlong
      listDataCreater.getDataOfPlaceAry()
      .then(() => {
        listDataCreater.createDisplayData()
        mapRef.value.initMap()
      })
    })
    .catch(error => {
      console.error(error)
    })

    watch(radius, () => {
      listDataCreater.radius = radius.value
      listDataCreater.getDataOfPlaceAry()
      .then(() => {
        listDataCreater.createDisplayData()
        mapRef.value.initMap()
      })
    })


    return {
      displayLists,
      isDisplayList,
      errorMessage,
      radius,
      mapRef,
      latlong,
      mapPointers
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

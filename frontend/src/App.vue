<template>
  <Header />
  <main>
    <SelectBox />
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
import { useStore } from 'vuex'

import Header from './components/Header.vue'
import SelectBox from './components/SelectBox.vue'
import Map from './components/Map.vue'
import Cards from './components/Cards.vue'

export default {
  components: {
    Header,
    SelectBox,
    Map,
    Cards
  },
  setup () {
    const vuexManage = useStore()
    const latitude = ref(null)
    const longitude = ref(null)
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(pos => {
          let cord = pos.coords
          latitude.value = Number(cord.latitude)
          longitude.value = Number(cord.longitude)

          vuexManage.commit('setLocation', `${latitude.value},${longitude.value}`)
          resolve(`${latitude.value},${longitude.value}`)
        }, () => {
          alert('位置情報の取得に失敗しました。')
          reject()
        }, options)
      })
    }

    const mapRef = ref({})
    getLocation()
     .then(() => {
       vuexManage.dispatch('getPlaces')
       .then(() => {
         updateStores()
         mapRef.value.initMap()
       })
     })
     .catch(error => {
       console.error(error)
     })

    const radius = computed(() => { return vuexManage.getters.getRadius })

    const displayStores = ref([])
    const updateStores = () => {
      displayStores.value = []
      const stores = vuexManage.getters.getPlaces
      stores.forEach(element => {
        let inner = []
        inner.push(element.name);
        inner.push(element['opening_hours']['open_now'] ? 'OPEN' : 'CLOSED')
        inner.push(element['opening_hours']['open_now'] ? 'green' : 'red')
        displayStores.value.push(inner)
      });
    }

    const errorMessage = ref('')
    const isDisplayList = computed(() => {
      if (displayStores.value.length > 0) {
        return true
      } else if (displayStores.value.length === 0) {
        errorMessage.value = '条件に一致する結果がありません。'
        return false
      } else {
        errorMessage.value = 'データが取得できませんでした。'
        return false
      }
    })

    watch(radius, () => {
      vuexManage.dispatch('getPlaces')
      .then(() => {
        updateStores()
        mapRef.value.initMap()
      })
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

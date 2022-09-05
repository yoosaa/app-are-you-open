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
      sessionStorage.setItem('stores', JSON.stringify(vuexManage.getters.getPlaces))
      const stores = vuexManage.getters.getPlaces
      console.log(stores)
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

main {
  padding-bottom: 48px;
}
#flex-wrap {
  display: flex;
}
#cards-wrapper {
  position: sticky;
  top: 0;
  left: 0;
  width: 30vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, .8);
}
.no-cards {
  font-size: 1.4rem;
  width: 30vw;
  margin-top: 56px;
  text-align: center;
}
@media (min-width: 601px) {
  main {
    padding-left: 24px;
  }
}
</style>

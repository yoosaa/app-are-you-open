<template>
  <Header />
  <main>
    <SelectBox />
    <section
      v-if="isDisplayList"
    >
      <Cards
        :datas="displayStores"
      />
    </section>
    <p class="no-cards"
      v-else
    >データが取得できませんでした。</p>
    <Map
      :lat="latitude"
      :long="longitude"
      ref="mapRef"
    />
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
    let latitude = ref(null)
    let longitude = ref(null)
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
       console.log(error)
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
        console.log(displayStores)
        displayStores.value.push(inner)
      });
    }

    const isDisplayList = computed(() => {
      if (displayStores.value.length > 0) return true
      else return false
    })

    watch(radius, () => {
      vuexManage.dispatch('getPlaces')
      .then(() => {
        updateStores()
      })
    })

    return {
      displayStores,
      isDisplayList,
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
.no-cards {
  font-size: 1.4rem;
  width: 100%;
  margin-top: 56px;
  text-align: center;
}
</style>

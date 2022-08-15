<template>
  <Header />
  <main>
    <SelectBox />
    <section
      v-if="isListDisplay"
    >
      <ul id="cards">
        <li class="card"
          v-for="val in displayStores"
          :key="val[0]"
        >
          <figure class="card-image"><img :src="val[2]" alt="項目イメージ"></figure>
          <div class="card-contents">
            <h3 class="card-name">{{ val[0] }}</h3>
            <p class="card-close">
              <span class="card-close-time">{{ val[1] }}</span>
            </p>
            <p class="card-close-limit"></p>
          </div>
        </li>
      </ul>
      <p class="proviso">※営業時間の情報が存在するもののみ、記載しています。</p>
    </section>
    <p class="no-cards"
      v-else
    >データが取得できませんでした。</p>
  </main>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'

import Header from './components/Header.vue'
import SelectBox from './components/SelectBox.vue'

export default {
  components: {
    Header,
    SelectBox
  },
  setup () {
    const vuexManage = useStore()
    const stores = ref([])

    getLocation()
     .then(latLong => {
       vuexManage.dispatch('getPlaces')
       .then(() => {
         updateStores()
       })
     })
     .catch(error => {
       console.log(error)
     })

    const radius = computed(() => {
      return vuexManage.getters.getRadius
    })

    watch(radius, () => {
      vuexManage.dispatch('getPlaces')
      .then(() => {
        updateStores()
      })
    })

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(pos => {
          let cord = pos.coords
          const latitude = cord.latitude
          const longitude = cord.longitude

          vuexManage.commit('setLocation', `${latitude},${longitude}`)
          resolve(`${latitude},${longitude}`)
        }, () => {
          alert('位置情報の取得に失敗しました。')
          reject()
        }, options)
      })
    }

    const displayStores = ref([])
    const updateStores = () => {
      sessionStorage.setItem('stores', JSON.stringify(vuexManage.getters.getStores))
      stores.value = vuexManage.getters.getStores
      displayStores.value = []
      stores.value.forEach(element => {
        let inner = []
        inner.push(element.name);
        inner.push(element['opening_hours']['open_now'] ? '営業中' : '営業時間外')
        inner.push(element['photo_url'])
        displayStores.value.push(inner)
      });
    }

    const isListDisplay = computed(() => {
      if (displayStores.value.length > 0) return true
      else return false
    })

    return {
      displayStores,
      isListDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap');

main {
  padding-bottom: 48px;
}
#cards {
  margin-top: 56px;
}
.card {
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 80%;
  margin: 24px auto 1em auto;
  padding-right: 6px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-weight: 600;
  overflow: hidden;
  background-color: #fff;
  &-image {
    width: 30%;
    height: 100%;
    position: relative;
    display: block;
    aspect-ratio: 327 / 256;
    margin-right: 24px;
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      margin: auto;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transform: scale(1.3);
    }
  }
  &-contents {
    width: 70%;
  }
  &-name {
    font-size: 1rem;
    margin-bottom: 8px;
  }
  &-close {
    font-size: 1.6rem;
    &-time {
      color: #FC1055;
;
    }
  }
}
.proviso {
  margin-top: 24px;
  margin-right: 2%;
  text-align: right;
  font-family: 'Work Sans', sans-serif;
  font-size: 1rem;
  font-weight: 600;
}
.no-cards {
  font-size: 1.4rem;
  width: 100%;
  margin-top: 56px;
  text-align: center;
}
@media (min-width: 601px) {
  #cards {
    width: 85%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    &::after {
      content:"";
      display: block;
      width: calc((100% - 12px) / 3);
    }
  }
  h2 {
    width: 85%;
  }
  .card {
    display: block;
    position: relative;
    width: calc((100% - 3em) / 3);
    margin: 0 0 2em 0;
    padding: 0;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 80%;
      border-radius: 20px;
      z-index: 1;
      background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8274261182108626) 60%, rgba(255,255,255,0) 100%);
    }
    &-name {
      font-size: .8rem;
    }
    &-image {
      width: 100%;
    }
    &-contents {
      position: absolute;
      bottom: 16px;
      margin: auto;
      left: 0;
      right: 0;
      letter-spacing: .07em;
      width: 85%;
      z-index: 2;
    }
    &-close {
      font-size: 1rem;
    }
  }
}
@media (min-width: 1026px) {
  .card {
    &-contents {
      width: 80%;
      bottom: 20px;
    }
    &-name {
      font-size: .9rem;
    }
    &-close {
      font-size: 1.4rem;
    }
  }
}
</style>

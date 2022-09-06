<template>
  <ul id="cards">
    <li class="card"
      v-for="val in displayDatas"
      :key="val[0][0]"
    >
      <p
        :class="['card-text', val[2]]"
      >
        <span class="card-text-inner">{{ val[1] }}</span>
      </p>
      <div class="card-contents">
        <h3 class="card-name">{{ val[0] }}</h3>
      </div>
    </li>
  </ul>
  <p class="proviso">※営業時間の情報が存在するもののみ、記載しています。</p>
</template>

<script>
import { ref, watch, onUpdated } from 'vue'

export default {
  props: {
    datas: {
      type: Object,
      require: true
    }
  },
  setup (props) {
    const displayDatas = ref([])
    displayDatas.value = props.datas

    watch(() => props.datas, (newProps, _) => {
      console.log(newProps)
      displayDatas.value = newProps
    },{ deep: true })

    onUpdated(() => {
      console.log('updated')
    })

    return { displayDatas }
  },
}
</script>

<style lang="scss">
#cards {
  margin-top: 56px;
  .card {
    font-family: 'Work Sans', sans-serif;
    font-weight: 400;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    overflow: hidden;
    background-color: #fff;
    &-contents {
      width: 65%;
    }
    &-name {
      font-size: 1rem;
    }
    &-text {
      width: 35%;
      height: 100%;
      font-size: 1.2rem;
      text-align: center;
      position: relative;
      display: block;
      margin-right: 20px;
      color: #fff;
      &.red {
        background-image: linear-gradient(90deg, rgba(252, 16, 85, 1), rgba(255, 255, 255, 1));
      }
      &.green {
        background-image: linear-gradient(90deg, rgba(16, 252, 48, 1), rgba(255, 255, 255, 1));
      }
      &-inner {
        position: relative;
        padding: 12px 0;
        display: inline-block;
      }
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
@media (min-width: 601px) {
  #cards {
    width: 85%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    .card {
      position: relative;
      margin: 0 0 2em 0;
      padding: 0;
      &-name {
        font-size: 1rem;
        margin-bottom: 8px;
      }
      &-contents {
        margin: auto;
        letter-spacing: 0.07em;
        width: 85%;
      }
      &-text {
        width: 100%;
        text-align: start;
        font-family: 'Oswald', sans-serif;
        &-inner {
          position: absolute;
          display: inline;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  h2 {
    width: 85%;
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
    &-text {
      font-size: 1.4rem;
    }
  }
}
</style>

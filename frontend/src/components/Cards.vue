<template>
  <ul id="cards">
    <li
      :class="['card', val[2]]"
      v-for="val in displayDatas"
      :key="val[0][0]"
    >
      <p class="card-text">
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
      displayDatas.value = newProps
    },{ deep: true })

    return { displayDatas }
  },
}
</script>

<style lang="scss">
#cards {
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
  .card {
    min-width: 30vw;
    width: 100%;
    padding: 4px;
    font-family: 'Work Sans', sans-serif;
    font-weight: 400;
    align-items: center;
    font-weight: 600;
    background-color: #fff;
    border-right: 1px solid rgba(0 , 0 , 0, .5);
    &:first-child {
      border-right: none;
    }
    &.red {
      background: rgba(252, 16, 85, .5);
    }
    &.green {
      background: rgba(16, 252, 48, .5);
    }
    &-name {
      font-size: 1rem;
    }
    &-text {
      font-size: 1.2rem;
      position: relative;
      display: block;
      margin-right: 20px;
      color: #fff;
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
    display: block;
    overflow-x: auto;
    .card {
      min-width: none;
      min-height: 80px;
      display: block;
      border-top: 1px solid rgba(0 , 0 , 0, .5);
      border-right: none;
      &:first-child {
        border-top: none;
      }
      &-name {
        font-size: 1rem;
        margin-bottom: 8px;
      }
      &-text {
        width: 100%;
        text-align: start;
        font-family: 'Oswald', sans-serif;
      }
      &-contents {
        margin-top: 8px;
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

<template>
  <div class="cp_ipselect">
    <select class="cp_sl06"
      @change="setRadius"
    >
      <option value="100" selected>100m</option>
      <option value="500">500m</option>
      <option value="1000">1km</option>
      <option value="1500">1.5km</option>
      <option value="2000">2km</option>
      <option value="2500">2.5km</option>
      <option value="3000">3km</option>
    </select>
    <span class="cp_sl06_highlight"></span>
    <span class="cp_sl06_selectbar"></span>
    <label class="cp_sl06_selectlabel">Choose Radius</label>
  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
    setup () {
        const vuexManage = useStore()
        const setRadius = e => {
            vuexManage.commit('setRadius', e.target.value)
        }

        return {
            setRadius
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap');

.cp_ipselect {
  position: relative;
  width: 30%;
  margin-top: 75px;
  margin-left: calc((100% - 85%) / 2);
  text-align: center;
  font-family: 'Work Sans', sans-serif;
  .cp_s106 {
    appearance: none;
  }
  select {
    &::-ms-expand {
      display: none;
    }
  }
  &::after {
    position: absolute;
    top: 18px;
    right: 10px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
.cp_sl06 {
  position: relative;
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 10px 10px 10px 0;
  font-size: 1.2rem;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid rgba(0,0,0, 0.3);
  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(0,0,0, 0);
  }
  &_selectlabel {
    color: rgba(0,0,0, 0.5);
    font-size: 1.2rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 10px;
    transition: 0.2s ease all;
    font-family: 'Work Sans', sans-serif;
    font-weight: 600;
  }
  &_selectbar {
    position: relative;
    display: block;
    width: 100%;
    &:before,
    &:after {
      content: '';
      height: 2px;
      width: 0;
      bottom: 1px;
      position: absolute;
      background: #da3c41;
      transition: 0.2s ease all;
    }
    &::before {
      left: 50%;
    }
    &::after {
      right: 50%;
    }
  }
  &_highlight {
    position: absolute;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }
}
.cp_sl06:focus ~ .cp_sl06_selectlabel, .cp_sl06:valid ~ .cp_sl06_selectlabel {
  color: #da3c41;
  top: -20px;
  transition: 0.2s ease all;
  font-size: 1rem;
}
.cp_sl06:focus ~ .cp_sl06_selectbar:before, .cp_sl06:focus ~ .cp_sl06_selectbar:after {
  width: 50%;
}
</style>

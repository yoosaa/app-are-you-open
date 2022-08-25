import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  strict: true,
  state: {
    response: {},
    places: [],
    mapPoints: [],
    location: '',
    radius: 100,
    language: 'ja'
  },
  mutations: {
    setResponse: function (state, res) {
      state.response = res
    },
    setFilterdPlaces: function (state, origin) {
      state.places = origin.data.results.filter(item => {
        return item['opening_hours'] !== undefined
      })
    },
    setMapPoints: function (state, places) {
      let pushItem = {
        name: '',
        lat: null,
        long: null
      }
      state.mapPoints = []
      places.forEach(place => {
        pushItem.name = place.name
        pushItem.lat = Number(place.geometry.location.lat)
        pushItem.long = Number(place.geometry.location.lng)
        state.mapPoints.push(pushItem)
      })
    },
    setRadius: function (state, radius) {
      state.radius = radius
    },
    setLocation: function (state, location) {
      state.location = location
    }
  },
  getters: {
    getLocation: function (state) {
      console.log(state.location)
      return state.location
    },
    getRadius: function (state) {
      return state.radius
    },
    getPlaces: function (state) {
      return state.places
    },
    getMapPoints: function (state) {
      return state.mapPoints
    }
  },
  actions: {
    getPlaces: async function (context) {
      const config = {
        method: 'get',
        url: 'http://localhost/api/places',
        params: {
          'latlong': context.state.location,
          'radius': context.state.radius
        }
      }

      console.log(config)

      await axios(config)
        .then(function (response) {
          context.commit('setFilterdPlaces', response)
          context.commit('setMapPoints', context.state.places)
        })
        .catch(function (error) {
          console.log(`ERROR => ${error}`)
        })
    }
  }
})

import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
    strict: true,
    state: {
        userName: '',
        stores: [],
        favoriteStores: [],
        location: '',
        radius: 100,
        language: 'ja'
    },
    mutations: {
        setStores: function (state, store) {
            state.stores = store
        },
        setRadius: function (state, radius) {
            state.radius = radius
        },
        addFavorite: function (state, favorite) {
            state.favoriteStores.push(favorite)
        },
        removeFavorite: function (state, target) {
            state.favoriteStores = state.favoriteStores.filter(store=>{ store === target })
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
        getStores: function (state) {
            return state.stores
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

            await axios(config)
            .then(function (response) {
                let res = response.data.results.filter(item => {
                    return item['opening_hours'] !== undefined
                })
                context.commit('setStores', res)
            })
            .catch(function (error) {
                console.log(`ERROR => ${error}`)
            })
        }
    }
})

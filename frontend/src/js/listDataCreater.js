import axios from 'axios'

export default class listDataCreater {
  constructor () {
    this.latlong = {
      lat: null,
      long: null
    }
    this.places = []
    this.mapPointers = []
    this.radius = null
    this.displayList = []
  }

  createDisplayData () {
    this.places.forEach(place => {
      let inner = []
      inner.push(place.name);
      inner.push(place['opening_hours']['open_now'] ? 'OPEN' : 'CLOSED')
      inner.push(place['opening_hours']['open_now'] ? 'green' : 'red')
      this.displayList.push(inner)
    })
  }

  getTerminalLocation () {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0
      };

      try {
        navigator.geolocation.getCurrentPosition(pos => {
          let cord = pos.coords
          this.latlong.lat = Number(cord.latitude)
          this.latlong.long = Number(cord.longitude)
          resolve()
        }, () => {
          alert('位置情報の取得に失敗しました。')
          reject()
        }, options)
      }
      catch {
        alert('位置情報の取得を許可してください')
      }
    })
  }

  getPlaceAry (data) {
    this.places = data.filter(item => item['opening_hours'] !== undefined)
  }

  setMapPoints () {
    this.places.forEach(place => {
      const item = {}
      item.name = place.name
      item.lat = Number(place.geometry.location.lat)
      item.long = Number(place.geometry.location.lng)
      this.mapPointers.push(item)
    })
  }

  async getDataOfPlaceAry () {
    const config = {
      method: 'get',
      url: 'http://localhost:80/api/places',
      params: {
        'latlong': `${this.latlong.lat},${this.latlong.long}`,
        'radius': this.radius
      }
    }

    await axios(config)
      .then(response => {
        console.log(response)
        this.getPlaceAry(response.data.results)
        this.setMapPoints()
      })
      .catch(error => {
        console.error(error)
      })
  }
}
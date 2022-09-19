import axios from 'axios'

export default class listDataCreater {
  constructor () {
    this.latlong = {
      lat: null,
      long: null
    }
    this.placeAry = []
    this.mapPointerAry = []
    this.radius = null
  }

  createDisplayData () {
    const returnDataAry = []
    this.placeAry.forEach(place => {
      let inner = []
      inner.push(place.name);
      inner.push(place['opening_hours']['open_now'] ? 'OPEN' : 'CLOSED')
      inner.push(place['opening_hours']['open_now'] ? 'green' : 'red')
      returnDataAry.push(inner)
    })
    return returnDataAry
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
    return data.filter(item => item['opening_hours'] !== undefined)
  }

  setMapPoints () {
    const mapPointers = []
    this.placeAry.forEach(place => {
      const item = {}
      item.name = place.name
      item.lat = Number(place.geometry.location.lat)
      item.long = Number(place.geometry.location.lng)
      mapPointers.push(item)
    })
    return mapPointers
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

    console.log(config)

    await axios(config)
      .then(response => {
        console.log(response)
        this.placeAry = this.getPlaceAry(response.data.results)
        this.mapPointerAry = this.setMapPoints()
      })
      .catch(error => {
        console.error(error)
      })
  }
}
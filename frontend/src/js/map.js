export default class mapDataController {
  constructor () {
    this.latlong = {
      lat: null,
      long: null
    }
    this.placeAry = []
    this.mapPointerAry = []
    this.#responseGcpPlaces = {}
    this.radius = 100
  }

  createDisplayData () {
    const returnData = []
    this.placeAry.forEach(place => {
      let inner = []
      inner.push(place.name);
      inner.push(place['opening_hours']['open_now'] ? 'OPEN' : 'CLOSED')
      inner.push(place['opening_hours']['open_now'] ? 'green' : 'red')
      returnData.push(inner)
    })
    return returnData
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

  #getPlaceAry (data) {
    return data.results.filter(item => item['opening_hours'] !== undefined)
  }

  #setMapPoints () {
    mapPointers = []
    this.places.forEach(place => {
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

    await axios(config)
      .then(function (response) {
        this.#responseGcpPlaces = response
        this.#placeAry = this.#getPlaceAry(response.data)
        this.mapPointerAry = this.#setMapPoints()
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}
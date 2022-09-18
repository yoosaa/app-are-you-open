export default class mapDataController {
  constructor () {
    this.location = {}
    this.lat = null
    this.long = null
    this.placeAry = []
    this.mapPointerAry = []
    this.#responseGcpPlaces = {}
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
          this.lat = Number(cord.latitude)
          this.long = Number(cord.longitude)
          this.location = `${latitude.value},${longitude.value}`

          resolve(`${latitude.value},${longitude.value}`)
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

  #setPlaceAry (data) {
    this.placeAry = data.results.filter(item => item['opening_hours'] !== undefined)
  }

  #setMapPoints () {
    this.mapPointerAry = []
    this.places.forEach(place => {
      const item = {}
      item.name = place.name
      item.lat = Number(place.geometry.location.lat)
      item.long = Number(place.geometry.location.lng)
      this.mapPointerAry.push(item)
    })
  }

  async getDataOfPlaceAry (radius) {
    const config = {
      method: 'get',
      url: 'http://localhost:80/api/places',
      params: {
        'latlong': this.location,
        'radius': radius
      }
    }

    await axios(config)
      .then(function (response) {
        this.#responseGcpPlaces = response
        this.#setPlaceAry(response.data)
        this.#setMapPoints()
      })
      .catch(function (error) {
        console.error(error)
      })
  }
}
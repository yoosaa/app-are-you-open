export class map {
  constructor (location) {
    this.location = location
    this.lat = null
    this.long = null
    this.placeAry = []
    this.mapPointAry = []
    this.#responseGcpPlaces = {}
    this.radius = 100
  }

}
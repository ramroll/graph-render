const array = require('./array')

class VizManager {
  constructor(){
    this.arrayList = []
  }
  createArray(n, func) {
    this.arrayList.push(array(n, func, this))
  }

  updateBindVar(id, vals) {

  }
}

module.exports = VizManager

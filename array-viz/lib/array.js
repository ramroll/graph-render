
let queue = []
let id = 0
function array (data, cursor) {

  class VizArray{

    constructor(data){

      this.data = [...data]
      this.initialData = [...data]
      this.handlers = []
      this.queue = []
      this.cursor = {...cursor}
      this.id = ++id
    }




    run = ({action, data}) => {
      this.handlers.forEach(h => {
        h(action, data)
      })
    }

    registerHandler(handler){
      this.handlers.push(handler)
      return () => {
        this.handlers = this.handlers.filter(x => x !== handler)
      }
    }


    updateCursor(obj) {
      this.notifyChange({
        type : 'CURSOR',
        cursor : obj
      })
    }


    swap(i, j) {
      const t = this.data[i]
      this.data[i] = this.data[j]
      this.data[j] = t

      this.notifyChange({
        type : 'SWAP',
        idx : [i, j]
      })
    }

    notifyChange = action => {
      queue.push({
        id : this.id,
        action,
        target : this,
        data: [...this.data]
      })
    }

  }


  const handler = {
    get : function(target, name) {
      if(name === 'length') {return target.data.length}
      if(name.match(/^\d+$/)) {
        name = parseInt(name)
        return target.data[name]
      }
      return target[name]
    },
    set : function(target, name, value) {
      const idx = parseInt(name)
      target.data[idx] = value
      target.notifyChange({
        type: 'VALUE',
        idx,
        value
      })
      return true
    }

  }
  return new Proxy(new VizArray(data), handler)
}

array.trigger = () => {
  const item = queue.shift()
  if (!item) {
    return
  }
  item.target.run(item)
}

module.exports = array
export default function (data) {

  class VizArray{

    constructor(data){
      this.data = [...data]
      this.handlers = []
      this.queue = []

    }


    start(){

      setInterval( () => {
        const action = this.queue.shift()

        this.handlers.forEach(h => {
          h
        })


      }, 1000)
    }

    registerHandler(handler){
      this.handlers.push(handler)
      return () => {
        this.handlers = this.handlers.filter(x => x !== handler)
      }
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

      this.queue.push({action, data : [...this.data]})
      // this.handlers.forEach(h => {
      //   return {
      //     data: [...this.data],
      //     action
      //   }
      // })
    }

  }


  const handler = {
    get : function(target, name) {
      if(name === 'data') {
        return target.data
      }
      return target.data[name]
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



const defaultOptions = {
  interval: 60,
  orders : []
}
class Render {


  lines = []

  constructor(source_code, options) {
    this.lines = source_code.split('\n')
    this.options = { ...defaultOptions, ...options }
    this.paused = false
  }


  play = () => {
    this.playing = []
    this.playingNo = null

    this.audio = new Audio('/assets/laptop-keyboard-1.mp3')
    this.audio.volume = 0.2
    // this.audio.play()
    


    const orders = this.options.orders.slice()
      .concat(
        [...Array(this.lines.length)].map((_, i) => {
          if (this.options.orders.indexOf(i) === -1) {
            return i 
          } else {
            return null 
          }
        }).filter(x => x !== null)
      )
      
    console.log(orders)
    this.orders = orders 
    this.history = []
    // this.tick()
  }

  back(){

    this.audio.pause()
    const {no, lines} = this.history.pop()
    this.playing = lines
    this.orders.unshift(no)
    this.options.tickHandler && this.options.tickHandler(
      lines,
      0,
      0
    )

  }


  tick = () => {

    if (this.paused) {
      return
    }
    const result = this.next()

    switch (result.code) {
      case 'TICK':
        this.options.tickHandler &&
          this.options.tickHandler(this.playing, result.line, result.at)
        setTimeout(() => {
          this.tick()
        }, this.options.interval - 30 + Math.random() * 60)
        break
      case 'PAUSE':
        this.audio.pause()
        this.paused = true
        this.options.pauseHandler &&
          this.options.pauseHandler()
        break
      case 'STOP':
        this.options.finishHandler &&
          this.options.finishHandler()
        break
    }
  }

  resume() {
    this.paused = false
    this.audio.play()
    this.tick()
  }

  next = () => {
    if (this.playingNo === null) {
      this.currentNo = this.orders.shift()
      this.history.push({
        no : this.currentNo,
        lines : JSON.parse( JSON.stringify( this.playing ) )
      })
      if (this.currentNo === undefined) {
        this.audio.pause()
        return {code : 'STOP'}
      }
      let p = this.playing.length
      while (p > 0 && this.playing[p-1].i > this.currentNo) {
        this.playing[p] = this.playing[p-1]
        p--
      }
      this.playing[p] = {
        i: this.currentNo,
        content: ''
      }
      this.playingNo = p
    }

    const playingLine = this.playing[this.playingNo]
    const currentLine = this.lines[this.currentNo]
    if (playingLine.content.length < currentLine.length) {
      playingLine.content += currentLine[playingLine.content.length]
    } else {
      this.currentNo = null
      this.playingNo = null
      return {code : 'PAUSE'}
    }
    return {code : 'TICK', line : this.playingNo, at : playingLine.content.length - 1}
  }




}


export default Render
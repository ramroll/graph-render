import * as d3 from 'd3'

d3.select('body')
  .append('canvas')
  .attr('id', 'canvas')
  .attr('class', 'draw')
  .attr('width', document.documentElement.clientWidth)
  .attr('height', document.documentElement.clientHeight)


  
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.lineWidth = 3

const colors = ['red', '#0018c5']

let lastX = null
let lastY = null
let down = false
let c = 0
canvas.addEventListener('mousedown', (e) => {
  const {clientX, clientY} = e
  lastX = clientX
  lastY = clientY
  down = true
})

document.addEventListener('keyup', e => {
  if(e.keyCode === 192) {
    ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
  }
  console.log(e.keyCode)
})

canvas.addEventListener('mouseup', (e) => {
  lastX = null
  lastY = null
  down = false
})

canvas.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e

  if (down) {
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(clientX, clientY)
    ctx.strokeStyle = colors[c]
    ctx.stroke()
  }
  lastX = clientX
  lastY = clientY
})



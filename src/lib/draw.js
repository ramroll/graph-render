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

const colors = ['#23e82a', '#01f4df',  'red', '##c0f201', '#ff4800', '#ffd602', '#ff00ea']

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
  console.log(e.keyCode)
  if(e.keyCode >= 49 && e.keyCode <= 58) {
    c = e.keyCode - 49
  }
  if(e.keyCode === 192) {
    ctx.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
  }

  if(e.keyCode === 67) {
    c++
  }
  
  console.log(e.keyCode)
})

canvas.addEventListener('mouseup', (e) => {
  lastX = null
  lastY = null
  down = false
})

function randInt(n) {
  return Math.floor( Math.random() * n ) + 1
}

canvas.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e

  if (down) {
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(clientX, clientY)
    ctx.moveTo(lastX + randInt(1), lastY + randInt(1))
    ctx.lineTo(clientX+ randInt(1), clientY + randInt(2))
    ctx.strokeStyle = colors[c % colors.length]
    ctx.stroke()
  }
  lastX = clientX
  lastY = clientY
})



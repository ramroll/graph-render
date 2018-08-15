import './plot.styl'
import qs from 'qs'
import * as d3 from 'd3'

const query = qs.parse(location.search.substr(1))

// This is for convenience - we'll use it to create the data
const  sin = Math.sin

// Setup chart dimensions and margins
const  margin = { top: 20, right: 20, bottom: 20, left: 20 }
const W = document.documentElement.clientWidth
const H = document.documentElement.clientHeight
const  width = W - margin.left - margin.right
const  height = H - margin.top - margin.bottom

// Setup scales - notice no domain, we'll do that on chart render
const  x = d3.scaleLinear().range([400, 900])
const  y = d3.scaleLinear().range([600, 100])

const M = parseInt( query.m || 10 )

const colors = ['#23e82a', '#01f4df',  'red', '##c0f201', '#ff4800', '#ffd602', '#ff00ea']

// Setup line generator
const  line = d3.line()
  .x(function (d) { return x(d.x) })
  .y(function (d) { return y(d.y) })

// Setup svg element
const  svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

// Create axes
svg.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + 600 + ')')
  .call(d3.axisBottom(x).tickFormat(d => {
    return d * M
  }))

svg.append('g')
  .attr('class', 'axis axis--y')
  .attr('transform', 'translate(' + 400 + ',0)')
  .call(d3.axisLeft(y).tickFormat(d=>d*M))

x.domain([0, M])
y.domain([0, M])


document.querySelector('textarea').value = localStorage['l-text'] || ''
// Draw chart

function draw() {


  const text = document.querySelector('textarea').value
  const functions = text.split('\n').filter(x => x).map(f => eval(f))


  document.querySelectorAll('.g-line').forEach(x => x.remove())

  localStorage['l-text'] = text

  if(functions.length === 0) {return}

  let c = 0
  const datas = functions.forEach(f => {
    const color = colors[c++ % colors.length]
    const data = d3.range(0, M, 0.01).map(v => {
      return {
        x: v,
        y: f(v)
      }
    }).filter(d => d.y <= M && d.x <= M)


    const xMax = Math.abs(d3.max(data, function (d) { return d.x }))
    const yMax = Math.abs(d3.max(data, function (d) { return d.y }))
    const paths = svg.append('g')
      .attr('class', 'g-line')
      .selectAll('path.line')
      .data([data])
    paths.enter().append('path')
      .attr('class', 'line')
      .merge(paths)
      .transition()
      .duration(500)
      .attr('d', line)
      .attr('stroke', color)
  })

}


document.querySelector('button').addEventListener('click', draw)
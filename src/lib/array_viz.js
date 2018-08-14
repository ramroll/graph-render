import * as d3 from 'd3'
import './viz.styl'
import deepEqual from 'deep-equal'

const G = 0.2

function render_matrix(i, arrays, styleRender = null) {
  const list = []

  const L = 1

  const row = arrays[i]

  for (let j = 0; j < row.list.length; j++) {

    list.push({
      x: j * L + Math.max((j), 0) * G,
      y: L,
      v: row.list[j],
      style: styleRender ? styleRender(row.list[j], row, j) : null,
      highlight: row.highlights === j || row.highlights.indexOf(j) !== -1,
      type: 'item'

    })
  }
  return list
}

export default (rows, styleRender = () => {
  return 'fill:white;stroke:black'

}) => {

  const L = 96

  const num = rows[0].list.length
  const l = d3.scaleLinear()
    .domain([0, 1])
    .range(0, L)


  const W = document.documentElement.clientWidth
  const H = document.documentElement.clientHeight
  const g = d3.select('body')
    .append('svg')
    .attr('width', W)
    .attr('height', H)
    .append('g')


  const totalW = num * L + (num - 1) * G * L
  const totalH = L / 2
  const g1 = g.append('g')
    .attr('transform', `translate(${W / 2 - totalW / 2},${H / 2 - totalH / 2})`)


  let i = 0
  let inited = false
  let lastRow = null
  function next() {
    const row = rows[i]
    const renderSet = render_matrix(i++, rows, styleRender)
    const changes = lastRow ? compareChange(lastRow.list, row.list) : []
    lastRow = row

    if(!inited) {
      inited = true
      const ceil = g1.selectAll('g.g-ceil')
        .data(renderSet)
        .enter()
        .append('g')
        .attr('class', 'g-ceil')
        .attr('transform', d => `translate(${d.x * L}, ${0})`)

      const rect = ceil.append('rect')
        .attr('width', L)
        .attr('class', 'ceil')
        .attr('height', L)
        .attr('stroke-width', '1')

      ceil.append('text')
        .attr('x', L / 2)
        .attr('y', L / 2 + 16)
        .attr('style', 'font-size:48px')
        .attr('text-anchor', 'middle')


    }
    function update() {

      g1.selectAll('g.g-ceil rect')
        .data(renderSet)
        .attr('style', (d) => {
          return d.style || `fill:white;stroke:black;`
        })

      let text = g1.selectAll('g.g-ceil text')
        .data(renderSet)
        .text(d => d.v)

      if(changes.length > 0) {
        text = text.attr('fill', d => changes.indexOf(d) !== -1 ? 'red' : 'black')
          // .transition()
          // .duration(1000)
      }

      text.attr('fill', d => {
        if (d.highlight) {
          return 'white'
        }
        return 'black'
      })
    }

    update()
  }
  return next
}


function compareChange(a, b) {
  const keys = []
  for(let i = 0; i < a.length; i++) {
    if(a[i] !== b[i]) {
      keys.push(b[i])
    }
  }
  return keys
}
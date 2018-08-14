import * as d3 from 'd3'


document.querySelector('#btn').remove()
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
    .attr('transform', `translate(${W/2 - totalW / 2},${H/2 - totalH /2})`)


  let i = 0
  let inited = false
  function next() {
    const renderSet = render_matrix(i++, rows, styleRender)

    if (!inited) {

      const ceil = g1.selectAll('g.g-ceil')
        .data(renderSet)
        .enter()
        .append('g')
        .attr('class', 'g-ceil')
        .attr('transform', d => `translate(${d.x * L}, ${0})`)


      ceil.append('rect')
        .attr('width', L)
        .attr('class', 'ceil')
        .attr('height', L)
        .attr('style', (d) => {
          return d.style || `fill:white;stroke:black;`
        })
        .attr('stroke-width', '1')

      ceil.append('text')
        .text(d => d.v)
        .attr('x', L / 2)
        .attr('y', L / 2 + 16)
        .attr('style', 'font-size:48px')
        .attr('text-anchor', 'middle')
        .attr('fill', d => {
          if (d.highlight) {
            return 'white'
          }
          return 'black'
        })

    } else {
      g1.selectAll('g.g-ceil')
        .data(renderSet)
        .update()

    }
  }

  return next

}
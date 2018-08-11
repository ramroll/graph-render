import * as d3 from 'd3'


function render_matrix(arrays) {
  const list = []

  const L = 1
  const G = 0.2

  for(let i = 0; i < arrays.length; i++) {
    const row = arrays[i]

    for(let j = 0; j < row.length; j++) {

      list.push({
        x : j*L + Math.max((j),0)*G,
        y : i*L + Math.max((i),0)*L,
        v : row[j],
        type : 'item'

      })
    }
  }
  return list
}




export default () => {
  const matrix = [
    [8, 11, 2, 5, 7, 3, 1, 2],
    [1,2,4,3,5, 4, 0 , 2],
    [1,2,4,3,5, 4, 0 , 2],
    [1,2,4,3,5, 4, 0 , 2],
  ]

  const L = 48

  const l = d3.scaleLinear()
    .domain([0, 1])
    .range(0, L)
  const renderSet = render_matrix(matrix)

  const g = d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 800)
    .append('g')
    .attr('transform', `translate(20, 20)`)

  const arrows = g.selectAll('g.arrow')
    .data( matrix.map( (arr, i) => {return {l : arr.length, i}}) )
    .enter()
    .append('g')
    .attr('transform', d=>`translate(${d.l*L/2}, ${d.i*L})`)
    .attr('class', 'arrow')
    .append('rect')
    .attr('class', 'arrow-bar')
    .attr('width', L*0.2)
    .attr('height', L*0.4)
    .attr('fill', '#5dd8eb')


  const ceil = g.selectAll('rect.ceil')
    .data(renderSet)
    .enter()
    .append('g')
    .attr('transform', d=>`translate(${d.x*L}, ${d.y*L})`)

  ceil.append('rect')
    .attr('width', L)
    .attr('class', 'ceil')
    .attr('height', L)
    .attr('style', 'fill:white;stroke:black;')
    .attr('stroke-width', '1')
  ceil.append('text')
    .text(d => d.v)
    .attr('x', L/2)
    .attr('y', L/2+8)
    .attr('style', 'font-size:24px')
    .attr('text-anchor', 'middle')



  console.log(renderSet)




  console.log(renderSet)


}
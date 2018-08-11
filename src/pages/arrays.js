import * as d3 from 'd3'
const G = 0.2

function render_matrix(arrays, styleRender = null) {
  const list = []

  const L = 1

  for(let i = 0; i < arrays.length; i++) {
    const row = arrays[i]

    for(let j = 0; j < row.list.length; j++) {

      list.push({
        x : j*L + Math.max((j),0)*G,
        y : i*L + Math.max((i),0)*L,
        v : row.list[j],
        style : styleRender ? styleRender(row.list[j], row, j) : null,
        highlight : row.highlights === j,
        type : 'item'

      })
    }
  }
  return list
}

function gen(A, x) {
  let highlights = []
  let min = 0, // 查询范围最小值
      max = A.length - 1, // 查询范围最大值
      guess // 猜测位置

  let rows = [{
    list : [...A],
    guess : undefined, 
    min : 0,
    max : A.length - 1,
    label : `g=,l=0,r=${A.length-1}`
  }]

  while(min <= max) {
    const row = {
      list : [...A]
    }
    // 进行一次猜测
    guess = Math.floor( (min+max)/2 )
    row.highlights = guess
    if(A[guess] === x) {

      row.label = `g=${guess},l=${min},r=${max}`
      row.guess = guess
      row.min = min
      row.max = max
      rows.push(row)
      return rows 
    }
    else if(A[guess] > x) max = guess - 1
    else min = guess + 1
    // 每次循环结束，要么找到，要么范围缩小
    row.label = `g=${guess},l=${min},r=${max}`
    row.min = min
    row.max = max
    row.guess = guess
    rows.push(row)
  }
  // return -1
  return rows
}


export default () => {

  const rows = gen([3, 5, 19, 22, 25, 33, 45, 47, 57, 66, 71, 78], 22)

  const L = 48

  const l = d3.scaleLinear()
    .domain([0, 1])
    .range(0, L)
  const renderSet = render_matrix(rows, (d, row, i) => {
    if(i === row.guess) {
      return 'fill:green'
    }
    if(i >= row.min && i <= row.max) {
      return 'fill:#ccc'
    } 
    
    return null
  })


  const num = rows[0].list.length

  const g = d3.select('body')
    .append('svg')
    .attr('width', 1000)
    .attr('height', 800)
    .append('g')
    .attr('transform', `translate(20, 20)`)

  
  g.append('g')
    .attr('class', 'row-lables')
    .attr('transform', (_, i) => `translate(${0}, ${70})`)
    .selectAll('g.label')
    .data(rows)
    .enter()
    .append('g')
    .attr('transform', (_, i) => `translate(${num * L + num * G * L}, ${i * L * 1.6 + 0.6* L})`)
    .attr('class', 'label')
    .append('text')
    .attr('style', 'font-size:24px')
    .attr('x', (d, i) => 0)
    .attr('y', (d, i) => 0)
    .text(d => d.label)
  
  const headers = g.selectAll('g.header')
    .data([...Array(rows[0].list.length)].map((_, i) => i))
    .enter()
    .append('g')
    .attr('class', 'header')
    .attr('transform', d=>`translate(${d*L + G * L * d }, 0)`)


  headers.append('rect')
    .attr('width', L)
    .attr('class', 'ceil')
    .attr('height', L)
    .attr('style', (d) => {
      return `fill:white;stroke:black;`
    })
    .attr('stroke-dasharray', '10, 5')
    .attr('stroke-width', '1')

  headers.append('text')
    .text(d => d)
    .attr('x', L / 2)
    .attr('y', L / 2 + 9)
    .attr('style', 'font-size:28px;font-weight:600')
    .attr('text-anchor', 'middle')
    .attr('fill', d => {
      return 'red'
    })

  // const arrows = g.selectAll('g.arrow')
  //   .data( matrix.map( (arr, i) => {return {l : arr.length, i}}) )
  //   .enter()
  //   .append('g')
  //   .attr('transform', d=>`translate(${d.l*L/2}, ${d.i*L})`)
  //   .attr('class', 'arrow')
  //   .append('rect')
  //   .attr('class', 'arrow-bar')
  //   .attr('width', L*0.2)
  //   .attr('height', L*0.4)
  //   .attr('fill', '#5dd8eb')


  const g1 = g.append('g')
    .attr('transform', 'translate(0, 70)')
  const ceil = g1.selectAll('g.g-ceil')

    .data(renderSet)
    .enter()
    .append('g')
    .attr('class', 'g-ceil')
    .attr('transform', d=>`translate(${d.x*L}, ${d.y*L * 0.8})`)

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
    .attr('x', L/2)
    .attr('y', L/2+8)
    .attr('style', 'font-size:24px')
    .attr('text-anchor', 'middle')
    .attr('fill', d => {
      if(d.highlight) {
        return 'white'
      }
      return 'black'
    })



  console.log(renderSet)




  console.log(renderSet)


}
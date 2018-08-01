import * as d3 from 'd3'


function createScaleFunction(width, height, marginX, marginY) {

  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([marginX, width - marginX])

  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([marginY , height - marginY])


  function scaleToRender(node) {
    return {
      x: xScale(node.x),
      y: yScale(node.y)
    }
  }

  return scaleToRender
}


class Tree{

  constructor(options) {
    this.hierarchyData = d3.hierarchy(options.data)
    this.tree = d3.tree()
      .separation((a, b) => {
        return a.parent === b.parent ? 1 : 1
      })
    this.renderData = this.tree(this.hierarchyData)

    this.scale = createScaleFunction(
      options.width,
      options.height,
      options.marginX,
      options.marginY
    )
    this.marginTop = options.marginTop
    this.marginLeft = options.marginLeft
    this.options = options
  }

  draw_nodes = ({ nodes }) => {
    const svg = this.options.svg
    const scale = this.scale
    const R = this.options.R

    const gNode = svg.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('width', R)
      .attr('height', R)
      .attr('transform', d => `translate(${scale(d).x - R}, ${scale(d).y - R})`)

    gNode.append('circle')
      .attr('r', R)
      .attr('cx', R)
      .attr('cy', R)
      .attr('stroke', 'black')
      .attr('fill', d => d.data.color || 'white')

    gNode.append('text')
      .attr('x', R)
      .attr('y', R + 8)
      .attr('fill', 'black')
      .attr('font-size', 24)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
  }



  draw_edges = ({ edges}) => {
    const svg = this.options.svg
    const scale = this.scale
    const line = d3.line()
      .x(d => scale(d).x)
      .y(d => scale(d).y)
    const gNode = svg.selectAll('g.line')
      .data(edges)
      .enter()
      .append('path')
      .attr('d', d => {
        const data = d.map(n => {
          return { x: n.x, y: n.y }
        })
        return line(data)
      })
      .attr('stroke', 'black')

  }


  draw(){
    const nodes = [...transverse(this.renderData)]
    const edges = [...transverse_edge(this.renderData)]

    this.draw_edges({edges})
    this.draw_nodes({nodes})
  }
}




function * transverse(node){
  yield node
  if(node.children) {
    for(let i = 0; i < node.children.length; i++) {
      yield * transverse(node.children[i])
    }
  }
}


function * transverse_edge(node){
  if(node.children) {
    for(let i = 0; i < node.children.length; i++) {
      yield [node, node.children[i]]
    }
    for (let i = 0; i < node.children.length; i++) {
      yield* transverse_edge(node.children[i])
    }
  }
}




export default Tree
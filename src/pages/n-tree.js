import * as d3 from 'd3'
import Tree from '../lib/tree'
import exportSVG from '../lib/exportSVG'

function gen_n_tree(degree) {


}



function run({query}){
  const treeData = {}
  if(!query.degree) {
    console.error('参数错误')
    return
  }
  gen_n_tree(treeData, query.n)

  const W = 800
  const H = 400
  const tree = new Tree({
    data : treeData,
    svg : d3.select('body').append('svg').attr('width', W).attr('height', H).attr('id', 'tree'),
    marginX : 20,
    marginY : 60,
    width : W,
    height : H,
    R : 20,
  })

  tree.draw()


  setTimeout( () => {
    exportSVG(document.getElementById('tree'), query.file)
  }, 100)
}

export default run
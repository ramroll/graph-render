import * as d3 from 'd3'
import Tree from '../lib/tree'
import exportSVG from '../lib/exportSVG'

function gen_tree_data(tree, n) {


  tree.name = n
  if(n <= 1) {
    // tree.color = '#03bbf4'
    // tree.stroke = '#03bbf4'
    // tree.fontColor = 'white'
  }

  if(n > 2) {

    tree.children = []
    const a = Math.ceil ( n / 2 )
    const b = n - a

    if(a >= 1) {
      tree.children.push({})
      gen_tree_data(tree.children[0], a)
    }
    if(b >= 1) {
      tree.children.push({})
      gen_tree_data(tree.children[tree.children.length - 1], b)

    }

  }

}



function run({query}){
  const treeData = {}
  if(!query.n) {
    console.error('参数错误')
    return
  }
  gen_tree_data(treeData, query.n)

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


  if (query.file) {
    setTimeout(() => {

      exportSVG(document.getElementById('tree'), query.file)
    }, 100)
  }
}

export default run
import 'babel-polyfill'
import * as d3 from 'd3'
import Tree from './tree'
import exportSVG from './exportSVG'


function gen_tree_data(tree, n) {
  tree.name = n

  if(n > 2) {

    tree.children = []
    const a = Math.floor ( n / 2 )
    const b = n - a

    if(a >= 2) {
      tree.children.push({})
      gen_tree_data(tree.children[0], a)
    }
    if(b >= 2) {
      tree.children.push({})
      gen_tree_data(tree.children[tree.children.length - 1], b)

    }

  }

}

const treeData = {}
gen_tree_data(treeData, 16)

const W = 800
const H = 400
const tree = new Tree({
  data : treeData,
  svg : d3.select('body').append('svg').attr('width', W).attr('height', H).attr('id', 'tree'),
  marginX : 60,
  marginY : 60,
  width : W,
  height : H,
  R : 20,
})

tree.draw()


document.querySelector('#btn').addEventListener('click', () => {
  exportSVG(document.getElementById('tree'))
})
import * as d3 from 'd3'
import Tree from '../lib/tree'
import exportSVG from '../lib/exportSVG'

function array_to_tree(arr) {
}

function gen_n_tree(degree) {

  return {
    name: 20,
    children: [
      {
        name: 16,
        children: [{
          name: 8,
          children : [{
            name : 4,
            children : [{
              name : 2
            }, {
              name : 2
            }]
          }]

        }, {
          name: 8,
          children : [{
            name : 4,
            children : [{
              name : 2
            }, {
              name : 2
            }]
          }]
        }]
      },
      {
        name: 4,
        children : [{
          name : 4,
          children : [{
            name : 4,
            children : [{
              name : 2,
            }, {
              name : 2
            }]
          }]
        }]
      }
    ]
  }
}



function run({ query }) {

  const treeData = gen_n_tree(treeData, query.n)

  const W = 800
  const H = 400
  const tree = new Tree({
    data: treeData,
    svg: d3.select('body').append('svg').attr('width', W).attr('height', H).attr('id', 'tree'),
    marginX: 20,
    marginY: 60,
    width: W,
    height: H,
    R: 20,
  })

  tree.draw()


}

export default run
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ArrayViz from './lib/ArrayViz'
import ReactSwipe from 'react-swipe'


import array from './lib/array'

function counting_sort(A, B, C) {
  const max = Math.max(...A.data)
  for (let i = 0; i < A.length; i++) {
    A.updateCursor({ p: i })
    B.updateCursor({ i: A[i] })
    B[A[i]]++
  }

  for (let i = 1; i < B.length; i++) {
    B.updateCursor({ i })
    B[i] = B[i - 1] + B[i]
  }

  for (let i = 0; i < A.length; i++) {
    A.updateCursor({ p: i })
    B.updateCursor({ i: A[i] })
    C.updateCursor({ j: B[A[i]] - 1 })
    C[B[A[i]] - 1] = A[i]
    B[A[i]]--

  }

}
const A = array([6, 5, 3, 3, 2, 2, 1])
const B = array([0, 0, 0, 0, 0, 0, 0])
const C = array([, , , , , , ,])
counting_sort(A, B, C)

class App extends Component {

  componentDidMount(){
    document.addEventListener('keyup', e => {
      if (e.code === 'ArrowRight') {
        array.trigger()
      }

      if (e.code === 'ArrowUp') {
        this.reactSwipe.next()
      }
    })
  }
  render() {
    const list = [
      'xxxxx',
      'yyyy'
    ]
    return (
      <div className='stage stack stack-fill-first'>
        <div className='flex-center flex-column'>
          <ArrayViz title='原数组A' array={A} />
          <ArrayViz title='累计数组B' array={B} style={{ marginTop: 80 }} />
          <ArrayViz title='结果数组C' array={C} style={{ marginTop: 80 }} />
        </div>

        <div style={{ width: 400 }}>

          <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe}>
            {list.map( (s, i) => {
              return <div className='swipe flex-center' key={i}>{s}</div>
            })}
          </ReactSwipe>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.querySelector('#app'))


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ArrayViz from './lib/ArrayViz'


import array from './lib/array'

function counting_sort(A, B){
  const max = Math.max(...A.data)
  for(let i = 0; i < A.length; i++) {
    B[A[i]]++
  }

  for(let i = 1; i < B.length; i++) {
    B[i] = B[i-1] + B[i]
  }
}


setTimeout( () => {
  const A = array([6, 5, 3, 3, 2, 2, 1])
  const B = array([0, 0, 0, 0, 0, 0, 0])
  counting_sort(A, B)
  ReactDOM.render(<div>
    <ArrayViz array={A} />
  </div>, document.querySelector('#app'))
}, 1000)


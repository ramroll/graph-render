
import array_render from  '../lib/array_render'

function insert(A, i, x) {
  // let p = A.length - 1
  let p = i - 1
  while(p >= 0 && A[p] > x) {
    A[p+1] = A[p]
    p--
  }
  A[p + 1] = x
}

function insertion_sort(A){
  const rows = [
    {
      list : [...A],
      i : 0,
      label : `i=${1}`
    }
  ]
  for(let i = 1; i < A.length; i++) {
    insert(A, i, A[i])
    rows.push({
      list : [...A],
      i : i,
      label : `i=${i+1}`,

    })
  }
  return rows
}

function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}
function bubble_sort(A){

  const rows = [{
    list : [...A],
  }]
  for(let i = A.length - 1; i >= 1; i--) {
    for(let j = 1; j <= i; j++) {
      if( A[j-1] > A[j] ) {
        swap(A, j-1, j)
      }
      rows.push({
        list: [...A],
        j: j,
        highlights : j,
        label : `j=${j}`
      })
    }
  }
  // rows.push({
  //   list : [...A],
  //   i : 0,
  //   highlights : []
  // })
  return rows
}

export default () => {
  const rows = bubble_sort([5, 8, 1, 3, 2, 4, 6])
  array_render(
    rows,
    (d, row, i) => {
      if(row.j === i) {
        return `fill:#56ff56;stroke:black`
      }
      return `fill:white;stroke:black`
    }
  )
  // array_render(
  //   rows,
  //   (d, row, i) => {
  //     if(i <= row.i) {
  //       return `fill:#56ff56;stroke:black`
  //     }
  //     return `fill:white;stroke:black`
      

  //   }
  // )
}

import arrayViz from '../lib/array_viz'
function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}
function bubble_sort(A){

  const rows = []
  for(let i = A.length - 1; i >= 1; i--) {
    for(let j = 0; j < i; j++) {
      rows.push({
        list : [...A],
        highlights : [j, j+1],
        i
      })
      if( A[j] > A[j+1] ) {
        swap(A, j, j+1)
      }
      rows.push({
        list : [...A],
        highlights : [j, j+1],
        i
      })
    }
  }
  rows.push({
    list : [...A],
    i : 0,
    highlights : []
  })
  return rows
}

export default () => {
  const A = [6, 3, 5, 8, 1, 4]
  const rows = bubble_sort(A)
  const next = arrayViz(rows, (d, row, i) => {
    if(row.highlights.indexOf(i) !== -1) {
      return `fill:#0adefa;stroke:black`
    }

    if(row.i === 0) {
      return `fill:#50e750;stroke:black`
    }
    if(i > row.i) {
      return `fill:#50e750;stroke:black`
    }
    return `fill:white;stroke:black`
  })
  document.addEventListener('keyup', (e) => {
    if(e.keyCode === 39) {
      next()
    }
  })
}
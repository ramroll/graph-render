
import array_render from  '../lib/array_render'

function insert(A, x) {
  let rows = [{
    list : [...A, null],
    highlight : A.length,
    label : `p=${A.length-1}`

  }]
  let p = A.length - 1

  while(p >= 0 && A[p] > x) {
    A[p+1] = A[p]
    p--
    rows.push({
      list : [...A],
      highlight : p + 1,
      label : `p=${p}`
    })
  }
  A[p + 1] = x
  rows.push({
    list: [...A],
    highlight : p + 1
  })
  return rows
}




export default () => {
  const rows = insert([2,4,7,9,13], 8)
  array_render(
    rows,
    (d, row, i) => {
      if(i === row.highlight) {
        return `fill:#56ff56;stroke:black`
      }
      return `fill:white;stroke:black`
      

    }
  )
}

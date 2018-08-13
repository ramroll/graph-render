
import array_render from  '../lib/array_render'
function gen(A, x) {
  let highlights = []
  let min = 0, // 查询范围最小值
      max = A.length - 1, // 查询范围最大值
      guess // 猜测位置

  let rows = [{
    list : [...A],
    guess : undefined, 
    min : 0,
    max : A.length - 1,
    label : `g=,l=0,r=${A.length-1}`
  }]

  while(min <= max) {
    const row = {
      list : [...A]
    }
    // 进行一次猜测
    guess = Math.floor( (min+max)/2 )
    row.highlights = guess
    if(A[guess] === x) {

      row.label = `g=${guess},l=${min},r=${max}`
      row.guess = guess
      row.min = min
      row.max = max
      rows.push(row)
      return rows 
    }
    else if(A[guess] > x) max = guess - 1
    else min = guess + 1
    // 每次循环结束，要么找到，要么范围缩小
    row.label = `g=${guess},l=${min},r=${max}`
    row.min = min
    row.max = max
    row.guess = guess
    rows.push(row)
  }
  // return -1
  return rows
}

const styleRender = (d, row, i) => {
  if(i === row.guess) {
    return 'fill:green'
  }
  if(i >= row.min && i <= row.max) {
    return 'fill:#ccc'
  } 
  
  return null
}

export default () => {
  const rows = gen([3, 5, 19, 22, 25, 33, 45, 47, 57, 66, 71, 78], 22)
  array_render(
    rows,
    styleRender
  )
}

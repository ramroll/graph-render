function counting_sort(A){
  const max = Math.max(...A)
  // 累计数组
  const B = Array(max + 1).fill(0)
  // 结果数组
  const C = Array(A.length)
  // 累计位递增
  A.forEach((_, i) => B[A[i]]++)
  // 累计求和
  for(let i = 1; i < B.length; i++) {
    B[i] = B[i-1] + B[i]
  }
  // 结果取出
  for(let i = 0; i < A.length; i++) {
    const p = B[A[i]] - 1 // 回写位置
    B[A[i]] -- // 新回写位置
    C[p] = A[i] // 回写结果
  }
  return C
}

console.log(counting_sort([5,4,3,2,1]))
console.log(counting_sort([19,8,3,2,5,4]))
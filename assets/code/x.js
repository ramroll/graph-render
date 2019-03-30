function next(t, p, N) {
  return [x=>x%N===N-1?-1:x+1, x=>x+N, x=>x%N===0?-1:x-1,x=>x-N][t%4](p)
}

function traverse(A, N) {
  const B = Array(N*N).fill(false)

  let
    i = 0, // 已遍历的个数
    p = 0, // 遍历的节点序号
    t = 0, // 方向
    r = [] // 结果
  while(i < A.length){
     r[i++] = A[p]
     B[p] = true
     let np = next(t, p, N)
     if(B[np] === undefined || B[np] === true) {
       np=next(++t,p,N)
     }
     p = np
  }
  return r
}
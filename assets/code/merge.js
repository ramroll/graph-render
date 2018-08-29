function merge(A, p, q, r){
  let A1 = A.slice(p, q) // 存放左半边的临时空间
  let A2 = A.slice(q, r) // 存放右半边的临时空间
  // 追加哨兵
  A1.push(Number.MAX_SAFE_INTEGER)
  A2.push(Number.MAX_SAFE_INTEGER)
  for(let k = p, i = 0, j = 0; k < r; k++) {
    // 循环不变式
    // k : 下一个写入位置
    // i : A1中回写位置
    // j : A2中回写位置
    A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
  }
}
const A = [1,3,5,2,4,6]
const B = [2,4,6,1,3,5]
const C = [2,1]
merge(A, 0, 3, 6)
merge(B, 1, 3, 5)
merge(C, 0, 1, 2)
console.log(A)
console.log(B)
console.log(C)

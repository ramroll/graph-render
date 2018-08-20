function insert(A, i, x) {
  let idx = bsearch(A,i,x)
  let p = i - 1
  while(p >= idx) {
    A[p+1] = A[p]
    p--
  }
  A[p + 1] = x
}
function insertion_sort(A){
  for(let i = 1; i < A.length; i++) {
    insert(A, i, A[i])
  }
}
function bsearch(A, i, x){
  let l = 0,
      r = i-1,
      guess

  while(l<=r) {
    guess = Math.floor( (l + r) / 2 )
    if(A[guess] === x) return guess
    if(A[guess] > x) {
      if(guess === 0 || A[guess - 1] < x) {
        return guess
      }
      r = guess - 1
    } else {
      if(guess === i-1 || A[guess + 1] > x) {
        return guess + 1
      }
      l = guess + 1
    }
  }
}

const A = [2, 5,2,3,9,7, 1999]
insertion_sort(A)
console.log(A)
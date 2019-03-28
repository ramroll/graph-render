function knapsack(W, weight, value) {
  const M = weight.length
  const dp = []

  for(let i = 0; i <= M; i++) {
    dp[i] = []
    for(let j = 0; j <= W; j++) {
      if(i === 0 || j === 0) {
        dp[i][j] = 0
      }
      else if(weight[i-1] <= j) {
        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i-1]] + value[i-1])
      }
      else {
        dp[i][j] = dp[i-1][j]
      }
    }
  }
  return dp[M][W]
}

const W = 15
const weight = [2,3,5,10,1]
const value  = [10,9,20,10,8]

console.log(knapsack(W, weight, value))



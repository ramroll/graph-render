function queen(n, decisions = []) {
  if(decisions.length === n ) {
    return is_goal(n, decisions) ? [decisions] : []
  }
  let r = []
  for(let i = 0; i < n*n; i++) {
    if(decisions.indexOf(i) === -1) {
      r = r.concat( queen(n, decisions.concat(i)) )
    }
  }
  return r
}

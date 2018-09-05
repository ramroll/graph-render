function radix_sort(A){
  const max = Math.max(...A)

  let m = 1
  while(m < max) {
    const buckets = Array.from({ length: 10 }, () => [])

    // 将所有数字写入桶中
    A.forEach( number => {
      const digit = ~~ ( ( number % (m * 10) ) / m )
      buckets[digit].push(number)
    })

    // 将数组从桶中拿出
    let j = 0
    buckets.forEach(bucket => bucket.forEach(v => A[j++] = v))
    m *= 10
  }
}

const A = [10, 200,13,12, 7, 88,91, 24]
radix_sort(A)
console.log(A)
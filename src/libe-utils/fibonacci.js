function fibonacci (_n = 1, removeDoubleOne = false) {
  const result = []
  const n = removeDoubleOne ? _n + 1 : _n
  new Array(n).fill(0).forEach((_, i) => {
    if (i < 2) result[i] = i
    else result[i] = result[i - 1] + result[i - 2]
  })
  return removeDoubleOne ? [result[0], ...result.slice(2)] : result
}

export default fibonacci

function reverse (_array) {
  const array = Array.isArray(_array) ? _array : [_array]
  return [...array]
    .reverse()
    .map(item => Array.isArray(item) ? reverse(item) : item)
}

function flatten (_array) {
  const array = Array.isArray(_array) ? _array : [_array]
  const flatArray = array.map(e => {
    if (typeof e === 'number') return e
    if (Array.isArray(e)) return sum(e)
    return undefined
  })
  return flatArray
}

function sum (_array) {
  const array = Array.isArray(_array) ? _array : [_array]
  const result = array.reduce((acc, curr) => {
    if (typeof curr === 'number') return acc + curr
    if (Array.isArray(curr)) return acc + sum(curr)
    return 0
  }, 0)
  return result
}

function max (...terms) {
  const flatArray = flatten(terms)
  return Math.max(...flatArray)
}

function min (...terms) {
  const flatArray = flatten(terms)
  return Math.min(...flatArray)
}

export { reverse, flatten, sum, max, min }

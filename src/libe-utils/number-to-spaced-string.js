function numberToSpacedString (value = '', decimalsLimit) {
  const [_integer, _decimals] = typeof value === 'string'
    ? value.split('.')
    : typeof value === 'number'
      ? value.toString().split('.')
      : [NaN, NaN]
  if (Number.isNaN(_integer)) return ''
  const integerArr = []
  _integer.split('').reverse().forEach((digit, i) => {
    const groupNb = Math.floor(i / 3)
    if (!integerArr[groupNb]) integerArr[groupNb] = ''
    integerArr[groupNb] = digit + integerArr[groupNb]
  })
  const integer = integerArr.reverse().join(' ')
  const decimals = _decimals ? _decimals.slice(0, decimalsLimit) : null
  return _decimals ? `${integer},${decimals}` : `${integer}`
}

export default numberToSpacedString

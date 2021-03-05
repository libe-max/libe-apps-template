function roundNumber (val = 0, n = 1) {
  const powOfTen = Math.pow(10, n)
  return Math.round(val * powOfTen + Number.EPSILON) / powOfTen
}

export default roundNumber

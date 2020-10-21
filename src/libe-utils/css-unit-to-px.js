function cssUnitToPx (_input, width = 100, viewport = { rem: 0, width: 0, height: 0 }) {
  if (typeof _input === 'number') return _input
  if (!_input || typeof _input !== 'string') return
  const inputMatch = _input.trim()
    .match(/^[\+\-]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)(cm|mm|Q|in|ip|pt|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%)?$/igm)
  if (!inputMatch) return
  const input = inputMatch[0]
  const numberMatch = input.match(/^[\+\-]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)/igm)
  const unitMatch = input.match(/(cm|mm|Q|in|ip|pt|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%)?$/igm)
  if (!numberMatch || !unitMatch) return
  const number = Number(numberMatch[0])
  const unit = unitMatch[0]
  switch (unit) {
    case 'cm':
      return number * 96 / 2.54
    case 'mm':
      return number * 96 / 2.54 / 10
    case 'Q':
      return number * 96 / 2.54 / 40
    case 'in':
      return number * 96
    case 'pc':
      return number * 96 / 6
    case 'pt':
      return number * 96 / 72
    case 'px':
      return number
    case 'em':
      return
    case 'ex':
      return
    case 'ch':
      return
    case 'rem':
      return number * viewport.rem
    case 'lh':
      return
    case 'vw':
      return number * viewport.width / 100
    case 'vh':
      return number * viewport.height / 100
    case 'vmin':
      return number * Math.min(viewport.width, viewport.height) / 100
    case 'vmax':
      return number * Math.max(viewport.width, viewport.height) / 100
    case '%':
      return number * width / 100
    default:
      return
  }
}

export default cssUnitToPx

import cssUnitToPx from './css-unit-to-px'

function cssCalcToPx (_formula, relativeSize = 0, viewport = { rem: 0, width: 0, height: 0 }) {
  if (typeof _formula === 'number') return cssUnitToPx(_formula, relativeSize, viewport)
  if (!_formula || typeof _formula !== 'string') return
  const formula = _formula.trim().replace(/[\s]+/igm, ' ')
  const fullFormulaRegex = /^calc\([a-zA-Z0-9.+\-*%/()\s]*\)$/
  if (!formula.match(fullFormulaRegex)) {
    return cssUnitToPx(formula, relativeSize, viewport)
  }

  const calcRegex = /^calc/
  const startOfBlockRegex = /^\(/
  const endOfBlockRegex = /^\)/
  const operatorRegex = /^\s[+\-*/]\s/
  const valueRegex = /^[+-]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)(cm|mm|Q|in|ip|pt|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%)/
  const nakedValueRegex = /^[+-]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)/
  const spaceRegex = /^\s/

  const semanticsBlock = []
  let currBlock = semanticsBlock
  currBlock.type = 'BLOCK'
  currBlock.parent = null
  let walterTheFormula = formula
  let parseError = false
  while (walterTheFormula) {
    const calcMatch = walterTheFormula.match(calcRegex)
    const startOfBlockMatch = walterTheFormula.match(startOfBlockRegex)
    const endOfBlockMatch = walterTheFormula.match(endOfBlockRegex)
    const valueMatch = walterTheFormula.match(valueRegex)
    const nakedValueMatch = walterTheFormula.match(nakedValueRegex)
    const operatorMatch = walterTheFormula.match(operatorRegex)
    const spaceMatch = walterTheFormula.match(spaceRegex)
    if (!calcMatch
      && !startOfBlockMatch
      && !endOfBlockMatch
      && !valueMatch
      && !nakedValueMatch
      && !operatorMatch
      && !spaceMatch) {
      parseError = true
      break
    } else if (calcMatch) {
      const newBlock = []
      newBlock.type = 'BLOCK'
      newBlock.parent = currBlock
      currBlock.push(newBlock)
      currBlock = newBlock
      walterTheFormula = walterTheFormula.slice(calcMatch.index + calcMatch[0].length)
    } else if (startOfBlockMatch) {
      const newBlock = []
      newBlock.type = 'BLOCK'
      newBlock.parent = currBlock
      currBlock.push(newBlock)
      currBlock = newBlock
      walterTheFormula = walterTheFormula.slice(startOfBlockMatch.index + startOfBlockMatch[0].length)
    } else if (endOfBlockMatch) {
      currBlock = currBlock.parent
      walterTheFormula = walterTheFormula.slice(endOfBlockMatch.index + endOfBlockMatch[0].length)
    } else if (valueMatch || nakedValueMatch) {
      const newBlock = []
      newBlock.type = 'VALUE'
      newBlock.value = cssUnitToPx((valueMatch || nakedValueMatch)[0], relativeSize, viewport)
      newBlock.parent = currBlock
      currBlock.push(newBlock)
      walterTheFormula = walterTheFormula.slice((valueMatch || nakedValueMatch).index + (valueMatch || nakedValueMatch)[0].length)
    } else if (operatorMatch) {
      const newBlock = []
      newBlock.type = 'OPERATOR'
      newBlock.value = operatorMatch[0].trim()
      newBlock.parent = currBlock
      currBlock.push(newBlock)
      walterTheFormula = walterTheFormula.slice(operatorMatch.index + operatorMatch[0].length)
    } else if (spaceMatch) {
      walterTheFormula = walterTheFormula.slice(spaceMatch.index + spaceMatch[0].length)
    }
  }
  if (parseError) return undefined

  const result = resolveBlock(semanticsBlock, relativeSize, viewport)
  return result
}

function resolveBlock (block, relativeSize, viewport) {
  const isValid = block.every((child, i) => i % 2
    ? child.type === 'OPERATOR'
    : child.type !== 'OPERATOR'
  )
  if (!isValid) return 0
  let toEval = ''
  block.forEach(child => {
    if (child.type === 'BLOCK') toEval += resolveBlock(child)
    else if (child.type === 'VALUE') toEval += child.value
    else if (child.type === 'OPERATOR') toEval += ` ${child.value} `
  })
  try {
    return eval(toEval) || 0
  } catch (e) {
    return 0
  }
}

export default cssCalcToPx


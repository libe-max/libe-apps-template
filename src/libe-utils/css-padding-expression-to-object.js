import cssCalcToPx from './css-calc-to-px'

function cssPaddingExpressionToObject (
  expression = '',
  referenceDimensions = { width: 0, height: 0 },
  viewport = { rem: 0, width: 0, height: 0 }
) {
  const arr = `${expression}`.split(' ').map((e, i) => i % 2
    ? cssCalcToPx(e, referenceDimensions.width, viewport)
    : cssCalcToPx(e, referenceDimensions.height, viewport))
  return {
    top: Math.max(arr[0] || 0, 0),
    right: Math.max(arr[1] || arr[1] === 0 ? arr[1] : arr[0] || 0, 0),
    bottom: Math.max(arr[2] || arr[2] === 0 ? arr[2] : arr[0] || 0, 0),
    left: Math.max(arr[3] || arr[3] === 0 ? arr[3] : arr[1] || arr[1] === 0 ? arr[1] : arr[0] || 0, 0)
  }
}

export default cssPaddingExpressionToObject

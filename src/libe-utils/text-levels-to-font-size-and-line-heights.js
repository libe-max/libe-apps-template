const displays = ['lg', 'md', 'sm']
const remRoots = [1.125, 1.125, 1]
const ratios = [1.25, 1.2, 1.18]
const lineHeightFactors = [1.125, 1.125, 1.125]
const defaultViewport = { display_name: 'lg', rem: 16 }

function fontSizeLevelToFontSize (
  _level = 1,
  viewport = defaultViewport) {
  const display = viewport.display_name
  const rawDisplayPosition = displays.indexOf(display)
  const displayPosition = rawDisplayPosition > -1 && rawDisplayPosition < 3 ? rawDisplayPosition : 0
  const level = _level - 1
  const rem = viewport.rem
  const remSizeRoot = remRoots[displayPosition]
  const sizeRoot = rem * remSizeRoot
  const ratio = ratios[displayPosition]
  const levelPoweredRatio = Math.pow(ratio, level)
  const size = Math.round(sizeRoot * levelPoweredRatio)
  return size
}

function lineHeightLevelToLineHeight (
  _level = 1,
  viewport = defaultViewport) {
  const fontSize = fontSizeLevelToFontSize(_level, viewport)
  const display = viewport.display_name
  const rawDisplayPosition = displays.indexOf(display)
  const displayPosition = rawDisplayPosition > -1 && rawDisplayPosition < 3 ? rawDisplayPosition : 0
  const lineHeightFactor = lineHeightFactors[displayPosition]
  const height = Math.ceil(0.125 * fontSize * lineHeightFactor) * 8
  return height
}

function textLevelsToFontSizeAndLineHeights (
  _sizeLevel = 1,
  _heightLevel = 1,
  viewport = defaultViewport) {
  const fontSize = fontSizeLevelToFontSize(_sizeLevel, viewport)
  const lineHeight = lineHeightLevelToLineHeight(_heightLevel, viewport)
  return { fontSize, lineHeight }
}

export default textLevelsToFontSizeAndLineHeights

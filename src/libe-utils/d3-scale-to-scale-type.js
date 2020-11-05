import * as d3scales from 'd3-scale'

const scalesMethods = Object.keys(d3scales)
  .filter(scaleName => !['scaleImplicit', 'tickFormat'].includes(scaleName))
  .map(scaleName => {
    const scale = d3scales[scaleName]()
    const methods = Object.keys(scale)
    return { name: scaleName, methods }
  }).filter(e => e)

function d3ScaleToScaleType (inputScale) {
  const inputMethods = Object.keys(inputScale)
  const report = scalesMethods.map(({ name, methods }) => {
    let excess = 0
    let lacks = 0
    inputMethods.forEach(inputMethod => { if (!methods.includes(inputMethod)) excess ++ })
    methods.forEach(method => { if (!inputMethods.includes(method)) lacks ++ })
    return { name, distance: excess + lacks }
  })
  const minDistance = Math.min(...report.map(e => e.distance))
  const scalesAtMinDistance = report.filter(e => e.distance === minDistance)
  const scalesNames = scalesAtMinDistance.map(e => e.name)
  const renamedScales = scalesNames.map(scaleName => {
    const noScaleStart = scaleName.replace(/^scale/, '')
    return `${noScaleStart[0].toLowerCase()}${noScaleStart.slice(1)}`
  })
  const preResult = renamedScales[0]
  if (preResult === 'linear') {
    if (inputScale.domain().every(bound => bound instanceof Date)) return 'time'
    return 'linear'
  } else if (preResult === 'pow') {
    if (inputScale.exponent() === .5) return 'sqrt'
    return 'pow'
  }
  return preResult
}

export default d3ScaleToScaleType

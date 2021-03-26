import {
  scaleLinear,
  scalePow,
  scaleSqrt,
  scaleLog,
  scaleSymlog,
  scaleIdentity,
  scaleRadial,
  scaleTime,
  scaleUtc,
  scaleSequential,
  scaleSequentialLog,
  scaleSequentialPow,
  scaleSequentialSqrt,
  scaleSequentialSymlog,
  scaleSequentialQuantile,
  scaleDiverging,
  scaleDivergingLog,
  scaleDivergingPow,
  scaleDivergingSqrt,
  scaleDivergingSymlog,
  scaleQuantize,
  scaleQuantile,
  scaleThreshold,
  scaleOrdinal,
  scaleBand,
  scalePoint
} from 'd3-scale'

function d3ScaleNameToScale (name) {
  switch (name) {
    case 'linear': return scaleLinear
    case 'pow': return scalePow
    case 'sqrt': return scaleSqrt
    case 'log': return scaleLog
    case 'symlog': return scaleSymlog
    case 'identity': return scaleIdentity
    case 'radial': return scaleRadial
    case 'time': return scaleTime
    case 'utc': return scaleUtc
    case 'sequential': return scaleSequential
    case 'sequentialLog': return scaleSequentialLog
    case 'sequentialPow': return scaleSequentialPow
    case 'sequentialSqrt': return scaleSequentialSqrt
    case 'sequentialSymlog': return scaleSequentialSymlog
    case 'sequentialQuantile': return scaleSequentialQuantile
    case 'diverging': return scaleDiverging
    case 'divergingLog': return scaleDivergingLog
    case 'divergingPow': return scaleDivergingPow
    case 'divergingSqrt': return scaleDivergingSqrt
    case 'divergingSymlog': return scaleDivergingSymlog
    case 'quantize': return scaleQuantize
    case 'quantile': return scaleQuantile
    case 'threshold': return scaleThreshold
    case 'ordinal': return scaleOrdinal
    case 'band': return scaleBand
    case 'point': return scalePoint
    default: return
  }
}

export default d3ScaleNameToScale

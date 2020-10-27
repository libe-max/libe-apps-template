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

function d3ScaleNameToScale (name, params = []) {
  switch (name) {
    case 'linear': return scaleLinear(...params)
    case 'pow': return scalePow(...params)
    case 'sqrt': return scaleSqrt(...params)
    case 'log': return scaleLog(...params)
    case 'symlog': return scaleSymlog(...params)
    case 'identity': return scaleIdentity(...params)
    case 'radial': return scaleRadial(...params)
    case 'time': return scaleTime(...params)
    case 'utc': return scaleUtc(...params)
    case 'sequential': return scaleSequential(...params)
    case 'sequentialLog': return scaleSequentialLog(...params)
    case 'sequentialPow': return scaleSequentialPow(...params)
    case 'sequentialSqrt': return scaleSequentialSqrt(...params)
    case 'sequentialSymlog': return scaleSequentialSymlog(...params)
    case 'sequentialQuantile': return scaleSequentialQuantile(...params)
    case 'diverging': return scaleDiverging(...params)
    case 'divergingLog': return scaleDivergingLog(...params)
    case 'divergingPow': return scaleDivergingPow(...params)
    case 'divergingSqrt': return scaleDivergingSqrt(...params)
    case 'divergingSymlog': return scaleDivergingSymlog(...params)
    case 'quantize': return scaleQuantize(...params)
    case 'quantile': return scaleQuantile(...params)
    case 'threshold': return scaleThreshold(...params)
    case 'ordinal': return scaleOrdinal(...params)
    case 'band': return scaleBand(...params)
    case 'point': return scalePoint(...params)
    default: return
  }
}

export default d3ScaleNameToScale

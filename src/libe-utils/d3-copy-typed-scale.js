function d3CopyTypedScale (scale) {
  const type = scale._type
  const copy = scale.copy()
  copy._type = type
  return copy
}

export default d3CopyTypedScale

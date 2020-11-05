import React, { Component } from 'react'
import AppContext from '../../../../context'

/*
 *   GraphBasicShape higher order component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *
 *   CONTEXT (setup by nearest parent asGraphAsset HOC)
 *   width, height, data, xScale, yScale, calcWidth, calcHeight, calcPadding
 *
 *   PROPS
 *   x, y, rx, ry, cx, cy, r, x1, x2, y1, y2, width, height,
 *   points, d, pathLength, style
 *
 */

const asGraphBasicShape = WrappedComponent => {
  class AsGraphBasicShape extends Component {
    /* * * * * * * * * * * * * * * * *
     *
     * CONSTRUCTOR
     *
     * * * * * * * * * * * * * * * * */
    constructor () {
      super()
    }

    /* * * * * * * * * * * * * * * * *
     *
     * MAKE CONTEXT ACCESSIBLE
     *
     * * * * * * * * * * * * * * * * */
    static contextType = AppContext
    
    /* * * * * * * * * * * * * * * * *
     *
     * RENDER
     *
     * * * * * * * * * * * * * * * * */
    render () {
      const { props, context } = this
      const { xScale, yScale } = context.current_graph_asset
      const calcWidthFromParent = context.current_graph_asset.calcWidth
      const calcHeightFromParent = context.current_graph_asset.calcHeight

      const x = props.x !== undefined ? calcWidthFromParent(props.x) : props.xValue !== undefined ? xScale(props.xValue) : undefined
      const y = props.y !== undefined ? calcHeightFromParent(props.y) : props.yValue !== undefined ? yScale(props.yValue) : undefined
      const x1 = props.x1 !== undefined ? calcWidthFromParent(props.x1) : props.x1Value !== undefined ? xScale(props.x1Value) : undefined
      const x2 = props.x2 !== undefined ? calcWidthFromParent(props.x2) : props.x2Value !== undefined ? xScale(props.x2Value) : undefined
      const y1 = props.y1 !== undefined ? calcHeightFromParent(props.y1) : props.y1Value !== undefined ? yScale(props.y1Value) : undefined
      const y2 = props.y2 !== undefined ? calcHeightFromParent(props.y2) : props.y2Value !== undefined ? yScale(props.y2Value) : undefined
      const cx = props.cx !== undefined ? calcWidthFromParent(props.cx) : props.cxValue !== undefined ? xScale(props.cxValue) : undefined
      const cy = props.cy !== undefined ? calcHeightFromParent(props.cy) : props.cyValue !== undefined ? yScale(props.cyValue) : undefined
      const rx = props.rx !== undefined ? calcWidthFromParent(props.rx) : props.rxValue !== undefined ? xScale(props.rxValue) : undefined
      const ry = props.ry !== undefined ? calcHeightFromParent(props.ry) : props.ryValue !== undefined ? yScale(props.ryValue) : undefined
      const r = props.r !== undefined ? calcWidthFromParent(props.r) : props.rValue !== undefined ? xScale(props.rValue) : undefined
      const width = props.width !== undefined ? calcWidthFromParent(props.width) : props.widthValue  !== undefined ? (xScale(props.widthValue + xScale.invert(x)) - x) : undefined // [WIP] should depend on scale type
      const height = props.height !== undefined ? calcHeightFromParent(props.height) : props.heightValue !== undefined  ?( yScale(props.heightValue + yScale.invert(y)) - y) : undefined  // [WIP] should depend on scale type
      const points = props.points
      const d = props.d
      const pathLength = props.pathLength

      const style = props.style

      const childProps = {
        ...props, x, y, x1, x2, y1, y2, rx, ry, cx, cy, r,
        width, height, points, d, pathLength, style }
      delete childProps.xValue
      delete childProps.yValue
      delete childProps.x1Value
      delete childProps.x2Value
      delete childProps.y1Value
      delete childProps.y2Value
      delete childProps.cxValue
      delete childProps.cyValue
      delete childProps.rxValue
      delete childProps.ryValue
      delete childProps.rValue
      delete childProps.widthValue
      delete childProps.heightValue

      /* Display */
      return <WrappedComponent {...childProps} />
    }
  }

  /* * * * * Prop types * * * * */

  AsGraphBasicShape.propTypes = {}
  AsGraphBasicShape.defaultProps = {}

  return AsGraphBasicShape
}

export default asGraphBasicShape

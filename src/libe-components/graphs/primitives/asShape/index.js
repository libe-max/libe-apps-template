import React, { Component } from 'react'
import AppContext from '../../../../context'
import PositionBox from '../../primitives/PositionBox'

/*
 *   asShape HOC
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates generic props for shapes, then renders the
 *   provided wrapped component
 *   
 *   PROPS
 *   x, y, xValue, yValue,
 *   x1, x2, y1, y2, x1Value, x2Value, y1Value, y2Value
 *   r, rx, ry, rValue, rxValue, ryValue,
 *   cx, cy, cxValue, cyValue,
 *   width, height, widthValue, heightValue, background,
 *   points, d, pathLength,
 *   anchor, translate, rotate, skew, scale
 */

const asShape = Wrapped => {
  class AsShape extends Component {
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
      const { current_graph: { xScale, yScale, calcWidth, calcHeight } } = context
      console.log('asShape', Wrapped.name)
      const x = props.x !== undefined ? calcWidth(props.x) : props.xValue !== undefined ? xScale(props.xValue) : undefined
      const y = props.y !== undefined ? calcHeight(props.y) : props.yValue !== undefined ? yScale(props.yValue) : undefined
      const x1 = props.x1 !== undefined ? calcWidth(props.x1) : props.x1Value !== undefined ? xScale(props.x1Value) : undefined
      const x2 = props.x2 !== undefined ? calcWidth(props.x2) : props.x2Value !== undefined ? xScale(props.x2Value) : undefined
      const y1 = props.y1 !== undefined ? calcHeight(props.y1) : props.y1Value !== undefined ? yScale(props.y1Value) : undefined
      const y2 = props.y2 !== undefined ? calcHeight(props.y2) : props.y2Value !== undefined ? yScale(props.y2Value) : undefined
      const cx = props.cx !== undefined ? calcWidth(props.cx) : props.cxValue !== undefined ? xScale(props.cxValue) : undefined
      const cy = props.cy !== undefined ? calcHeight(props.cy) : props.cyValue !== undefined ? yScale(props.cyValue) : undefined
      const rx = props.rx !== undefined ? calcWidth(props.rx) : props.rxValue !== undefined ? xScale(props.rxValue) : undefined
      const ry = props.ry !== undefined ? calcHeight(props.ry) : props.ryValue !== undefined ? yScale(props.ryValue) : undefined
      const r = props.r !== undefined ? calcWidth(props.r) : props.rValue !== undefined ? xScale(props.rValue) : undefined
      const width = props.width !== undefined ? calcWidth(props.width) : props.widthValue !== undefined ? (xScale(props.widthValue + xScale.invert(x)) - x) : undefined // [WIP] should depend on scale type
      const height = props.height !== undefined ? calcHeight(props.height) : props.heightValue !== undefined ?( yScale(props.heightValue + yScale.invert(y)) - y) : undefined // [WIP] should depend on scale type
      const points = props.points
      const d = props.d
      const pathLength = props.pathLength
      const childProps = {
        ...props,
        x,
        y,
        x1,
        x2,
        y1,
        y2,
        rx,
        ry,
        cx,
        cy,
        r,
        width,
        height,
        points,
        d,
        pathLength
      }
      delete childProps.x
      delete childProps.y
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
      delete childProps.anchor
      delete childProps.translate
      delete childProps.rotate
      delete childProps.skew
      delete childProps.scale

      /* Display */
      return <PositionBox
        name={props.name}
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        background={props.background}
        anchor={props.anchor}
        translate={props.translate}
        rotate={props.rotate}
        skew={props.skew}
        scale={props.scale}>
        <Wrapped {...childProps} />
      </PositionBox>
    }
  }
  return AsShape
}

export default asShape

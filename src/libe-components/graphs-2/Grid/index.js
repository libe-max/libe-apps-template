import React, { Component } from 'react'
import moment from 'moment'
import { scaleLinear, scaleTime } from 'd3'

/*
 *   Grid component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Draws a graph grid
 *
 *   PROPS
 *   x, y, width, height,
 *   xScale, yScale, xTicks, yTicks,
 *   xTopLabelPosition, xBottomLabelPosition,
 *   yLeftLabelPosition, yRightLabelPosition
 *   className
 *
 */

class Grid extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-grid'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const {
      x: propsX,
      y: propsY,
      width: propsWidth,
      height: propsHeight,
      xScale: propsXScale,
      yScale: propsYScale,
      xTicks: propsXTicks,
      yTicks: propsYTicks,
      xTickFormat: propsXTicksFormat,
      yTickFormat: propsYTicksFormat,
      xTopLabelPosition: propsXTopLabelPosition,
      xBottomLabelPosition: propsXBottomLabelPosition,
      yLeftLabelPosition: propsYLeftLabelPosition,
      yRightLabelPosition: propsYRightLabelPosition,
      className
    } = props

    /* Default props */
    const x = propsX || 0
    const y = propsY || 0
    const width = propsWidth || 0
    const height = propsHeight || 0
    const xScale = propsXScale !== undefined
      ? propsXScale.range([0, width])
      : scaleLinear([0, x], [0, width])
    const yScale = propsYScale !== undefined
      ? propsYScale.range([height, 0])
      : scaleLinear([0, y], [height, 0])
    const xTicksParam = propsXTicks !== undefined ? propsXTicks : 4
    const yTicksParam = propsYTicks !== undefined ? propsYTicks : 4
    const xTickFormat = propsXTicksFormat
    const yTickFormat = propsYTicksFormat
    const xTopLabelPosition = propsXTopLabelPosition || (({ x, y }) => ({ x, y }))
    const xBottomLabelPosition = propsXBottomLabelPosition || (({ x, y }) => ({ x, y }))
    const yLeftLabelPosition = propsYLeftLabelPosition || (({ x, y }) => ({ x, y }))
    const yRightLabelPosition = propsYRightLabelPosition || (({ x, y }) => ({ x, y }))
    
    /* Inner logic */
    const xTicks = Array.isArray(xTicksParam) ? xTicksParam : xScale.ticks(xTicksParam)
    const yTicks = Array.isArray(yTicksParam) ? yTicksParam : yScale.ticks(yTicksParam)
    const xFormatter = typeof xTickFormat !== 'function' ? xScale.tickFormat(xTicks.length, xTickFormat) : xTickFormat
    const yFormatter = typeof yTickFormat !== 'function' ? yScale.tickFormat(yTicks.length, yTickFormat) : yTickFormat
    
    const xLines = xTicks.map((tick, tickPos) => {
      const xPos = xScale(tick)
      const label = xFormatter(tick)
      const lineClassName = `${c}__line ${c}__x-line ${c}__x-line-${tickPos}`
      const topLabelClassName = `${c}__label ${c}__top-label ${c}__x-label ${c}__x-label-${tickPos}`
      const bottomLabelClassName = `${c}__label ${c}__bottom-label ${c}__x-label ${c}__x-label-${tickPos}`
      const topLabelPosition = xTopLabelPosition({ x: xPos, y: 0, val: tick, label: label })
      const bottomLabelPosition = xBottomLabelPosition({ x: xPos, y: height, val: tick, label: label })
      return <g className={`${c}__x-tick`} key={xPos}>
        <line className={lineClassName} x1={xPos} y1={0} x2={xPos} y2={height} />
        <text className={topLabelClassName} {...topLabelPosition}>{label}</text>
        <text className={bottomLabelClassName} {...bottomLabelPosition}>{label}</text>
      </g>
    })
    
    const yLines = yTicks.map((tick, tickPos) => {
      const yPos = yScale(tick)
      const label = yFormatter(tick)
      const lineClassName = `${c}__line ${c}__y-line ${c}__y-line-${tickPos}`
      const leftLabelClassName = `${c}__label ${c}__left-label ${c}__y-label ${c}__y-label-${tickPos}`
      const rightLabelClassName = `${c}__label ${c}__right-label ${c}__y-label ${c}__y-label-${tickPos}`
      const leftLabelPosition = yLeftLabelPosition({ x: 0, y: yPos, val: tick, label: label })
      const rightLabelPosition = yRightLabelPosition({ x: width, y: yPos, val: tick, label: label })
      return <g className={`${c}__y-tick`} key={yPos}>
        <line className={lineClassName} x1={0} y1={yPos} x2={width} y2={yPos} />
        <text className={leftLabelClassName} {...leftLabelPosition}>{label}</text>
        <text className={rightLabelClassName} {...rightLabelPosition}>{label}</text>
      </g>
    })

    /* Assign classes */
    const classes = [c]
    if (className) classes.push(className)

    /* Display */
    return <g
      transform={`translate(${x || 0}, ${y || 0})`}
      className={classes.join(' ')}>
      {xLines}
      {yLines}
    </g>
  }
}

export default Grid

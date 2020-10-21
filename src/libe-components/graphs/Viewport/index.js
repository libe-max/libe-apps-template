import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import * as d3 from 'd3'
import Axis from '../Axis'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'
import cssUnitToPx from '../../../libe-utils/css-unit-to-px'

/*
 *   Viewport component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph viewport in which visual idioms are placed
 *
 *   PROPS
 *   x, y, width, height, axisPadding, xScale, yScale, xDomain, yDomain, className
 *
 */

/* linear
 * pow
 * sqrt
 * log
 * symlog
 * radial
 * time
 * (sequential)
 * (diverging)
 * quantize
 * quantile
 * treshold
 * ordinal
 * band
 * point
 */

export default class Viewport extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-viewport'
    this.usedProps = ['x', 'y', 'width', 'height', 'axisPadding', 'xScale', 'yScale', 'xDomain', 'yDomain', 'className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * *
   *
   * DRAW
   *
   * * * * * * * * * * * * * * * */
  draw () {
    const { props, c, $wrapper, $d3 } = this
    if (!$wrapper || !$d3) return

    console.log(this.$wrapper.getBoundingClientRect())
    
    // Define xScale
    let xScale = undefined
    if (typeof props.xScale === 'string') {
      const xScaleMethodName = `scale${props.xScale.slice(0, 1).toUpperCase()}${props.xScale.slice(1)}`
      const xScaleMethod = d3[xScaleMethodName]
      xScale = xScaleMethod()
        .domain(props.xDomain)
        .range([0, props.width])
    } else {
      xScale = props.xScale
    }

    // Define yScale
    let yScale = undefined
    if (typeof props.yScale === 'string') {
      const yScaleMethodName = `scale${props.yScale.slice(0, 1).toUpperCase()}${props.yScale.slice(1)}`
      const yScaleMethod = d3[yScaleMethodName]
      yScale = yScaleMethod()
        .domain(props.yDomain)
        .range([0, props.height])
    } else {
      yScale = props.yScale
    }
    
    $d3.innerHTML = ''
    const svg = d3.select(`.${c}__d3-wrapper`)
      .append('svg')
      .attr('width', props.width)
      .attr('height', props.height)
      .style('background', 'red')
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this
    const { x, y, width, height } = props
    
    /* Inner logic */
    const axisPadding = `${props.axisPadding}`.split(' ')
      .map(e => cssUnitToPx(e, width, context.viewport))
    axisPadding.left = axisPadding[3] || axisPadding[3] === 0
      ? axisPadding[3]
      : axisPadding[1] || axisPadding[1] === 0
        ? axisPadding[1]
        : axisPadding[0] || 0
    axisPadding.top = axisPadding[0] || 0
    axisPadding.right = axisPadding[1] || axisPadding[1] === 0
      ? axisPadding[1]
      : axisPadding[0] || 0
    axisPadding.bottom = axisPadding[2] || axisPadding[2] === 0
      ? axisPadding[2]
      : axisPadding[0] || 0
    
    const drawAttributes = {
      x: axisPadding.left,
      y: axisPadding.top,
      width: width - axisPadding.left - axisPadding.right,
      height: height - axisPadding.top - axisPadding.bottom
    }

    // Define xScale
    let xScale = undefined
    if (typeof props.xScale === 'string') {
      const xScaleMethodName = `scale${props.xScale.slice(0, 1).toUpperCase()}${props.xScale.slice(1)}`
      const xScaleMethod = d3[xScaleMethodName]
      xScale = xScaleMethod()
        .domain(props.xDomain)
        .range([0, props.width])
    } else {
      xScale = props.xScale
    }

    // Define yScale
    let yScale = undefined
    if (typeof props.yScale === 'string') {
      const yScaleMethodName = `scale${props.yScale.slice(0, 1).toUpperCase()}${props.yScale.slice(1)}`
      const yScaleMethod = d3[yScaleMethodName]
      yScale = yScaleMethod()
        .domain(props.yDomain)
        .range([0, props.height])
    } else {
      yScale = props.yScale
    }

    /* Assign classes */
    const classes = [c]

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <g
      className={classes.join(' ')}
      transform={`translate(${x}, ${y})`}
      {...passedProps}>
      <rect
        className={`${c}__bg`}
        x={0}
        y={0}
        width={width}
        height={height} />
      <rect
        className={`${c}__draw`}
        style={{ fill: 'limegreen' }}
        {...drawAttributes} />

      <Axis top
        x={drawAttributes.x}
        y={0}
        width={drawAttributes.width}
        height={drawAttributes.y} />
      <Axis right
        x={drawAttributes.x + drawAttributes.width}
        y={drawAttributes.y}
        width={width - drawAttributes.x - drawAttributes.width}
        height={drawAttributes.height} />
      <Axis bottom
        x={drawAttributes.x}
        y={drawAttributes.y + drawAttributes.height}
        width={drawAttributes.width}
        height={height - drawAttributes.y - drawAttributes.height} />
      <Axis left
        x={0}
        y={drawAttributes.y}
        width={drawAttributes.x}
        height={drawAttributes.height} />
    </g>
  }
}

/* * * * * Prop types * * * * */

Viewport.propTypes = {}
Viewport.defaultProps = {
  x: 0,
  y: 0,
  width: 200,
  height: 150,
  axisPadding: 0,
  xScale: 'linear',
  yScale: 'linear',
  xDomain: [],
  yDomain: []
}

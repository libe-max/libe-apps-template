import React, { Component } from 'react'
import { select as d3Select } from 'd3-selection'
import { 
  axisTop as d3AxisTop, 
  axisRight as d3AxisRight, 
  axisBottom as d3AxisBottom, 
  axisLeft as d3AxisLeft } from 'd3-axis'
import AppContext from '../../../../context'
import asBlock from '../../primitives/asBlock'

/*
 *   Axis component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a d3 axis
 *
 *   PROPS
 *   direction, scale, hideDomain, domainStyle,
 *   tickSize, tickOffset, tickValues, tickFormat, tickStyle,
 *   labelOffset, className
 *
 */

class Axis extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-axis'
    this.draw = this.draw.bind(this)
    this.getDirection = this.getDirection.bind(this)
    this.getOrientation = this.getOrientation.bind(this)
    this.getScale = this.getScale.bind(this)
    this.getAxis = this.getAxis.bind(this)
    this.getDomainStrokeWidth = this.getDomainStrokeWidth.bind(this)
    this.getTickSize = this.getTickSize.bind(this)
    this.getTickOffset = this.getTickOffset.bind(this)
    this.getTicksTransform = this.getTicksTransform.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.draw()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidUpdate () {
    this.draw()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET DIRECTION
   *
   * * * * * * * * * * * * * * * * */
  getDirection () {
    const { props } = this
    return ['top', 'right', 'bottom', 'left'].includes(props.direction)
      ? props.direction
      : 'bottom'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET ORIENTATION
   *
   * * * * * * * * * * * * * * * * */
  getOrientation () {
    const { getDirection } = this
    return ['left', 'right'].includes(getDirection()) ? 'v' : 'h'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET SCALE
   *
   * * * * * * * * * * * * * * * * */
  getScale () {
    const { context, getOrientation } = this
    const { current_graph: { xScale, yScale } } = context
    return getOrientation() === 'v' ? yScale : xScale
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET AXIS
   *
   * * * * * * * * * * * * * * * * */
  getAxis () {
    const { getDirection, getScale } = this
    const direction = getDirection()
    const axisGenerator = direction === 'top'
      ? d3AxisTop()
      : direction === 'right'
        ? d3AxisRight()
        : direction === 'left'
          ? d3AxisLeft()
          : d3AxisBottom()
    const scale = getScale()
    return axisGenerator.scale(scale)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET DOMAIN STROKE WIDTH
   *
   * * * * * * * * * * * * * * * * */
  getDomainStrokeWidth () {
    const { props, context, getOrientation } = this
    const { current_graph: { calcWidth, calcHeight } } = context
    const orientation = getOrientation()
    const calc = orientation === 'v' ? calcHeight : calcWidth
    const domainStyle = props.domainStyle || {}
    return !props.hideDomain ? (calc(domainStyle.strokeWidth) || 1) : 0
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET TICK SIZE
   *
   * * * * * * * * * * * * * * * * */
  getTickSize () {
    const { props } = this
    return props.tickSize !== undefined ? props.tickSize : 4
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET TICK OFFSET
   *
   * * * * * * * * * * * * * * * * */
  getTickOffset () {
    const { props } = this
    return props.tickOffset !== undefined ? props.tickOffset : 4
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET TICKS OFFSET
   *
   * * * * * * * * * * * * * * * * */
  getTicksTransform () {
    const { getDirection, getDomainStrokeWidth, getTickOffset } = this
    const direction = getDirection()
    const strokeWidth = getDomainStrokeWidth()
    const tickOffset = getTickOffset()
    const offset = strokeWidth + tickOffset
    return direction === 'top'
      ? `translate(0, ${-1 * offset})`
      : direction === 'right'
        ? `translate(${offset}, 0)`
        : direction === 'left'
          ? `translate(${-1 * offset}, 0)`
          : `translate(0, ${offset})`
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DRAW
   *
   * * * * * * * * * * * * * * * * */
  draw () {
    const { props, $ticksWrapper, getAxis, getDomainStrokeWidth, getTickSize, getTickOffset } = this
    if (!$ticksWrapper) return
    const axis = getAxis()
    
    // Setup ticks
    if (props.tickValues) axis.tickValues(props.tickValues)
    if (props.tickFormat) axis.ticks(...props.tickFormat)
    const domainStrokeWidth = getDomainStrokeWidth()
    const tickSize = getTickSize()
    const tickOffset = getTickOffset()
    axis.tickSize(-1 * (tickSize + tickOffset + domainStrokeWidth))
    // Setup label
    if (props.labelOffset) axis.tickPadding(props.labelOffset)
    // Render axis and remove domain path (rendered in render method)
    d3Select($ticksWrapper).call(axis)
    const $domain = $ticksWrapper.querySelector('.domain')
    $ticksWrapper.removeChild($domain)
    // Apply styles
    const $ticks = $ticksWrapper.querySelectorAll('.tick line')
    if (props.tickStyle) {
      $ticks.forEach($tick => {
        Object.keys(props.tickStyle).forEach(styleProp => {
          $tick.style[styleProp] = props.tickStyle[styleProp]
        })
      })
    }
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const {
      props, c, getScale, getDirection,
      getDomainStrokeWidth, getTicksTransform
    } = this

    /* Inner logic */
    const direction = getDirection()
    const range = getScale().range()

    /* Domain */
    const domainStrokeWidth = getDomainStrokeWidth()
    const domainLineProps = {
      x1: range[0],
      y1: domainStrokeWidth / -2,
      x2: range[1],
      y2: domainStrokeWidth / -2
    }
    const domainRotateValue = direction.match(/^(right|left)$/) ? 90 : 0
    const domainTranslateXValue = direction === 'left' ? (-1 * domainStrokeWidth) : 0
    const domainTranslateYValue = direction === 'bottom' ? domainStrokeWidth : 0
    const domainRotate = `rotate(${domainRotateValue})`
    const domainTranslate = `translate(${domainTranslateXValue}, ${domainTranslateYValue})`
    const domainTransform = `${domainTranslate} ${domainRotate}`

    /* Ticks */
    const ticksTransform = getTicksTransform()

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <g className={classes.join(' ')}>
      <g
        className={`${c}__domain`}
        transform={domainTransform}>
        {!props.hideDomain && <line {...domainLineProps} style={props.domainStyle} />}
      </g>
      <g
        className={`${c}__ticks`}
        transform={ticksTransform}
        ref={n => this.$ticksWrapper = n} />
    </g>
  }
}

export default asBlock(Axis)

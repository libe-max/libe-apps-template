import React from 'react'
import GraphAsset from '../../primitives/GraphAsset'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import AppContext from '../../../context'
import * as d3 from 'd3'
import Axis from '../Axis'
import cssCalcToPx from '../../../libe-utils/css-calc-to-px'

/*
 *   Viewport component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph viewport in which visual idioms are placed
 *
 *   PROPS
 *   axisPadding, xDomain, yDomain, data, render, className
 *
 */

/*
 *   SCALES
 *   
 *   continuous.invert
 *   continuous.domain
 *   continuous.range
 *   continuous.rangeRound
 *   continuous.clamp
 *   continuous.unknown
 *   continuous.interpolate
 *   continuous.ticks
 *   continuous.tickFormat
 *   continuous.nice
 *   continuous.copy
 *   
 *   pow.invert
 *   pow.exponent
 *   pow.domain
 *   pow.range
 *   pow.rangeRound
 *   pow.clamp
 *   pow.interpolate
 *   pow.ticks
 *   pow.tickFormat
 *   pow.nice
 *   pow.copy
 *   
 *   log.invert
 *   log.base
 *   log.domain
 *   log.range
 *   log.rangeRound
 *   log.clamp
 *   log.interpolate
 *   log.ticks
 *   log.tickFormat
 *   log.nice
 *   log.copy
 *   
 *   symlog.invert
 *   symlog.domain
 *   symlog.range
 *   symlog.rangeRound
 *   symlog.clamp
 *   symlog.unknown
 *   symlog.interpolate
 *   symlog.ticks
 *   symlog.tickFormat
 *   symlog.nice
 *   symlog.copy
 *   symlog.constant
 *   
 *   identity.invert
 *   identity.domain
 *   identity.range
 *   identity.unknown
 *   identity.ticks
 *   identity.tickFormat
 *   identity.nice
 *   identity.copy
 *   
 *   radial.invert
 *   radial.domain
 *   radial.range
 *   radial.rangeRound
 *   radial.clamp
 *   radial.unknown
 *   radial.ticks
 *   radial.tickFormat
 *   radial.nice
 *   radial.copy
 *   
 *   time.invert
 *   time.domain
 *   time.range
 *   time.rangeRound
 *   time.clamp
 *   time.interpolate
 *   time.ticks
 *   time.tickFormat
 *   time.nice
 *   time.copy
 *   
 *   timeUtc.invert
 *   timeUtc.domain
 *   timeUtc.range
 *   timeUtc.rangeRound
 *   timeUtc.clamp
 *   timeUtc.interpolate
 *   timeUtc.ticks
 *   timeUtc.tickFormat
 *   timeUtc.nice
 *   timeUtc.copy
 *   
 *   sequential.domain
 *   sequential.clamp
 *   sequential.interpolator
 *   sequential.range
 *   sequential.rangeRound
 *   sequential.copy
 *   
 *   sequentialLog...
 *   sequentialPow...
 *   sequentialSqrt...
 *   sequentialSymlog...
 *   sequentialQuantile...
 *   sequentialQuantile.quantiles
 *   
 *   diverging.domain
 *   diverging.clamp
 *   diverging.interpolator
 *   diverging.range
 *   diverging.rangeRound
 *   diverging.copy
 *   diverging.unknown
 *   divergingLog...
 *   divergingPow...
 *   divergingSqrt...
 *   divergingSymlog...
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
 *   
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

export default class Viewport extends GraphAsset {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-viewport'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c, Wrapper } = this

    /* Inner logic */
    const { width, height } = this.getDimensions()
    
    // [WIP] maybe deprecate the usage of cssCalcToPx outside <Graph /> ?
    const axisPadding = `${props.axisPadding}`.split(' ')
      .map(e => cssCalcToPx(e, width, context.viewport))
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

    const topAxisDimensions = {
      x: axisPadding.left,
      y: 0,
      width: Math.max(0, width - axisPadding.left - axisPadding.right),
      height: Math.max(0, axisPadding.top)
    }
    const rightAxisDimensions = {
      x: width - axisPadding.right,
      y: axisPadding.top,
      width: Math.max(0, axisPadding.right),
      height: Math.max(0, height - axisPadding.top - axisPadding.bottom)
    }
    const bottomAxisDimensions = {
      x: axisPadding.left,
      y: height - axisPadding.bottom,
      width: Math.max(0, width - axisPadding.left - axisPadding.right),
      height: Math.max(0, axisPadding.bottom)
    }
    const leftAxisDimensions = {
      x: 0,
      y: axisPadding.top,
      width: Math.max(0, axisPadding.left),
      height: Math.max(0, height - axisPadding.top - axisPadding.bottom)
    }
    const assetsDimensions = {
      x: leftAxisDimensions.width,
      y: topAxisDimensions.height,
      width: Math.max(0, width - leftAxisDimensions.width - rightAxisDimensions.width),
      height: Math.max(0, height - topAxisDimensions.height - bottomAxisDimensions.height)
    }

    const data = props.data || context.current_graph_data || []
    const xDomain = props.xDomain || [0, assetsDimensions.width]
    const yDomain = props.yDomain || [0, assetsDimensions.height]
    const xScale = d3.scaleLinear().domain(xDomain).range([0, assetsDimensions.width])
    const yScale = d3.scaleLinear().domain(yDomain).range([0, assetsDimensions.height])

    const contextWithData = {
      ...context,
      current_graph_data: data,
    }

    const contextForChildren = {
      ...contextWithData,
      current_graph_viewport: {
        width: width - axisPadding.left - axisPadding.right,
        height: height - axisPadding.top - axisPadding.bottom
      }
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <Wrapper className={classes.join(' ')}>
      <AppContext.Provider value={contextWithData}>
        <g
          className={`${c}__assets`}
          transform={`translate(${assetsDimensions.x}, ${assetsDimensions.y})`}>
          <rect width={assetsDimensions.width} height={assetsDimensions.height} style={{ fill: '#F9F9F9' }} />
          <text x={assetsDimensions.width / 2} y={6 + (assetsDimensions.height) / 2} textAnchor='middle'>Assets</text>
          <AppContext.Provider value={contextForChildren}>
            <g className={`${c}__assets-rendered`}>{props.render(data)}</g>
            <g className={`${c}__assets-children`}>{props.children}</g>
          </AppContext.Provider>
        </g>
        <g
          className={`${c}__top-axis`}
          transform={`translate(${topAxisDimensions.x}, ${topAxisDimensions.y})`}>
          {props.showTopAxis
          && <Axis
            top
            scale={xScale}
            width={topAxisDimensions.width} />}
        </g>
        <g
          className={`${c}__right-axis`}
          transform={`translate(${rightAxisDimensions.x}, ${rightAxisDimensions.y})`}>
          {props.showRightAxis
          && <Axis
            right
            scale={yScale}
            x={rightAxisDimensions.width}
            height={rightAxisDimensions.height} />}
        </g>
        <g
          className={`${c}__bottom-axis`}
          transform={`translate(${bottomAxisDimensions.x}, ${bottomAxisDimensions.y})`}>
          {props.showBottomAxis
          && <Axis
            bottom
            scale={xScale}
            y={bottomAxisDimensions.height}
            width={bottomAxisDimensions.width} />}
        </g>
        <g
          className={`${c}__left-axis`}
          transform={`translate(${leftAxisDimensions.x}, ${leftAxisDimensions.y})`}>
          {props.showLeftAxis
          && <Axis
            left
            scale={yScale}
            height={leftAxisDimensions.height} />}
        </g>
      </AppContext.Provider>
    </Wrapper> 
  }
}

/* * * * * Prop types * * * * */

Viewport.propTypes = {}
Viewport.defaultProps = {
  axisPadding: 0,
  render: data => ''
}

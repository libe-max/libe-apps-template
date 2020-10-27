import React, { Component } from 'react'
import * as d3 from 'd3'
import asGraphAsset from '../asGraphAsset'
import AppContext from '../../../context'
import Axis from '../Axis'
import Viewport from '../Viewport'

/*
 *   Frame component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphAsset HOC
 *
 *   DESCRIPTION
 *   Displays a graph frame in which visual idioms are placed
 *
 *   IMPERATIVE PROPS (from asGraphAsset HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, render
 *
 *   OWN PROPS
 *   children, axisPadding, xDomain, yDomain, className
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
 *   quantize.invertExtent
 *   quantize.domain
 *   quantize.range
 *   quantize.ticks
 *   quantize.tickFormat
 *   quantize.nice
 *   quantize.tresholds
 *   quantize.copy
 *   
 *   quantile.invertExtent
 *   quantile.domain
 *   quantile.range
 *   quantile.quantiles
 *   quantile.copy
 *   
 *   threshold.invertExtent
 *   treshold.domain
 *   treshold.range
 *   treshold.copy
 *   
 *   ordinal.domain
 *   ordinal.range
 *   ordinal.unknown
 *   ordinal.copy
 *   
 *   band.domain
 *   band.range
 *   band.rangeRount
 *   band.round
 *   band.paddingInner
 *   band.paddingOuter
 *   band.padding
 *   band.align
 *   band.bandwidth
 *   band.copy
 *   
 *   point.domain
 *   point.range
 *   point.rangeRound
 *   point.round
 *   point.padding
 *   point.align
 *   point.bandwidth
 *   point.step
 *   point.copy
 *   
 *   
 *   AXES
 *   
 *   axis.scale
 *   axis.ticks
 *   axis.tickArguments
 *   axis.tickValues
 *   axis.tickFormat
 *   axis.tickSize
 *   axis.tickSizeInner
 *   axis.tickSizeOuter
 *   axis.tickPadding
 *   
 */

class Frame extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-frame'
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
    const { props, context, c } = this

    /* Inner logic */
    const { width, height, calcPadding } = props
    
    const axisPadding = calcPadding(props.axisPadding)

    const axesDimensions = {
      top: {
        x: axisPadding.left,
        y: 0,
        width: Math.max(0, width - axisPadding.left - axisPadding.right),
        height: Math.max(0, axisPadding.top)
      },
      right: {
        x: width - axisPadding.right,
        y: axisPadding.top,
        width: Math.max(0, axisPadding.right),
        height: Math.max(0, height - axisPadding.top - axisPadding.bottom)
      },
      bottom: {
        x: axisPadding.left,
        y: height - axisPadding.bottom,
        width: Math.max(0, width - axisPadding.left - axisPadding.right),
        height: Math.max(0, axisPadding.bottom)
      },
      left: {
        x: 0,
        y: axisPadding.top,
        width: Math.max(0, axisPadding.left),
        height: Math.max(0, height - axisPadding.top - axisPadding.bottom)
      }
    }
    const assetsDimensions = {
      x: axesDimensions.left.width,
      y: axesDimensions.top.height,
      width: Math.max(0, width - axesDimensions.left.width - axesDimensions.right.width),
      height: Math.max(0, height - axesDimensions.top.height - axesDimensions.bottom.height)
    }

    const xDomain = props.xDomain || [0, assetsDimensions.width]
    const yDomain = props.yDomain || [0, assetsDimensions.height]
    const xScale = d3.scaleLinear().domain(xDomain).range([0, assetsDimensions.width])
    const yScale = d3.scaleLinear().domain(yDomain).range([0, assetsDimensions.height])

    const childrenAssetsContext = {
      ...context,
      current_graph_asset: {
        ...context.current_graph_asset,
        width: Math.max(width - axisPadding.left - axisPadding.right, 0),
        height: Math.max(height - axisPadding.top - axisPadding.bottom, 0)
      }
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      <g
        className={`${c}__assets`}
        transform={`translate(${assetsDimensions.x}, ${assetsDimensions.y})`}>
        <rect width={assetsDimensions.width} height={assetsDimensions.height} style={{ fill: '#F9F9F9' }} />
        <text x={assetsDimensions.width / 2} y={6 + (assetsDimensions.height) / 2} textAnchor='middle'>Assets</text>
        <Viewport render={props.render}>
          {props.children}
        </Viewport>

        <AppContext.Provider value={childrenAssetsContext}>
          
        </AppContext.Provider>
      </g>
      <g
        className={`${c}__top-axis`}
        transform={`translate(${axesDimensions.top.x}, ${axesDimensions.top.y})`}>
        {props.showTopAxis
        && <Axis
          top
          scale={xScale}
          width={axesDimensions.top.width} />}
      </g>
      <g
        className={`${c}__right-axis`}
        transform={`translate(${axesDimensions.right.x}, ${axesDimensions.right.y})`}>
        {props.showRightAxis
        && <Axis
          right
          scale={yScale}
          x={axesDimensions.right.width}
          height={axesDimensions.right.height} />}
      </g>
      <g
        className={`${c}__bottom-axis`}
        transform={`translate(${axesDimensions.bottom.x}, ${axesDimensions.bottom.y})`}>
        {props.showBottomAxis
        && <Axis
          bottom
          scale={xScale}
          y={axesDimensions.bottom.height}
          width={axesDimensions.bottom.width} />}
      </g>
      <g
        className={`${c}__left-axis`}
        transform={`translate(${axesDimensions.left.x}, ${axesDimensions.left.y})`}>
        {props.showLeftAxis
        && <Axis
          left
          scale={yScale}
          height={axesDimensions.left.height} />}
      </g>
    </g> 
  }
}

export default asGraphAsset(Frame)

/* * * * * Prop types * * * * */

Frame.propTypes = {}
Frame.defaultProps = {
  axisPadding: 0
}

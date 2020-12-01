import React, { Component } from 'react'
import AppContext from '../../../../context'
import asContainer from '../../primitives/asContainer'
import Axis from '../../blocks/Axis'
import Viewport from '../Viewport'

/*
 *   Frame component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a Frame containing Axes and a Viewport
 *
 *   PROPS
 *   children, showTopAxis, showRightAxis, showBottomAxis, showLeftAxis, viewportPadding, 
 *   viewportStyle, viewportInnerStyle, viewportClipContent, viewportInnerClipContent, 
 *   hideDomain, hideTopDomain, hideRightDomain, hideBottomDomain, hideLeftDomain,
 *   domainStyle ,topDomainStyle, rightDomainStyle, bottomDomainStyle, leftDomainStyle,
 *   tickSize, topTickSize, rightTickSize, bottomTickSize, leftTickSize,
 *   tickOffset, topTickOffset, rightTickOffset, bottomTickOffset, leftTickOffset,
 *   tickValues, topTickValues, rightTickValues, bottomTickValues, leftTickValues,
 *   tickFormat, topTickFormat, rightTickFormat, bottomTickFormat, leftTickFormat,
 *   tickStyle, topTickStyle, rightTickStyle, bottomTickStyle, leftTickStyle,
 *   labelOffset, topLabelOffset, rightLabelOffset, bottomLabelOffset, leftLabelOffset,
 *   className
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

  /* * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this

    /* Inner logic */
    const { current_graph: { width, height, calcWidth, calcHeight, calcPadding } } = context
    const viewportPadding = calcPadding(props.viewportPadding)
    const axesDimensions = {
      top: {
        x: viewportPadding.left,
        y: 0,
        width: Math.max(0, width - viewportPadding.left - viewportPadding.right),
        height: Math.max(0, viewportPadding.top)
      },
      right: {
        x: width - viewportPadding.right,
        y: viewportPadding.top,
        width: Math.max(0, viewportPadding.right),
        height: Math.max(0, height - viewportPadding.top - viewportPadding.bottom)
      },
      bottom: {
        x: viewportPadding.left,
        y: height - viewportPadding.bottom,
        width: Math.max(0, width - viewportPadding.left - viewportPadding.right),
        height: Math.max(0, viewportPadding.bottom)
      },
      left: {
        x: 0,
        y: viewportPadding.top,
        width: Math.max(0, viewportPadding.left),
        height: Math.max(0, height - viewportPadding.top - viewportPadding.bottom)
      }
    }

    /* Axes */
    /* Tick size */
    const topTickSize = props.topTickSize !== undefined ? calcHeight(props.topTickSize) : calcHeight(props.tickSize)
    const rightTickSize = props.rightTickSize !== undefined ? calcWidth(props.rightTickSize) : calcWidth(props.tickSize)
    const bottomTickSize = props.bottomTickSize !== undefined ? calcHeight(props.bottomTickSize) : calcHeight(props.tickSize)
    const leftTickSize = props.leftTickSize !== undefined ? calcWidth(props.leftTickSize) : calcWidth(props.tickSize)
    /* Tick offset */
    const topTickOffset = props.topTickOffset !== undefined ? calcHeight(props.topTickOffset) : calcHeight(props.tickOffset)
    const rightTickOffset = props.rightTickOffset !== undefined ? calcWidth(props.rightTickOffset) : calcWidth(props.tickOffset)
    const bottomTickOffset = props.bottomTickOffset !== undefined ? calcHeight(props.bottomTickOffset) : calcHeight(props.tickOffset)
    const leftTickOffset = props.leftTickOffset !== undefined ? calcWidth(props.leftTickOffset) : calcWidth(props.tickOffset)
    /* Tick values */
    const topTickValues = props.topTickValues ? props.topTickValues : props.tickValues
    const rightTickValues = props.rightTickValues ? props.rightTickValues : props.tickValues
    const bottomTickValues = props.bottomTickValues ? props.bottomTickValues : props.tickValues
    const leftTickValues = props.leftTickValues ? props.leftTickValues : props.tickValues
    /* Tick format */
    const topTickFormat = props.topTickFormat ? props.topTickFormat : props.tickFormat
    const rightTickFormat = props.rightTickFormat ? props.rightTickFormat : props.tickFormat
    const bottomTickFormat = props.bottomTickFormat ? props.bottomTickFormat : props.tickFormat
    const leftTickFormat = props.leftTickFormat ? props.leftTickFormat : props.tickFormat
    /* Tick padding */
    const topLabelOffset = props.topLabelOffset !== undefined ? calcHeight(props.topLabelOffset) : calcHeight(props.labelOffset)
    const rightLabelOffset = props.rightLabelOffset !== undefined ? calcWidth(props.rightLabelOffset) : calcWidth(props.labelOffset)
    const bottomLabelOffset = props.bottomLabelOffset !== undefined ? calcHeight(props.bottomLabelOffset) : calcHeight(props.labelOffset)
    const leftLabelOffset = props.leftLabelOffset !== undefined ? calcWidth(props.leftLabelOffset) : calcWidth(props.labelOffset)
    /* Tick style */
    const tickStyle = props.tickStyle || {}
    const topTickStyle = props.topTickStyle ? { ...tickStyle, ...props.topTickStyle } : tickStyle
    const rightTickStyle = props.rightTickStyle ? { ...tickStyle, ...props.rightTickStyle } : tickStyle
    const bottomTickStyle = props.bottomTickStyle ? { ...tickStyle, ...props.bottomTickStyle } : tickStyle
    const leftTickStyle = props.leftTickStyle ? { ...tickStyle, ...props.leftTickStyle } : tickStyle

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      <Viewport
        width={width}
        height={height}
        padding={props.viewportPadding}
        xScaleDomain={props.xScaleDomain}
        yScaleDomain={props.yScaleDomain}
        xScaleConf={props.xScaleConf}
        yScaleConf={props.yScaleConf}
        render={props.render}
        style={props.viewportStyle}
        innerStyle={props.viewportInnerStyle}
        clipContent={props.viewportClipContent}
        innerClipContent={props.viewportInnerClipContent}>
        {props.children}
      </Viewport>
      {props.showTopAxis
        && <g
        className={`${c}__top-axis`}
        transform={`translate(${axesDimensions.top.x}, ${axesDimensions.top.y})`}>
        <Axis
          width={axesDimensions.top.width}
          height={axesDimensions.top.height}
          xScale={props.xScale}
          yScale={props.yScale}
          xScaleDomain={props.xScaleDomain}
          yScaleDomain={props.yScaleDomain}
          xScaleConf={props.xScaleConf}
          yScaleConf={props.yScaleConf}
          direction='top'
          hideDomain={props.hideTopDomain || props.hideDomain}
          domainStyle={{ ...props.domainStyle, ...props.topDomainStyle }}
          tickSize={topTickSize}
          tickOffset={topTickOffset}
          tickValues={topTickValues}
          tickFormat={topTickFormat}
          tickStyle={topTickStyle}
          labelOffset={topLabelOffset} />
      </g>}
      {props.showRightAxis
        && <g
        className={`${c}__right-axis`}
        transform={`translate(${axesDimensions.right.x}, ${axesDimensions.right.y})`}>
        <Axis
          x={axesDimensions.right.width}
          width={axesDimensions.right.width}
          height={axesDimensions.right.height}
          xScale={props.xScale}
          yScale={props.yScale}
          xScaleDomain={props.xScaleDomain}
          yScaleDomain={props.yScaleDomain}
          xScaleConf={props.xScaleConf}
          yScaleConf={props.yScaleConf}
          direction='right'
          hideDomain={props.hideRightDomain || props.hideDomain}
          domainStyle={{ ...props.domainStyle, ...props.rightDomainStyle }}
          tickSize={rightTickSize}
          tickOffset={rightTickOffset}
          tickValues={rightTickValues}
          tickFormat={rightTickFormat}
          tickStyle={rightTickStyle}
          labelOffset={rightLabelOffset} />
      </g>}
      {props.showBottomAxis
        && <g
        className={`${c}__bottom-axis`}
        transform={`translate(${axesDimensions.bottom.x}, ${axesDimensions.bottom.y})`}>
        <Axis
          y={axesDimensions.bottom.height}
          width={axesDimensions.bottom.width}
          height={axesDimensions.bottom.height}
          xScale={props.xScale}
          yScale={props.yScale}
          xScaleDomain={props.xScaleDomain}
          yScaleDomain={props.yScaleDomain}
          xScaleConf={props.xScaleConf}
          yScaleConf={props.yScaleConf}
          direction='bottom'
          hideDomain={props.hideBottomDomain || props.hideDomain}
          domainStyle={{ ...props.domainStyle, ...props.bottomDomainStyle }}
          tickSize={bottomTickSize}
          tickOffset={bottomTickOffset}
          tickValues={bottomTickValues}
          tickFormat={bottomTickFormat}
          tickStyle={bottomTickStyle}
          labelOffset={bottomLabelOffset} />
      </g>}
      {props.showLeftAxis
        && <g
        className={`${c}__left-axis`}
        transform={`translate(${axesDimensions.left.x}, ${axesDimensions.left.y})`}>
        <Axis
          width={axesDimensions.left.width}
          height={axesDimensions.left.height}
          xScale={props.xScale}
          yScale={props.yScale}
          xScaleDomain={props.xScaleDomain}
          yScaleDomain={props.yScaleDomain}
          xScaleConf={props.xScaleConf}
          yScaleConf={props.yScaleConf}
          direction='left'
          hideDomain={props.hideLeftDomain || props.hideDomain}
          domainStyle={{ ...props.domainStyle, ...props.leftDomainStyle }}
          tickSize={leftTickSize}
          tickOffset={leftTickOffset}
          tickValues={leftTickValues}
          tickFormat={leftTickFormat}
          tickStyle={leftTickStyle}
          labelOffset={leftLabelOffset} />
      </g>}
    </g>
  }
}

export default asContainer(Frame)

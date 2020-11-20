import React, { Component } from 'react'
import AppContext from '../../../../context'
import asContainer from '../../primitives/asContainer'
import Frame from '../Frame'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a Graph component with a head, a foot, a body, and a Frame
 *   
 *   PROPS
 *   children, title, subtitle, source, titleAlign, subtitleAlign, sourceAlign, 
 *   headTop, footBottom, titleLeft, titleRight, subtitleLeft, subtitleRight, sourceLeft, sourceRight,
 *   framePadding, frameStyle, frameInnerStyle, frameClipContent, frameInnerClipContent,
 *   viewportPadding, viewportStyle, viewportInnerStyle, viewportClipContent, viewportInnerClipContent,
 *   showTopAxis, showRightAxis, showBottomAxis, showLeftAxis,
 *   hideDomain, hideTopDomain, hideRightDomain, hideBottomDomain, hideLeftDomain,
 *   domainStyle, topDomainStyle, rightDomainStyle, bottomDomainStyle, leftDomainStyle,
 *   tickSize, topTickSize, rightTickSize, bottomTickSize, leftTickSize,
 *   tickOffset, topTickOffset, rightTickOffset, bottomTickOffset, leftTickOffset,
 *   tickValues, topTickValues, rightTickValues, bottomTickValues, leftTickValues,
 *   tickFormat, topTickFormat, rightTickFormat, bottomTickFormat, leftTickFormat,
 *   tickStyle, topTickStyle, rightTickStyle, bottomTickStyle, leftTickStyle,
 *   labelOffset, topLabelOffset, rightLabelOffset, bottomLabelOffset, leftLabelOffset,
 *   className
 *
 */

class Graph extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-graph'
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
    const { props, context, c } = this

    /* Inner logic */
    const { current_graph: { width, height, calcWidth, calcHeight } } = context

    const titleLines = (props.title || '').split(/<br\s?\/>/igm)
    const titleLineHeight = 2.5 * context.viewport.rem
    const titleMarginBottom = .5 * context.viewport.rem
    const titleTextAnchor = props.titleAlign
    const titleLeft = calcWidth(props.titleLeft)
    const titleRight = calcWidth(props.titleRight)
    const titleX = titleRight !== undefined
      ? width - titleRight
      : titleLeft || 0
    const titleY = calcHeight(props.headTop) || 0

    const subtitleLines = (props.subtitle || '').split(/<br\s?\/>/igm)
    const subtitleLineHeight = 1 * context.viewport.rem
    const subtitleTextAnchor = props.subtitleAlign
    const subtitleLeft = calcWidth(props.subtitleLeft)
    const subtitleRight = calcWidth(props.subtitleRight)
    const subtitleX = subtitleRight !== undefined
      ? width - subtitleRight
      : subtitleLeft || 0
    const subtitleY = titleLines.length * titleLineHeight + titleMarginBottom

    const sourceLines = (props.source || '').split(/<br\s?\/>/igm)
    const sourceLineHeight = 1 * context.viewport.rem
    const sourceTextAnchor = props.sourceAlign
    const sourceLeft = calcWidth(props.sourceLeft)
    const sourceRight = calcWidth(props.sourceRight)
    const sourceX = sourceRight !== undefined
      ? width - sourceRight
      : sourceLeft || 0

    const footBottom = calcHeight(props.footBottom) || 0
    const sourceY = height - footBottom - (sourceLines.length) * sourceLineHeight

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      <Frame
        padding={props.framePadding}
        showTopAxis={props.showTopAxis}
        showRightAxis={props.showRightAxis}
        showBottomAxis={props.showBottomAxis}
        showLeftAxis={props.showLeftAxis}
        xScaleDomain={props.xScaleDomain}
        yScaleDomain={props.yScaleDomain}
        xScaleConf={props.xScaleConf}
        yScaleConf={props.yScaleConf}
        render={props.render}
        style={props.frameStyle}
        innerStyle={props.frameInnerStyle}
        clipContent={props.frameClipContent}
        innerClipContent={props.frameInnerClipContent}
        viewportPadding={props.viewportPadding}
        viewportStyle={props.viewportStyle}
        viewportInnerStyle={props.viewportInnerStyle}
        viewportClipContent={props.viewportClipContent}
        viewportInnerClipContent={props.viewportInnerClipContent}
        hideDomain={props.hideDomain}
        hideTopDomain={props.hideTopDomain}
        hideRightDomain={props.hideRightDomain}
        hideBottomDomain={props.hideBottomDomain}
        hideLeftDomain={props.hideLeftDomain}
        domainStyle={props.domainStyle}
        topDomainStyle={props.topDomainStyle}
        rightDomainStyle={props.rightDomainStyle}
        bottomDomainStyle={props.bottomDomainStyle}
        leftDomainStyle={props.leftDomainStyle}
        tickSize={props.tickSize}
        topTickSize={props.topTickSize}
        rightTickSize={props.rightTickSize}
        bottomTickSize={props.bottomTickSize}
        leftTickSize={props.leftTickSize}
        tickOffset={props.tickOffset}
        topTickOffset={props.topTickOffset}
        rightTickOffset={props.rightTickOffset}
        bottomTickOffset={props.bottomTickOffset}
        leftTickOffset={props.leftTickOffset}
        tickValues={props.tickValues}
        topTickValues={props.topTickValues}
        rightTickValues={props.rightTickValues}
        bottomTickValues={props.bottomTickValues}
        leftTickValues={props.leftTickValues}
        tickFormat={props.tickFormat}
        topTickFormat={props.topTickFormat}
        rightTickFormat={props.rightTickFormat}
        bottomTickFormat={props.bottomTickFormat}
        leftTickFormat={props.leftTickFormat}
        labelOffset={props.labelOffset}
        topLabelOffset={props.topLabelOffset}
        rightLabelOffset={props.rightLabelOffset}
        bottomLabelOffset={props.bottomLabelOffset}
        leftLabelOffset={props.leftLabelOffset}
        tickStyle={props.tickStyle}
        topTickStyle={props.topTickStyle}
        rightTickStyle={props.rightTickStyle}
        bottomTickStyle={props.bottomTickStyle}
        leftTickStyle={props.leftTickStyle}>
        {props.children}
      </Frame>
      <g className={`${c}__title`} transform={`translate(0, ${titleY})`}>{
        titleLines.map((line, i) => <text
          key={i}
          x={titleX}
          y={(i + 1) * titleLineHeight}
          textAnchor={titleTextAnchor}>
          {line}
        </text>)
      }</g>
      <g className={`${c}__subtitle`} transform={`translate(0, ${subtitleY})`}>{
        subtitleLines.map((line, i) => <text
          key={i}
          x={subtitleX}
          y={(i + 1) * subtitleLineHeight}
          textAnchor={subtitleTextAnchor}>
          {line}
        </text>)
      }</g>
      <g className={`${c}__source`} transform={`translate(0, ${sourceY})`}>{
        sourceLines.map((line, i) => <text
          key={i}
          x={sourceX}
          y={(i + 1) * sourceLineHeight}
          textAnchor={sourceTextAnchor}>
          {line}
        </text>)
      }</g>
    </g>
  }
}

export default asContainer(Graph)

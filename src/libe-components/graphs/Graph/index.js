import React, { Component } from 'react'
import asGraphAsset from '../asGraphAsset'
import AppContext from '../../../context'
import Frame from '../Frame'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphAsset HOC
 *
 *   DESCRIPTION
 *   displays a Graph component with a head, a foot, and a body
 *
 *   CONTEXT (from asGraphAsset HOC)
 *   width, height, data, xScale, yScale, calcWidth, calcHeight, calcPadding
 *   
 *   PROPS (from asGraphAsset HOC)
 *   render, _renderer
 *
 *   OWN PROPS
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
 *   tickLabelPadding, topTickLabelPadding, rightTickLabelPadding, bottomTickLabelPadding, leftTickLabelPadding,
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
    this.c = 'lblb-graph'
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
    const { width, height, calcWidth, calcHeight } = context.current_graph_asset

    const titleLines = props.title.split(/<br\s?\/>/igm)
    const titleLineHeight = 2.5 * context.viewport.rem
    const titleMarginBottom = .5 * context.viewport.rem
    const titleTextAnchor = props.titleAlign
    const titleLeft = calcWidth(props.titleLeft)
    const titleRight = calcWidth(props.titleRight)
    const titleX = titleRight !== undefined
      ? width - titleRight
      : titleLeft || 0

    const subtitleLines = props.subtitle.split(/<br\s?\/>/igm)
    const subtitleLineHeight = 1 * context.viewport.rem
    const subtitleTextAnchor = props.subtitleAlign
    const subtitleLeft = calcWidth(props.subtitleLeft)
    const subtitleRight = calcWidth(props.subtitleRight)
    const subtitleX = subtitleRight !== undefined
      ? width - subtitleRight
      : subtitleLeft || 0

    const sourceLines = props.source.split(/<br\s?\/>/igm)
    const sourceLineHeight = 1 * context.viewport.rem
    const sourceTextAnchor = props.sourceAlign
    const sourceLeft = calcWidth(props.sourceLeft)
    const sourceRight = calcWidth(props.sourceRight)
    const sourceX = sourceRight !== undefined
      ? width - sourceRight
      : sourceLeft || 0

    const headTop = calcHeight(props.headTop) || 0
    const headY = headTop
    const footBottom = calcHeight(props.footBottom) || 0
    const footY = height - footBottom - (sourceLines.length) * sourceLineHeight

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

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
        tickLabelOffset={props.tickLabelOffset}
        topTickLabelOffset={props.topTickLabelOffset}
        rightTickLabelOffset={props.rightTickLabelOffset}
        bottomTickLabelOffset={props.bottomTickLabelOffset}
        leftTickLabelOffset={props.leftTickLabelOffset}
        tickStyle={props.tickStyle}
        topTickStyle={props.topTickStyle}
        rightTickStyle={props.rightTickStyle}
        bottomTickStyle={props.bottomTickStyle}
        leftTickStyle={props.leftTickStyle}>
        {props.children}
      </Frame>
      <g
        className={`${c}__head`}
        transform={`translate(0, ${headY})`}>
        <g className={`${c}__title`}>{
          titleLines.map((line, i) => <text
            key={i}
            x={titleX}
            y={(i + 1) * titleLineHeight}
            textAnchor={titleTextAnchor}>
            {line}
          </text>)
        }</g>
        <g
          className={`${c}__subtitle`}
          transform={`translate(0, ${titleMarginBottom + titleLines.length * titleLineHeight})`}>{
          subtitleLines.map((line, i) => <text
            key={i}
            x={subtitleX}
            y={(i + 1) * subtitleLineHeight}
            textAnchor={subtitleTextAnchor}>
            {line}
          </text>)
        }</g>
      </g>
      <g
        className={`${c}__foot`}
        transform={`translate(0, ${footY})`}>
        <g className={`${c}__source`}>
          {sourceLines.map((line, i) => <text
            key={i}
            x={sourceX}
            y={(i + 1) * sourceLineHeight}
            textAnchor={sourceTextAnchor}>
            {line}
          </text>)}
        </g>
      </g>
    </g>
  }
}

export default asGraphAsset(Graph)

/* * * * * Prop types * * * * */

Graph.propTypes = {}
Graph.defaultProps = {}

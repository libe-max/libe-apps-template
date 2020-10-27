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
 *   IMPERATIVE PROPS (from asGraphAsset HOC)
 *   width, height, calcWidth, calcHeight, data, render
 *
 *   OWN PROPS
 *   children, headTop, title, titleAlign, titleLeft, titleRight,
 *   subtitle, subtitleAlign, subtitleLeft, subtitleRight, footBottom,
 *   source, sourceAlign, sourceLeft, sourceRight, framePadding, frameAxisPadding,
 *   showTopAxis, showRightAxis, showBottomAxis, showLeftAxis, xDomain, yDomain, 
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
    const { width, height, calcWidth, calcHeight } = props
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
      <g className={`${c}__body`}>
        <Frame
          padding={props.framePadding}
          axisPadding={props.frameAxisPadding}
          data={props.data}
          render={props.render}
          showTopAxis={props.showTopAxis}
          showRightAxis={props.showRightAxis}
          showBottomAxis={props.showBottomAxis}
          showLeftAxis={props.showLeftAxis}
          xDomain={props.xDomain}
          yDomain={props.yDomain}>
          {props.children}
        </Frame>
      </g>
      <g className={`${c}__head`} transform={`translate(0, ${headY})`}>
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
Graph.defaultProps = {
  headTop: 0,
  title: '',
  titleAlign: 'start',
  titleLeft: 0,
  subtitle: '',
  subtitleAlign: 'start',
  subtitleLeft: 0,
  footBottom: 0,
  source: '',
  sourceAlign: 'start',
  sourceLeft: 0,
  framePadding: 0,
  frameAxisPadding: 0
}

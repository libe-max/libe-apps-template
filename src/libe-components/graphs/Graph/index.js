import React from 'react'
import GraphAsset from '../../primitives/GraphAsset'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import * as d3 from 'd3'
import cssCalcToPx from '../../../libe-utils/css-calc-to-px'
import Viewport from '../Viewport'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph wrapper, with a head (title, subtitle),
 *   a foot (source), and a body (children)
 *
 *   PROPS
 *   headTop, title, titleAlign, titleLeft, titleRight,
 *   subtitle, subtitleAlign, subtitleLeft, subtitleRight, footBottom,
 *   source, sourceAlign, sourceLeft, sourceRight, viewportPadding, viewportAxisPadding,
 *   data, render, showTopAxis, showRightAxis, showBottomAxis, showLeftAxis,
 *   xDomain, yDomain, className
 *
 */

export default class Graph extends GraphAsset {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
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
    const { props, context, c, Wrapper } = this

    /* Inner logic */
    const { width, height } = this.getDimensions()

    const titleLines = props.title.split(/<br\s?\/>/igm)
    const titleLineHeight = 2.5 * context.viewport.rem
    const titleMarginBottom = .5 * context.viewport.rem
    const titleTextAnchor = props.titleAlign
    const titleLeft = cssCalcToPx(props.titleLeft, width, context.viewport)
    const titleRight = cssCalcToPx(props.titleRight, width, context.viewport)
    const titleX = titleRight !== undefined
      ? width - titleRight
      : titleLeft || 0

    const subtitleLines = props.subtitle.split(/<br\s?\/>/igm)
    const subtitleLineHeight = 1 * context.viewport.rem
    const subtitleTextAnchor = props.subtitleAlign
    const subtitleLeft = cssCalcToPx(props.subtitleLeft, width, context.viewport)
    const subtitleRight = cssCalcToPx(props.subtitleRight, width, context.viewport)
    const subtitleX = subtitleRight !== undefined
      ? width - subtitleRight
      : subtitleLeft || 0

    const sourceLines = props.source.split(/<br\s?\/>/igm)
    const sourceLineHeight = 1 * context.viewport.rem
    const sourceTextAnchor = props.sourceAlign
    const sourceLeft = cssCalcToPx(props.sourceLeft, width, context.viewport)
    const sourceRight = cssCalcToPx(props.sourceRight, width, context.viewport)
    const sourceX = sourceRight !== undefined
      ? width - sourceRight
      : sourceLeft || 0

    const headTop = cssCalcToPx(props.headTop, height, context.viewport) || 0
    const headY = headTop
    const footBottom = cssCalcToPx(props.footBottom, height, context.viewport) || 0
    const footY = height - footBottom - (sourceLines.length) * sourceLineHeight

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <Wrapper className={classes.join(' ')}>
      <g className={`${c}__body`}>
        <Viewport
          name='viewport'
          padding={props.viewportPadding}
          axisPadding={props.viewportAxisPadding}
          data={props.data}
          render={props.render}
          showTopAxis={props.showTopAxis}
          showRightAxis={props.showRightAxis}
          showBottomAxis={props.showBottomAxis}
          showLeftAxis={props.showLeftAxis}
          xDomain={props.xDomain}
          yDomain={props.yDomain}>
          {props.children}
        </Viewport>
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
    </Wrapper>
  }
}

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
  viewportPadding: 0,
  viewportAxisPadding: 0,
  render: data => ''
}

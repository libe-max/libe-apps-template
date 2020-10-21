import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import * as d3 from 'd3'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'
import cssUnitToPx from '../../../libe-utils/css-unit-to-px'
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
 *   height, headTop, headBottom, title, titleAlign, titleLeft, titleRight,
 *   subtitle, subtitleAlign, subtitleLeft, subtitleRight, footTop, footBottom,
 *   source, sourceAlign, sourceLeft, sourceRight, padding, axisPadding,
 *   className
 *
 */

export default class Graph extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph'
    this.usedProps = [
      'height', 'headTop', 'headBottom', 'title', 'titleAlign', 'titleLeft', 'titleRight',
      'subtitle', 'subtitleAlign', 'subtitleLeft', 'subtitleRight', 'footTop', 'footBottom',
      'source', 'sourceAlign', 'sourceLeft', 'sourceRight', 'padding', 'axisPadding',
      'className'
    ]
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
    const width = props.width || 600
    const height = props.height || 380

    /* Inner logic */
    const svgStyle = {
      display: 'block',
      boxShadow: '0 0 2rem 0 rgba(33, 33,33, .2)'
    }
    const titleLines = props.title.split(/<br\s?\/>/igm)
    const titleLineHeight = 2.5 * context.viewport.rem
    const titleMarginBottom = .5 * context.viewport.rem
    const titleTextAnchor = props.titleAlign
    const titleX = props.titleRight !== undefined
      ? width - cssUnitToPx(props.titleRight, width, context.viewport)
      : cssUnitToPx(props.titleLeft, width, context.viewport)

    const subtitleLines = props.subtitle.split(/<br\s?\/>/igm)
    const subtitleLineHeight = 1 * context.viewport.rem
    const subtitleTextAnchor = props.subtitleAlign
    const subtitleX = props.subtitleRight !== undefined
      ? width - cssUnitToPx(props.subtitleRight, width, context.viewport)
      : cssUnitToPx(props.subtitleLeft, width, context.viewport)

    const headY = props.headBottom !== undefined
      ? height - cssUnitToPx(props.headBottom, height, context.viewport)
      : cssUnitToPx(props.headTop, height, context.viewport)
    const headTransform = `translate(0, ${headY})`

    const sourceLines = props.source.split(/<br\s?\/>/igm)
    const sourceLineHeight = 1 * context.viewport.rem
    const sourceTextAnchor = props.sourceAlign
    const sourceX = props.sourceRight !== undefined
      ? width - cssUnitToPx(props.sourceRight, width, context.viewport)
      : cssUnitToPx(props.sourceLeft, width, context.viewport)

    const footY = props.footTop
      ? cssUnitToPx(props.footBottom, height, context.viewport) - (0.5 + sourceLines.length) * sourceLineHeight
      : height - cssUnitToPx(props.footBottom, height, context.viewport) - (0.5 + sourceLines.length) * sourceLineHeight
    const footTransform = `translate(0, ${footY})`

    const pxArrayPadding = `${props.padding}`.split(' ')
      .map(e => cssUnitToPx(e, width, context.viewport))
    const paddingLeft = pxArrayPadding[3] || pxArrayPadding[3] === 0
      ? pxArrayPadding[3]
      : pxArrayPadding[1] || pxArrayPadding[1] === 0
        ? pxArrayPadding[1]
        : pxArrayPadding[0] || 0
    const paddingTop = pxArrayPadding[0] || 0
    const paddingRight = pxArrayPadding[1] || pxArrayPadding[1] === 0
      ? pxArrayPadding[1]
      : pxArrayPadding[0] || 0
    const paddingBottom = pxArrayPadding[2] || pxArrayPadding[2] === 0
      ? pxArrayPadding[2]
      : pxArrayPadding[0] || 0
    const bodyAttributes = {
      x: 0,
      y: 0,
      width: width - paddingLeft - paddingRight,
      height: height - paddingTop - paddingBottom
    }
    
    /* Assign classes */
    const classes = [c]
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      className={classes.join(' ')}
      {...passedProps}
      ref={n => this.$wrapper = n}>
      <svg width={width} height={height} style={svgStyle}>
        <rect
          className={`${c}__bg-rect`}
          x={0}
          y={0}
          width={width}
          height={height} />
        <g
          className={`${c}__body`}
          transform={`translate(${paddingLeft} ${paddingTop})`}>
          <Viewport
            {...bodyAttributes}
            axisPadding={props.axisPadding} />
        </g>
        <g
          className={`${c}__head`}
          transform={headTransform}>
          <g className={`${c}__title`}>{
            titleLines.map((line, i) => <text
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
              x={subtitleX}
              y={(i + 1) * subtitleLineHeight}
              textAnchor={subtitleTextAnchor}>
              {line}
            </text>)
          }</g>
        </g>
        <g
          className={`${c}__foot`}
          transform={footTransform}>
          <g className={`${c}__source`}>
            {sourceLines.map((line, i) => <text
              x={sourceX}
              y={(i + 1) * sourceLineHeight}
              textAnchor={sourceTextAnchor}>
              {line}
            </text>)}
          </g>
        </g>
      </svg>
    </div>
  }
}

/* * * * * Prop types * * * * */

Graph.propTypes = {}
Graph.defaultProps = {
  headTop: 0,
  headBottom: undefined,
  titleAlign: 'start',
  titleLeft: 0,
  titleRight: undefined,
  subtitleAlign: 'start',
  subtitleLeft: 0,
  subtitleRight: undefined,
  footTop: undefined,
  footBottom: 100,
  sourceAlign: 'start',
  sourceLeft: 0,
  sourceRight: undefined,
  padding: 0,
  axisPadding: 0
}

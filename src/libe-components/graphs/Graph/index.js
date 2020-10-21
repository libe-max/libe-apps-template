import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import * as d3 from 'd3'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'
import cssUnitToPx from '../../../libe-utils/css-unit-to-px'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph wrapper, with a head (title, subtitle),
 *   a foot (source), and a body (children)
 *
 *   PROPS
 *   width, height, headTop, title, titleAlign, titleLeft, titleRight,
 *   subtitle, subtitleAlign, subtitleLeft, subtitleRight, footBottom,
 *   source, sourceAlign, sourceLeft, sourceRight, padding, className
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
      'width', 'height', 'headTop', 'title', 'titleAlign', 'titleLeft', 'titleRight',
      'subtitle', 'subtitleAlign', 'subtitleLeft', 'subtitleRight', 'footBottom',
      'source', 'sourceAlign', 'sourceLeft', 'sourceRight', 'padding', 'className'
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
    const { props, context, c, $wrapper } = this

    /* Inner logic */
    const containerWidth = $wrapper ? $wrapper.getBoundingClientRect().width : 0
    const containerHeight = $wrapper ? $wrapper.getBoundingClientRect().width : 0
 
    const propsWidth = cssUnitToPx(props.width, containerWidth, context.viewport)
    const propsHeight = cssUnitToPx(props.height, containerHeight, context.viewport)
 
    const width = propsWidth !== undefined
      ? propsWidth
      : context.current_graph_viewport && context.current_graph_viewport.width !== undefined
        ? context.current_graph_viewport.width
        : containerWidth || 0
    const height = propsHeight !== undefined
      ? propsHeight
      : context.current_graph_viewport && context.current_graph_viewport.height !== undefined
        ? context.current_graph_viewport.height
        : containerHeight || 0
    
    const titleLines = props.title.split(/<br\s?\/>/igm)
    const titleLineHeight = 2.5 * context.viewport.rem
    const titleMarginBottom = .5 * context.viewport.rem
    const titleTextAnchor = props.titleAlign
    const titleLeft = cssUnitToPx(props.titleLeft, width, context.viewport)
    const titleRight = cssUnitToPx(props.titleRight, width, context.viewport)
    const titleX = titleRight !== undefined
      ? width - titleRight
      : titleLeft || 0

    const subtitleLines = props.subtitle.split(/<br\s?\/>/igm)
    const subtitleLineHeight = 1 * context.viewport.rem
    const subtitleTextAnchor = props.subtitleAlign
    const subtitleLeft = cssUnitToPx(props.subtitleLeft, width, context.viewport)
    const subtitleRight = cssUnitToPx(props.subtitleRight, width, context.viewport)
    const subtitleX = subtitleRight !== undefined
      ? width - subtitleRight
      : subtitleLeft || 0

    const sourceLines = props.source.split(/<br\s?\/>/igm)
    const sourceLineHeight = 1 * context.viewport.rem
    const sourceTextAnchor = props.sourceAlign
    const sourceLeft = cssUnitToPx(props.sourceLeft, width, context.viewport)
    const sourceRight = cssUnitToPx(props.sourceRight, width, context.viewport)
    const sourceX = sourceRight !== undefined
      ? width - sourceRight
      : sourceLeft || 0

    const headTop = cssUnitToPx(props.headTop, height, context.viewport)
    const headY = headTop || 0
    const footBottom = cssUnitToPx(props.footBottom, height, context.viewport) || 0
    const footY = height - footBottom - (sourceLines.length) * sourceLineHeight

    const paddingArr = `${props.padding}`.split(' ').map(e => cssUnitToPx(e, width, context.viewport))
    const padding = {
      top: paddingArr[0] || 0,
      right: paddingArr[1] || paddingArr[1] === 0
        ? paddingArr[1]
        : paddingArr[0] || 0,
      bottom: paddingArr[2] || paddingArr[2] === 0
        ? paddingArr[2]
        : paddingArr[0] || 0,
      left: paddingArr[3] || paddingArr[3] === 0
        ? paddingArr[3]
        : paddingArr[1] || paddingArr[1] === 0
          ? paddingArr[1]
          : paddingArr[0] || 0
    }

    const bodyWidth = Math.max(0, width - padding.left - padding.right)
    const bodyHeight = Math.max(0, height - padding.top - padding.bottom)
    const bodyContext = {
      ...this.context,
      current_graph_viewport: {
        width: bodyWidth,
        height: bodyHeight
      }
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
      <svg width={width} height={height}>
        <rect className={`${c}__bg-rect`} width='100%' height='100%' />
        <g
          className={`${c}__body`}
          transform={`translate(${padding.left} ${padding.top})`}>
          <AppContext.Provider value={bodyContext}>
            <svg width={bodyWidth} height={bodyHeight}>
              <rect
                className={`${c}__body-bg-rect`}
                width='100%'
                height='100%'
                style={{ fill: 'crimson' }} />
              {props.children}
            </svg>
          </AppContext.Provider>
        </g>
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
      </svg>
    </div>
  }
}

/* * * * * Prop types * * * * */

Graph.propTypes = {}
Graph.defaultProps = {
  headTop: 0,
  titleAlign: 'start',
  titleLeft: 0,
  titleRight: undefined,
  subtitleAlign: 'start',
  subtitleLeft: 0,
  subtitleRight: undefined,
  footBottom: 0,
  sourceAlign: 'start',
  sourceLeft: 0,
  sourceRight: undefined,
  padding: 0
}

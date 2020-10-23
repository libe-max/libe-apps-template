import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import cssCalcToPx from '../../../libe-utils/css-calc-to-px'

/*
 *   GraphAsset component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *
 *
 *   PROPS
 *   x, y, width, height, padding, name, children
 *
 */

export default class GraphAsset extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = ''
    this.Wrapper = this.Wrapper.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * GET DIMENSIONS
   *
   * * * * * * * * * * * * * * * * */
  getDimensions () {
    const { props, context, $wrapper } = this
    const $parent = $wrapper ? $wrapper.parentElement : undefined

    const containerOutWidth = $parent ? $parent.getBoundingClientRect().width : 0
    const containerOutHeight = $parent ? $parent.getBoundingClientRect().height : 0
    const containerStyle = $parent ? $parent.style : {}
    const containerPaddingTop = parseFloat(containerStyle.paddingTop) || 0
    const containerPaddingRight = parseFloat(containerStyle.paddingRight) || 0
    const containerPaddingBottom = parseFloat(containerStyle.paddingBottom) || 0
    const containerPaddingLeft = parseFloat(containerStyle.paddingLeft) || 0
    const containerWidth = containerOutWidth - containerPaddingLeft - containerPaddingRight
    const containerHeight = containerOutHeight - containerPaddingTop - containerPaddingBottom
    const propsWidth = context.current_graph_viewport
      ? cssCalcToPx(props.width, context.current_graph_viewport.width, context.viewport)
      : cssCalcToPx(props.width, containerWidth, context.viewport)
    const propsHeight = context.current_graph_viewport
      ? cssCalcToPx(props.height, context.current_graph_viewport.height, context.viewport)
      : cssCalcToPx(props.height, containerHeight, context.viewport)
 
    const outerWidth = propsWidth !== undefined
      ? propsWidth
      : context.current_graph_viewport && context.current_graph_viewport.width !== undefined
        ? context.current_graph_viewport.width
        : containerWidth || 0
    const outerHeight = propsHeight !== undefined
      ? propsHeight
      : context.current_graph_viewport && context.current_graph_viewport.height !== undefined
        ? context.current_graph_viewport.height
        : containerHeight || 0

    const paddingArr = `${props.padding}`.split(' ')
      .map((e, i) => i % 2
        ? cssCalcToPx(e, outerWidth, context.viewport)
        : cssCalcToPx(e, outerHeight, context.viewport)
      )
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

    const width = outerWidth - padding.left - padding.right
    const height = outerHeight - padding.top - padding.bottom

    const x = context.current_graph_viewport
      ? cssCalcToPx(props.x, context.current_graph_viewport.width, context.viewport) || 0
      : cssCalcToPx(props.x, containerWidth, context.viewport) || 0
    const y = context.current_graph_viewport
      ? cssCalcToPx(props.y, context.current_graph_viewport.height, context.viewport) || 0
      : cssCalcToPx(props.y, containerHeight, context.viewport) || 0

    const returned = {
      x,
      y,
      outerWidth: Math.max(0, outerWidth),
      outerHeight: Math.max(0, outerHeight),
      width: Math.max(0, width),
      height: Math.max(0, height),
      padding
    }

    return returned
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WRAPPER
   *
   * * * * * * * * * * * * * * * * */
  Wrapper (wrapperProps) {
    const { props, context, c } = this
    
    /* Inner logic */
    const {
      x,
      y,
      outerWidth,
      outerHeight,
      width,
      height,
      padding
    } = this.getDimensions()
    const paddingLeft = padding.left
    const paddingTop = padding.top
    const childrenContext = {
      ...context,
      current_graph_viewport: { width, height }
    }

    /* Display */
    return context.current_graph_viewport
      ? <g className={`lblb-graph-asset ${wrapperProps.className}`} ref={n => this.$wrapper = n}>
        <g className='lblb-graph-asset__mar-and-pad' transform={`translate(${x + paddingLeft}, ${y + paddingTop})`}>
          <AppContext.Provider value={childrenContext}>
            {wrapperProps.children}
          </AppContext.Provider>
        </g>
      </g>
      : <div className={`lblb-graph-asset ${wrapperProps.className}`} ref={n => this.$wrapper = n}>
        <svg width={outerWidth} height={outerHeight}>
          <g className='lblb-graph-asset__mar-and-pad' transform={`translate(${x + paddingLeft}, ${y + paddingTop})`}>
            <AppContext.Provider value={childrenContext}>
              {wrapperProps.children}
            </AppContext.Provider>
          </g>
        </svg>
      </div>
  }
}

/* * * * * Prop types * * * * */

GraphAsset.propTypes = {}
GraphAsset.defaultProps = {
  x: 0,
  y: 0,
  padding: 0,
  name: Math.random().toString(36).slice(2)
}

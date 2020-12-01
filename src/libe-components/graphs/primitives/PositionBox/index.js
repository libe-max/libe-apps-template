import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import AppContext from '../../../../context'
import cssCalc from '../../../../libe-utils/css-calc-to-px'

/*
 *   PositionBox component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates positional props and renders an accordingly positioned box
 *   
 *   PROPS
 *   x, y, width, height, clip, background, children
 *
 */

class PositionBox extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.state = { clip_id: uuid() }
    this.c = 'lblb-graph-position-box'
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
    const { props, state, context, c } = this

    /* Inner logic */
    const { x: propsX, y: propsY, width: propsWidth, height: propsHeight } = props
    const { viewport, current_graph: currentGraph } = context
    const { width: contextWidth, height: contextHeight } = currentGraph
    const x = cssCalc(propsX, contextWidth, viewport) || 0
    const y = cssCalc(propsY, contextHeight, viewport) || 0
    const width = propsWidth !== undefined ? Math.max(cssCalc(propsWidth, contextWidth, viewport), 0) : contextWidth
    const height = propsHeight !== undefined ? Math.max(cssCalc(propsHeight, contextHeight, viewport), 0) : contextHeight
    const clipPath = props.clip ? `url(#${state.clip_id})` : undefined
    const childContext = {
      ...context,
      current_graph: {
        ...currentGraph,
        width: width,
        height: height
      }
    }

    /* Display */
    return <AppContext.Provider value={childContext}>
      <g
        className={c}
        transform={`translate(${x}, ${y})`}>
        {props.background && <rect width={width} height={height} style={{ fill: props.background || 'transparent' }} />}
        {props.clip && <clipPath id={state.clip_id}><rect width={width} height={height} /></clipPath>}
        {props.clip && <g clipPath={clipPath}>{props.children}</g>}
        {!props.clip && props.children}
      </g>
    </AppContext.Provider>
  }
}

export default PositionBox

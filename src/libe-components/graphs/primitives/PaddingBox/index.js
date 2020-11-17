import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import AppContext from '../../../../context'
import cssPadding from '../../../../libe-utils/css-padding-expression-to-object'

/*
 *   PaddingBox component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates padding props and renders an accordingly padded box
 *   
 *   PROPS
 *   padding, bg, clip, children
 *
 */

class PaddingBox extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.state = { clip_id: uuid() }
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
    const { viewport, current_graph: currentGraph } = context
    const { width: contextWidth, height: contextHeight } = currentGraph
    const { top, right, bottom, left } = cssPadding(props.padding, { width, height }, context.viewport)
    const width = Math.max(contextWidth - left - right, 0)
    const height = Math.max(contextHeight - top - bottom, 0)
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
      <g transform={`translate(${left}, ${top})`}>
        {props.bg && <rect width={width} height={height} fill={props.bg || 'transparent'} />}
        <clipPath id={state.clip_id}><rect width={width} height={height} /></clipPath>
        <g clipPath={clipPath}>{props.children}</g>
      </g>
    </AppContext.Provider>
  }
}

export default PaddingBox

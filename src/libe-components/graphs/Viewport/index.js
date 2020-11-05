import React, { Component } from 'react'
import asGraphAsset from '../asGraphAsset'
import AppContext from '../../../context'

/*
 *   Viewport component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphAsset HOC
 *
 *   DESCRIPTION
 *   Displays a graph viewport in which visual idioms are placed
 *
 *   CONTEXT (from asGraphAsset HOC)
 *   width, height, data, xScale, yScale, calcWidth, calcHeight, calcPadding
 *   
 *   PROPS (from asGraphAsset HOC)
 *   render, _renderer
 *
 *   OWN PROPS
 *   children, className
 *
 */

class Viewport extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-viewport'
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
    const { children, _renderer } = props

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      {children}
      {_renderer()}
    </g> 
  }
}

export default asGraphAsset(Viewport)

/* * * * * Prop types * * * * */

Viewport.propTypes = {}
Viewport.defaultProps = {}

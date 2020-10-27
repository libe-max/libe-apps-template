import React, { Component } from 'react'
import asGraphAsset from '../asGraphAsset'

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
 *   IMPERATIVE PROPS (from asGraphAsset HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, render
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

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this

    /* Inner logic */
    const { width, height, data, render, children } = props

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      <g className={`${c}__rendered`}>{render(data)}</g>
      <g className={`${c}__children`}>{children}</g>
    </g> 
  }
}

export default asGraphAsset(Viewport)

/* * * * * Prop types * * * * */

Viewport.propTypes = {}
Viewport.defaultProps = {}

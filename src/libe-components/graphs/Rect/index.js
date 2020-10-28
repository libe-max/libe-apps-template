import React, { Component } from 'react'
import asGraphAsset from '../asGraphAsset'

/*
 *   Rect component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphAsset HOC
 *
 *   DESCRIPTION
 *   Returns a svg rect element
 *
 *   IMPERATIVE PROPS (from asGraphAsset HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale, render
 *
 *   PROPS
 *   className
 *
 */

class Rect extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-rect'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Inner logic */
    const { width, height } = this.props

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <rect
      style={{ fill: 'orange' }}
      width={props.width}
      height={props.height}
      className={classes.join(' ')} />
  }
}

export default asGraphAsset(Rect)

/* * * * * Prop types * * * * */

Rect.propTypes = {}
Rect.defaultProps = {
  width: 0,
  height: 0
}

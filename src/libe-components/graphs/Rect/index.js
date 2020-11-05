import React, { Component } from 'react'
import asGraphBasicShape from '../asGraphBasicShape'
import AppContext from '../../../context'

/*
 *   Rect component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphBasicShape HOC
 *
 *   DESCRIPTION
 *   Returns a svg rect element
 *
 *   IMPERATIVE PROPS (from asGraphBasicShape HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale,
 *   render, renderer
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

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <rect {...props} className={classes.join(' ')} />
  }
}

export default asGraphBasicShape(Rect)

/* * * * * Prop types * * * * */

Rect.propTypes = {}
Rect.defaultProps = {
  width: 0,
  height: 0
}

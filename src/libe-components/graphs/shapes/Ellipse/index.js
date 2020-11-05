import React, { Component } from 'react'
import asGraphBasicShape from '../../primitives/asGraphBasicShape'

/*
 *   Ellipse component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphBasicShape HOC
 *
 *   DESCRIPTION
 *   Returns a svg ellipse element
 *
 *   IMPERATIVE PROPS (from asGraphBasicShape HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale,
 *   render, renderer
 *
 *   PROPS
 *   className
 *
 */

class Ellipse extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-ellipse'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <ellipse {...props} className={classes.join(' ')} />
  }
}

export default asGraphBasicShape(Ellipse)

/* * * * * Prop types * * * * */

Ellipse.propTypes = {}
Ellipse.defaultProps = {}

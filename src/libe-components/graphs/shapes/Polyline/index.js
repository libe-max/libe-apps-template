import React, { Component } from 'react'
import asGraphBasicShape from '../../primitives/asGraphBasicShape'

/*
 *   Polyline component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphBasicShape HOC
 *
 *   DESCRIPTION
 *   Returns a svg polyline element
 *
 *   IMPERATIVE PROPS (from asGraphBasicShape HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale,
 *   render, renderer
 *
 *   PROPS
 *   className
 *
 */

class Polyline extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-polyline'
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
    return <polyline {...props} className={classes.join(' ')} />
  }
}

export default asGraphBasicShape(Polyline)

/* * * * * Prop types * * * * */

Polyline.propTypes = {}
Polyline.defaultProps = {}

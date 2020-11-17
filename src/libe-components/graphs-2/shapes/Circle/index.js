import React, { Component } from 'react'
import asGraphBasicShape from '../../primitives/asGraphBasicShape'

/*
 *   Circle component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphBasicShape HOC
 *
 *   DESCRIPTION
 *   Returns a svg circle element
 *
 *   IMPERATIVE PROPS (from asGraphBasicShape HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale,
 *   render, renderer
 *
 *   PROPS
 *   className
 *
 */

class Circle extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-circle'
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
    return <circle {...props} className={classes.join(' ')} />
  }
}

export default asGraphBasicShape(Circle)

/* * * * * Prop types * * * * */

Circle.propTypes = {}
Circle.defaultProps = {}

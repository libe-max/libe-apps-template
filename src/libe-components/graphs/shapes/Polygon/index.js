import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Polygon component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg polygon element
 *
 *   PROPS
 *   className
 *
 */

class Polygon extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-polygon'
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
    return <polygon {...props} className={classes.join(' ')} />
  }
}

export default asShape(Polygon)

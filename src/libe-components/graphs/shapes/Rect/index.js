import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Rect component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg rect element
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

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <rect {...props} className={classes.join(' ')} />
  }
}

export default asShape(Rect)

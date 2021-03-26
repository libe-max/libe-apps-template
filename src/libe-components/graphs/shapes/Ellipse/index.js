import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Ellipse component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg ellipse element
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

export default asShape(Ellipse)

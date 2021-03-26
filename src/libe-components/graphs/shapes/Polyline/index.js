import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Polyline component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg polyline element
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

export default asShape(Polyline)

import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Line component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg line element
 *
 *   PROPS
 *   className
 *
 */

class Line extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-line'
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
    return <line {...props} className={classes.join(' ')} />
  }
}

export default asShape(Line)

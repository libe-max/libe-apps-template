import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Circle component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg circle element
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

export default asShape(Circle)

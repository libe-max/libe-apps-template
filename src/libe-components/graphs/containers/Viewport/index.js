import React, { Component } from 'react'
import asContainer from '../../primitives/asContainer'

/*
 *   Viewport component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph viewport in which visual idioms are placed
 *
 *   PROPS
 *   children, className
 *
 */

class Viewport extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-viewport'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const { children } = props

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      {children}
    </g> 
  }
}

export default asContainer(Viewport)

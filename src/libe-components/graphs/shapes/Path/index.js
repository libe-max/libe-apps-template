import React, { Component } from 'react'
import asShape from '../../primitives/asShape'

/*
 *   Path component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Returns a svg path element
 *
 *   PROPS
 *   className
 *
 */

class Path extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-path'
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
    return <path {...props} className={classes.join(' ')} />
  }
}

export default asShape(Path)

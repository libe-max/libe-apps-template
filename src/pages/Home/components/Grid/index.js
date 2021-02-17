import React, { Component } from 'react'

/*
 *   Grid component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Draws a graph grid
 *
 *   PROPS
 *   x, y, width, height, xScale, yScale, xTicks, yTicks, className
 *
 */

class Grid extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-grid'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const { x, y, className } = props
    
    /* Inner logic */

    /* Assign classes */
    const classes = [c]
    if (className) classes.push(className)

    /* Display */
    return <g
      transform={`translate(${x || 0}, ${y || 0})`}
      className={classes.join(' ')}>
      <text>grid</text>
    </g>
  }
}

export default Grid

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Graph Axis component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a d3 axis
 *
 *   PROPS
 *   x, y, width, height, className
 *
 */

export default class Axis extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-axis'
    this.usedProps = ['x', 'y', 'width', 'height', 'className']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this
    const { x, y, width, height } = props

    /* Assign classes */
    const classes = [c]

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <g
      className={classes.join(' ')}
      transform={`translate(${x}, ${y})`}
      {...passedProps}>
      <rect
        className={`${c}__bg`}
        style={{ fill: 'purple' }}
        width={width}
        height={height} />
        <text>Axis</text>
    </g>
  }
}

/* * * * * Prop types * * * * */

Axis.propTypes = {}
Axis.defaultProps = {}

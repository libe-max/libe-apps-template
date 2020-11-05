import React, { Component } from 'react'
import asGraphBasicShape from '../../primitives/asGraphBasicShape'

/*
 *   Path component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphBasicShape HOC
 *
 *   DESCRIPTION
 *   Returns a svg path element
 *
 *   IMPERATIVE PROPS (from asGraphBasicShape HOC)
 *   width, height, calcWidth, calcHeight, calcPadding, data, xScale, yScale,
 *   render, renderer
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

export default asGraphBasicShape(Path)

/* * * * * Prop types * * * * */

Path.propTypes = {}
Path.defaultProps = {}

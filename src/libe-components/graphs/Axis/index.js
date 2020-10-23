import React from 'react'
import GraphAsset from '../../primitives/GraphAsset'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import * as d3 from 'd3'

/*
 *   Graph Axis component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a d3 axis
 *
 *   PROPS
 *   top, right, bottom, left, scale, className
 *
 */

export default class Axis extends GraphAsset {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-graph-axis'
    this.draw = this.draw.bind(this)
  }

  componentDidMount () {
    this.draw()
  }

  componentDidUpdate () {
    this.draw()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  draw () {
    const { props, context, $wrapper } = this
    if (!$wrapper) return
    const { width, height } = this.getDimensions()
    const directionPosition = [props.top, props.right, props.bottom, props.left].findIndex(e => e)
    const scale = props.scale
    const axesList = [d3.axisTop, d3.axisRight, d3.axisBottom, d3.axisLeft]
    const axis = directionPosition > -1
      ? axesList[directionPosition]().scale(scale)
      : width > height
        ? axesList[2]().scale(scale)
        : axesList[3]().scale(scale)

    const selection = d3
      .select($wrapper)
      .append('g')
      .call(axis)
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c, Wrapper } = this

    /* Inner logic */
    const { width, height } = this.getDimensions()

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <Wrapper
      className={classes.join(' ')}>
      <line
        x1={0}
        y1={0}
        x2={width}
        y2={height}
        style={{ strokeWidth: '2px', stroke: 'red' }} />
      <text x={width/2} y={6 + height/2}>AAAXISSS</text>
      <g ref={n => this.$wrapper = n} />
    </Wrapper>
  }
}

/* * * * * Prop types * * * * */

Axis.propTypes = {}
Axis.defaultProps = {
  width: 0,
  height: 0
}

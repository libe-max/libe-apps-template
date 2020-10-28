import React, { Component } from 'react'
import * as d3 from 'd3'
import asGraphAsset from '../asGraphAsset'

/*
 *   Axis component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   This component is rendered through the asGraphAsset HOC
 *
 *   DESCRIPTION
 *   Displays a d3 axis
 *
 *   IMPERATIVE PROPS (from asGraphAsset HOC)
 *   width, height, calcWidth, calcHeight, data, xScale, yScale, render
 *
 *   PROPS
 *   top, right, bottom, left, scale, className
 *
 */

class Axis extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
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
   * DRAW
   *
   * * * * * * * * * * * * * * * * */
  draw () {
    const { props, c, $wrapper } = this
    if (!$wrapper) return
    const { width, height } = this.props
    const directionPosition = [props.top, props.right, props.bottom, props.left].findIndex(e => e)
    const scale = props.scale
    const axesList = [d3.axisTop, d3.axisRight, d3.axisBottom, d3.axisLeft]
    const axisGenerator = directionPosition > -1
      ? axesList[directionPosition]()
      : width > height
        ? axesList[2]()
        : axesList[3]()
    const axis = axisGenerator.scale(scale)
    console.log(c)
    console.log(scale.domain(), scale.range())
    console.log(scale.ticks())
    d3.select($wrapper)
      .call(axis)

  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Inner logic */
    const { width, height } = this.props

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <g className={classes.join(' ')}>
      {props.children}
      <text y={32}>{Math.max(width, height)}</text>
      <text y={48}>{props.top ? 'top' : props.right ? 'right' : props.bottom ? 'bottom' : props.left ? 'left' : '' }</text>
      {new Array(11).fill(null).map((e, i) => {
        return <g transform={`translate(${i * width / 10}, ${i * height / 10})`}>
          <circle r={5} style={{ fill: 'yellow' }} />
        </g>
      })}
      <g ref={n => this.$wrapper = n} />
    </g>
  }
}

export default asGraphAsset(Axis)

/* * * * * Prop types * * * * */

Axis.propTypes = {}
Axis.defaultProps = {
  width: 0,
  height: 0
}

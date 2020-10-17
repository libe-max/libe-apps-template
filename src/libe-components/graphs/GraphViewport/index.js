import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   GraphViewport component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a graph viewport in which visual idioms are placed
 *
 *   PROPS
 *   width, height, xScale, yScale, xDomain, yDomain, className
 *
 */

/* linear
 * pow
 * sqrt
 * log
 * symlog
 * radial
 * time
 * (sequential)
 * (diverging)
 * quantize
 * quantile
 * treshold
 * ordinal
 * band
 * point
 */

export default class GraphViewport extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-viewport'
    this.usedProps = ['width', 'height', 'xScale', 'yScale', 'xDomain', 'yDomain', 'className']
    this.draw = this.draw.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * */
  componentDidMount() {
    this.draw()
  }

  /* * * * * * * * * * * * * * * *
   *
   * DID UPDATE
   *
   * * * * * * * * * * * * * * * */
  componentDidUpdate() {
    this.draw()
  }

  /* * * * * * * * * * * * * * * *
   *
   * DRAW
   *
   * * * * * * * * * * * * * * * */
  draw () {
    const { props, c, $wrapper, $d3Wrapper } = this
    if (!$wrapper || !$d3Wrapper) return
    const xScaleMethodName = `scale${props.xScale.slice(0, 1).toUpperCase()}${props.xScale.slice(1)}`
    const yScaleMethodName = `scale${props.yScale.slice(0, 1).toUpperCase()}${props.yScale.slice(1)}`
    const xScaleMethod = d3[xScaleMethodName]
    const yScaleMethod = d3[yScaleMethodName]
    const xScale = xScaleMethod()
      .domain(props.xDomain)
      .range([0, props.width])
    const yScale = xScaleMethod()
      .domain(props.yDomain)
      .range([0, props.height])
    console.log(xScale('velocity'))
    console.log(yScale(23))
    $d3Wrapper.innerHTML = ''
    const svg = d3.select(`.${c}__d3-wrapper`)
      .append('svg')
      .attr('width', props.width)
      .attr('height', props.height)
      .style('background', 'red')
    // svg.selectAll('rect')
    //   .data(props.data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d, i) => i * 70)
    //   .attr('y', 0)
    //   .attr('width', 65)
    //   .attr('height', (d, i) => d)
    //   .attr('fill', 'green')
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

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div
      className={classes.join(' ')}
      {...passedProps}
      ref={n => this.$wrapper = n}>
      <div
        ref={n => this.$d3Wrapper = n}
        className={`${c}__d3-wrapper`} />
    </div>
  }
}

/* * * * * Prop types * * * * */

GraphViewport.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  xScale: PropTypes.string,
  yScale: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
}
GraphViewport.defaultProps = {
  width: 200,
  height: 150,
  xScale: 'linear',
  yScale: 'linear',
  xDomain: [],
  yDomain: []
}

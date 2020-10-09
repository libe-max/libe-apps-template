import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from "d3"
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a simple graph
 *
 *   PROPS
 *   className
 *
 */

export default class Graph extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph'
    this.usedProps = ['className']
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
   * DRAW
   *
   * * * * * * * * * * * * * * * */
  draw () {
    const { props, c } = this
    const data = [12, 5, 6, 6, 9, 10]
    const svg = d3.select(`.${c}`)
      .append('svg')
      .attr('width', 700)
      .attr('height', 300)
      .style('margin-left', 100)
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', 0)
      .attr('width', 25)
      .attr('height', (d, i) => d)
      .attr('fill', 'green')
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
      
    </div>
  }
}

/* * * * * Prop types * * * * */

Graph.propTypes = {}
Graph.defaultProps = {}

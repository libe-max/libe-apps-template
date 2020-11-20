import React, { Component } from 'react'
import asText from '../../primitives/asText'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'

/*
 *   TextLine component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   -
 *
 *   PROPS
 *   -
 *
 */

class Line extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-text-line'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Inner logic */
    const { fontSize } = props
    const style = { fontSize, ...props.style }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <text
      className={classes.join(' ')}
      style={style}>
      {props.children}
    </text>
  }
}

export default asText(Line)

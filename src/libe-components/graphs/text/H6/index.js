import React, { Component } from 'react'
import asText from '../../primitives/asText'
import Line from '../Line'

const defaultLevel = 2
const defaultLineLevel = 2

class H6 extends Component {
  constructor () {
    super()
    this.c = 'lblb-graph-heading lblb-graph-h6'
  }

  render () {
    const { props, c } = this

    /* Inner logic */
    const { fontSize } = props
    const style = { fontSize, ...props.style }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <text
      className={classes.join(' ')}
      style={style}>
      {props.children}
    </text>
  }
}

export default asText(H6, defaultLevel, defaultLineLevel)

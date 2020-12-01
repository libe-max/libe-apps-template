import React, { Component } from 'react'
import asText from '../../primitives/asText'

const defaultLevel = 7
const defaultLineLevel = 7

class H1 extends Component {
  constructor () {
    super()
    this.c = 'lblb-graph-heading lblb-graph-h1'
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

export default asText(H1, defaultLevel, defaultLineLevel)

import React, { Component } from 'react'
import Heading from '../../primitives/Heading'

/*
 *   Section title component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Section title heading element.
 *
 *   PROPS
 *   level, children, small, big, huge
 *
 */

export default class SectionTitle extends Component {
  constructor () {
    super()
    this.c = 'lblb-section-title'
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    return <div className={classes.join(' ')}>
      <Heading level={props.level || 3}>
        {props.children}
      </Heading>
    </div>
  }
}

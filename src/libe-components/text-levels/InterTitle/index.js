import React, { Component } from 'react'
import Heading from '../../primitives/Heading'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Inter title component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Inter title heading element.
 *
 *   PROPS
 *   level, children, small, big, huge
 *
 */

export default class InterTitle extends Component {
  constructor () {
    super()
    this.c = 'lblb-inter-title'
    this.usedProps = ['level', 'children', 'small', 'big', 'huge', 'className']
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div className={classes.join(' ')} {...passedProps}>
      <Heading level={props.level || 2}>
        {props.children}
      </Heading>
    </div>
  }
}

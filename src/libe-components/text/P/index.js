import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   P component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Regular <p> with level and lineLevel props
 *
 *   PROPS
 *   children, level, lineLevel, className
 *
 */

export default class P extends Component {
  constructor () {
    super()
    this.c = 'lblb-text-p'
    this.usedProps = ['children', 'level', 'lineLevel', 'className']
  }

  render () {
    const { props, c } = this

    /* Default props */
    const level = props.level !== undefined ? props.level : 1
    const lineLevel = props.lineLevel !== undefined ? props.lineLevel : level

    /* Assing classes */
    const classes = ['lblb-text', c]
    if (props.className) classes.push(props.className)
    classes.push(`lblb-text_level-${level.toString().replace('.', '-')}`)
    classes.push(`lblb-text_line-level-${lineLevel.toString().replace('.', '-')}`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <p
      className={classes.join(' ')}
      {...passedProps}>
      {props.children}
    </p>
  }
}

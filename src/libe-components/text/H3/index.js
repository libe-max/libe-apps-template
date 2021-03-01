import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   H3 component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Regular <h3> with level and heightLevel props
 *
 *   PROPS
 *   children, level, heightLevel, className
 *
 */

export default class H3 extends Component {
  constructor () {
    super()
    this.c = 'lblb-text-h3'
    this.usedProps = ['children', 'level', 'heightLevel', 'className']
  }

  render () {
    const { props, c } = this

    /* Default props */
    const level = props.level !== undefined ? props.level : 4
    const heightLevel = props.heightLevel !== undefined ? props.heightLevel : level

    /* Assing classes */
    const classes = ['lblb-text', c]
    if (props.className) classes.push(props.className)
    classes.push(`lblb-text_level-${level.toString().replace('.', '-')}`)
    classes.push(`lblb-text_height-level-${heightLevel.toString().replace('.', '-')}`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <h3
      className={classes.join(' ')}
      {...passedProps}>
      {props.children}
    </h3>
  }
}

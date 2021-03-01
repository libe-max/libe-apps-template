import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   H5 component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Regular <h5> with level and heightLevel props
 *
 *   PROPS
 *   children, level, heightLevel, className
 *
 */

export default class H5 extends Component {
  constructor () {
    super()
    this.c = 'lblb-text-h5'
    this.usedProps = ['children', 'level', 'heightLevel', 'className']
  }

  render () {
    const { props, c } = this

    /* Default props */
    const level = props.level !== undefined ? props.level : 2
    const heightLevel = props.heightLevel !== undefined ? props.heightLevel : level

    /* Assing classes */
    const classes = ['lblb-text', c]
    if (props.className) classes.push(props.className)
    classes.push(`lblb-text_level-${level.toString().replace('.', '-')}`)
    classes.push(`lblb-text_height-level-${heightLevel.toString().replace('.', '-')}`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <h5
      className={classes.join(' ')}
      {...passedProps}>
      {props.children}
    </h5>
  }
}

import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Overhead component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Text level that is placed over the page title.
 *
 *   PROPS
 *   children, small, big, huge
 *
 */

export default class Overhead extends Component {
  constructor () {
    super()
    this.c = 'lblb-overhead'
    this.usedProps = ['children', 'small', 'big', 'huge', 'className']
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
      <span>{props.children}</span>
    </div>
  }
}

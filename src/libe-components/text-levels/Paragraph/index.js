import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Paragraph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Text level that is used for regular text.
 *
 *   PROPS
 *   children, literary, small, big, huge
 *
 */

export default class Paragraph extends Component {
  constructor () {
    super()
    this.c = 'lblb-paragraph'
    this.usedProps = ['children', 'literary', 'small', 'big', 'huge', 'className']
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <p className={classes.join(' ')} {...passedProps}>
      {props.children}
    </p>
  }
}

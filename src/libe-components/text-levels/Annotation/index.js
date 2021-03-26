import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Annotation component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Text level that is used for support information to
 *   main content.
 *
 *   PROPS
 *   children, small, big, huge, literary
 *
 */

export default class Annotation extends Component {
  constructor () {
    super()
    this.c = 'lblb-annotation'
    this.usedProps = ['children', 'small', 'big', 'huge', 'literary', 'className']
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

import React, { Component } from 'react'

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
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)

    return <p className={classes.join(' ')}>
      {props.children}
    </p>
  }
}

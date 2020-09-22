import React, { Component } from 'react'

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

import React, { Component } from 'react'

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
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    return <div className={classes.join(' ')}>
      <span>{props.children}</span>
    </div>
  }
}

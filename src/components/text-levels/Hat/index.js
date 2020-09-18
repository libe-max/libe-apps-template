import React, { Component } from 'react'

/*
 *   Hat component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   First big words of the article.
 *
 *   PROPS
 *   children, small, big, huge
 *
 */

export default class Hat extends Component {
  constructor () {
    super()
    this.c = 'lblb-hat'
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    return <div className={classes.join(' ')}>
      <em>{props.children}</em>
    </div>
  }
}

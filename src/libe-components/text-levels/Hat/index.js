import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

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
      <em>{props.children}</em>
    </div>
  }
}

import React, { Component } from 'react'
import Heading from '../../primitives/Heading'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Page title component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Page title heading element.
 *
 *   PROPS
 *   level, children, small, big, huge
 *
 */

export default class PageTitle extends Component {
  constructor () {
    super()
    this.c = 'lblb-page-title'
    this.usedProps = ['level', 'children', 'small', 'big', 'huge', 'className']
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
      <Heading level={props.level || 1}>
        {props.children}
      </Heading>
    </div>
  }
}

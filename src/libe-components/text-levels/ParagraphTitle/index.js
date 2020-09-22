import React, { Component } from 'react'
import Heading from '../../primitives/Heading'

/*
 *   Paragraph title component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Paragraph title heading element. The literary variant
 *   switches to a serif font.
 *
 *   PROPS
 *   level, children, literary, small, big, huge
 *
 */

export default class ParagraphTitle extends Component {
  constructor () {
    super()
    this.c = 'lblb-paragraph-title'
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)

    return <div className={classes.join(' ')}>
      <Heading level={props.level || 4}>
        {props.children}
      </Heading>
    </div>
  }
}

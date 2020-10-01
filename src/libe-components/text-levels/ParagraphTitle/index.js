import React, { Component } from 'react'
import Heading from '../../primitives/Heading'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

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
    this.usedProps = ['level', 'children', 'literary', 'small', 'big', 'huge', 'className']
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

    return <div className={classes.join(' ')} {...passedProps}>
      <Heading level={props.level || 4}>
        {props.children}
      </Heading>
    </div>
  }
}

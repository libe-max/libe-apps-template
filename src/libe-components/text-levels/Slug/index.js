import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Slug component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Small one or two words label to place in the header
 *   part of the article, and that describes briefly the
 *   main category of the article
 *
 *   PROPS
 *   children, small, big, huge, noBg
 *
 */

export default class Slug extends Component {
  constructor () {
    super()
    this.c = 'lblb-slug'
    this.usedProps = ['children', 'small', 'big', 'huge', 'noBg', 'className']
  }

  render () {
    const { props, c } = this

    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.noBg) classes.push(`${c}_no-bg`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <span className={classes.join(' ')} {...passedProps}>
      {props.children}
    </span>
  }
}

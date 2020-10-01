import React, { Component } from 'react'
import Paragraph from '../../text-levels/Paragraph'
import LogoGlyph from '../../blocks/LogoGlyph'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Loading error component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays an error message and a link to reload the
 *   page
 *
 *   PROPS
 *   small, big, huge
 *
 */

export default class LoadingError extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-loading-error'
    this.usedProps = ['small', 'big', 'huge', 'className']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div className={classes.join(' ')} {...passedProps}>
      <Paragraph
        small={props.small}
        big={props.big}
        huge={props.huge}>{props.children
          ? props.children
          : <span>
          Une erreur de chargement est survenue,<br />
            <a href={window.location}>recharger la page ?</a><br /><br />
            <LogoGlyph />
          </span>
        }</Paragraph>
    </div>
  }
}

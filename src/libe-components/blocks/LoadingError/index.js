import React, { Component } from 'react'
import Paragraph from '../../text-levels/Paragraph'
import LogoGlyph from '../../blocks/LogoGlyph'

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
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    return <div className={classes.join(' ')}>
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

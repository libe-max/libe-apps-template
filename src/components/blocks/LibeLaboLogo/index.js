import React, { Component } from 'react'
import { statics_url as staticsUrl } from '../../../config.js'

/*
 *   Libé Labo logo component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Simple display of the Logo
 *
 *   PROPS
 *   target
 *
 */

export default class LibeLaboLogo extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-libe-labo-logo'
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

    return <div className={classes.join(' ')}>
      <a href='https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538' target={props.target}>
        <img alt='Logo de Libé Labo' width='100%' src={`${staticsUrl}/assets/libe-labo-logo.svg`} />
      </a>
    </div>
  }
}

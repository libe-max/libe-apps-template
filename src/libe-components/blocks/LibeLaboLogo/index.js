import React, { Component } from 'react'
import { statics_url as staticsUrl } from '../../../config.js'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

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
    this.usedProps = ['target', 'className']
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

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div className={classes.join(' ')} {...passedProps}>
      <a href='https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538' target={props.target}>
        <img alt='Logo de Libé Labo' width='100%' src={`${staticsUrl}/assets/libe-labo-logo.svg`} />
      </a>
    </div>
  }
}

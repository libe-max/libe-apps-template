import React, { Component } from 'react'
import { statics_url as staticsUrl } from '../../../config.js'
import Svg from '../../primitives/Svg'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Loader component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   A very simple component displaying a loading animation
 *
 *   PROPS
 *   - none -
 *
 */

export default class Loader extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-loader'
    this.usedProps = ['className']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    classes.push(`${c}_three-blinking-dots`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    const loaderIconSrc = `${staticsUrl}/assets/loader-icon_64.svg`
    return <div className={classes.join(' ')} {...passedProps}>
      <Svg src={loaderIconSrc} />
    </div>
  }
}

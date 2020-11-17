import React, { Component } from 'react'
import AppContext from '../../../../context'
import asContainer from '../../primitives/asContainer'

/*
 *   Viewport component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   -
 *
 *   PROPS
 *   -
 *
 */

class Viewport extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-viewport'
  }

  /* * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    return <text dominantBaseline='hanging'>Viewport</text>
  }
}

export default asContainer(Viewport)

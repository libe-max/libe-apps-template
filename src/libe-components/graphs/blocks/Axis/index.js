import React, { Component } from 'react'
import AppContext from '../../../../context'
import asContainer from '../../primitives/asContainer'

/*
 *   Axis component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   -
 *
 *   PROPS
 *   -
 *
 */

class Axis extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-axis'
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
    return <text dominantBaseline='hanging'>Axis</text>
  }
}

export default asContainer(Axis)

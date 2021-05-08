import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   LaRegion component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class LaRegion extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = []
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='region'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>La région</H3>
      <div className='slide__card'>
      </div>
    </div>
  }
}

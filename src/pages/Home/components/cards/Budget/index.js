import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Budget component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class Budget extends Component {
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

    const cardStyle = {
      display: 'flex',
      flexDirection: 'column'
    }

    const cardHalfStyle = {
      width: '100%',
      height: '50%',
      background: 'violet'
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='budget'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Budget</H3>
      <div className='slide__card' style={cardStyle}>
        <div style={cardHalfStyle}>bars</div>
        <div style={cardHalfStyle}>cercles</div>
      </div>
    </div>
  }
}

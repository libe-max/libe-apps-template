import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   ScoresRegionales component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class ScoresRegionales extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'score-regionales'
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
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='regionales-2021__slide-title'>{props.val}</H3>
      <div className='regionales-2021__slide-card'>CARD</div>
    </div>
  }
}

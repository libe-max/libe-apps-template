import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   LaRegion component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   mapUrl, presidentColor, presidentPhoto, presidentName,
 *   presidentLabel, presidentParty, nbSeats, seatsDistribution
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
    this.usedProps = [
      'mapUrl', 'presidentColor', 'presidentPhoto', 'presidentName',
      'presidentLabel', 'presidentParty', 'nbSeats', 'seatsDistribution'
    ]
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
      <div
        className='slide__card'
        style={{
          display: 'grid',
          padding: '1rem 0',
          gridGap: '1rem',
          gridTemplateColumns: '1fr 1fr',
          gritTemplateRows: '1fr 1fr',
          gridTemplateAreas: `"one one"
                              "two three"`
        }}>
        <div
          className='slide__card-one'
          style={{
            gridArea: 'one',
            backgroundImage: `url(${props.mapUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'var(--c-navy)'            
          }} />
        <div
          className='slide__card-two'
          style={{
            gridArea: 'two',            
            backgroundColor: 'var(--c-red)'
          }}>
            {props.presidentColor}
            {props.presidentPhoto}
            {props.presidentName}
            {props.presidentLabel}
            {props.presidentParty}
          </div>
        <div
          className='slide__card-three'
          style={{
            gridArea: 'three',
            backgroundColor: 'var(--c-lime)'
          }}>
            {props.nbSeats}
            {props.seatsDistribution?.toString()}
          </div>
      </div>
    </div>
  }
}

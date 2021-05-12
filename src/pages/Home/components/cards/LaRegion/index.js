import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
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
      'presidentLabel', 'presidentParty', 'nbSeats', 'nbSeatsLabel', 'seatsDistribution'
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

    const twoStyle = {
      gridArea: 'two',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }

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
          gridTemplateColumns: 'calc(50% - .5rem) 1rem calc(50% - .5rem)',
          gridTemplateRows: 'calc(50% - .5rem) 1rem calc(50% - .5rem)',
          gridTemplateAreas: `"one one one"
                              "gap gap gap"
                              "two gap2 three"`
        }}>
        <div
          className='slide__card-one'
          style={{
            gridArea: 'one',
            backgroundImage: `url(${props.mapUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }} />
        <div
          className='slide__card-two'
          style={twoStyle}>
          <div style={{
            width: '5rem',
            height: '5rem',
            marginBottom: '.5rem',
            borderRadius: '50%',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${props.presidentPhoto})`,
            boxShadow: `0 0 0 .25rem ${props.presidentColor}`,
          }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <P level={1} lineLevel={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 600,
              letterSpacing: '.03em' }}>
              {props.presidentLabel}
            </P>
            <P level={1} lineLevel={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 800,
              letterSpacing: '.03em' }}>
              {props.presidentName}
            </P>
            <P level={1} lineLevel={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 800,
              letterSpacing: '.03em',
              color: props.presidentColor }}>
              {props.presidentParty}
            </P>
          </div>
        </div>
        <div
          className='slide__card-three'
          style={{
            gridArea: 'three',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              height: '5rem',
              width: '100%',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${props.seatsDistribution})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain'
            }} />
            <P level={4.5} lineLevel={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 800,
              letterSpacing: '.03em',
              position: 'relative',
              top: '-1rem'
            }}>
              {props.nbSeats}
            </P>
            <P level={1} lineLevel={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 600,
              letterSpacing: '.03em',
              textAlign: 'center'
            }}>
              {props.nbSeatsLabel}
            </P>
        </div>
      </div>
    </div>
  }
}

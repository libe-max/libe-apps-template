import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import H4 from '../../../../../libe-components/text/H4'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   territoire component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class territoire extends Component {
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
      display: 'flex'
    }
    const cardHalfStyle = {
      width: '50%',
      margin: '2rem .5rem'
    }
    const titleRowStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    const graphWrapperStyle = {
      position: 'relative',
      width: '100%',
      paddingBottom: '100%'
    }
    const graphInnerWrapperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'violet'
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='territoire'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Territoire</H3>
      <div className='slide__card' style={cardStyle}>
        <div style={cardHalfStyle}>
          <div style={titleRowStyle}>
            <div>Titre</div>
            <div>Valeur</div>
          </div>
          <div style={graphWrapperStyle}>
            <div style={graphInnerWrapperStyle}>
              Graph
            </div>
          </div>
          <div>legende</div>
        </div>
        <div style={cardHalfStyle}>
          <div style={titleRowStyle}>
            <div>Titre</div>
            <div>Valeur</div>
          </div>
          <div style={graphWrapperStyle}>
            <div style={graphInnerWrapperStyle}>
              Graph
            </div>
          </div>
          <div>legende</div>
        </div>
      </div>
    </div>
  }
}

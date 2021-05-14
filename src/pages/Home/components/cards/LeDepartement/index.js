import React, { Component } from 'react'
import DataGrid from '../../blocks/DataGrid'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
import Span from '../../../../../libe-components/text/Span'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   LeDepartement component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   mapUrl, departmentFacts
 *
 */

export default class LeDepartement extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = ['mapUrl', 'departmentFacts']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const mapUrl = props.mapUrl ?? ''
    const departmentFacts = props.departmentFacts ?? []

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='departement'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Le département</H3>
      <div
        className='slide__card'
        style={{
          display: 'grid',
          padding: '1rem 0',
          gridGap: '1rem',
          gridTemplateRows: '1fr 1fr',
          gridTemplateColumns: '1fr',
          gridTemplateAreas: `"one" "two"`
        }}>
        <div
          className='slide__card-one'
          style={{
            gridArea: 'one',
            backgroundImage: `url(${mapUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }} />
        <div className='slide__card-two' style={{
          gridArea: 'two',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            {departmentFacts.map((departmentFact, i) => {
              return <span key={i}>
                <Span level={-1} style={departmentFact.line_1_style}>{departmentFact.line_1}&nbsp;</Span>
                <Span level={-1} style={departmentFact.line_2_style}>{departmentFact.line_2}&nbsp;</Span>
              </span>
            })}
          </div>
        </div>
      </div>
    </div>
  }
}

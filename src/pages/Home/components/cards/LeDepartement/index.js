import React, { Component } from 'react'
import DataGrid from '../../blocks/DataGrid'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
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
        <div className='slide__card-two' style={{ gridArea: 'two' }}>
          <DataGrid columns={2}>
            {departmentFacts.map((departmentFact, i) => {
              const pStyle = {
                textAlign: 'center',
                fontFamily: 'Libe-Sans-Semicondensed',
                fontWeight: 800,
                letterSpacing: '.03em'
              }
              return <div
                key={i}
                role='region-fact-fact'>
                <P
                  role='region-fact-data'
                  level={-.5}
                  lineLevel={-1}
                  style={{ ...pStyle, ...departmentFact.line_1_style }}>
                  {departmentFact.line_1}
                </P>
                <P
                  role='region-fact-data'
                  level={-.5}
                  lineLevel={-1}
                  style={{ ...pStyle, ...departmentFact.line_2_style }}>
                  {departmentFact.line_2}
                </P>
                <P
                  role='region-fact-data'
                  level={-.5}
                  lineLevel={-1}
                  style={{ ...pStyle, ...departmentFact.line_3_style }}>
                  {departmentFact.line_3}
                </P>
              </div>
            })}
          </DataGrid>
        </div>
      </div>
    </div>
  }
}

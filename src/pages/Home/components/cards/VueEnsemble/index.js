import React, { Component } from 'react'
import DataGrid from '../../blocks/DataGrid'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   VueEnsemble component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   mapUrl, regionFacts
 *
 */

export default class VueEnsemble extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = ['mapUrl', 'regionFacts']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const mapUrl = props.mapUrl ?? ''
    const regionFacts = props.regionFacts ?? []

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='overview'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Vue d'ensemble</H3>
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
          <DataGrid columns={3}>
            {regionFacts.map((regionFact, i) => {
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
                  level={.5}
                  lineLevel={-.5}
                  style={{ ...pStyle, ...regionFact.line_1_style }}>
                  {regionFact.line_1}
                </P>
                <P
                  role='region-fact-data'
                  level={.5}
                  lineLevel={-.5}
                  style={{ ...pStyle, ...regionFact.line_2_style }}>
                  {regionFact.line_2}
                </P>
                <P
                  role='region-fact-data'
                  level={.5}
                  lineLevel={-.5}
                  style={{ ...pStyle, ...regionFact.line_3_style }}>
                  {regionFact.line_3}
                </P>
              </div>
            })}
          </DataGrid>
        </div>
      </div>
    </div>
  }
}

import React, { Component } from 'react'
import SplitBar from '../../blocks/SplitBarOld'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
import Span from '../../../../../libe-components/text/Span'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   PrecElections component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   elections
 *
 */

export default class PrecElections extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = ['elections']
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    const elections = props.elections ?? []

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    // title
    // subtitle
    // abstention
    // votes

    /* Display */
    return <div
      id='elections'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={1.5} className='slide__title'>
        Résultats des élections<br />
        précédentes
      </H3>
      <div
        className='slide__card'
        style={{
          padding: '1.5rem 0 2rem 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>{
          elections.map((election, electionPos) => {
            return <div
              key={electionPos}
              style={{ flexShrink: 0, flexGrow: 0 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '.25rem'
              }}>
                <div>
                  <P
                    style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>
                    {election.title}
                  </P>
                  <P
                    level={-2}
                    style={{ fontFamily: 'Synthese' }}>
                    {election.subtitle}
                  </P>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Span
                    level={4}
                    style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>
                    {election.abstention}&nbsp;
                  </Span>
                  <Span
                    level={-2}
                    style={{ fontFamily: 'Synthese' }}>
                    Taux<br />d'abstention
                  </Span>
                </div>
              </div>
              <div style={{ width: '100%' }}>
                <SplitBar
                  height='3rem'
                  data={election.votes} />
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}

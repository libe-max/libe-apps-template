import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
import Span from '../../../../../libe-components/text/Span'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
import makeReadable from '../../../../../libe-utils/number-to-spaced-string'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Population component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class Population extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * INITIAL STATE
   *
   * * * * * * * * * * * * * * * */
  state = {
    toggle: false
  }

  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = [
      'regionName', 'graphLabel', 'population', 'populationUnit', 
      'maleData', 'femaleData', 'maleFranceData', 'femaleFranceData',
      'domain'
    ]
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, state, c } = this

    const cardStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr',
      gridGap: '1rem',
      padding: '1rem 0',
      gridTemplateAreas: '"one" "two"'
    }
    const cardTwoStyle = {
      gridArea: 'two',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'relative'
    }
    const cardTwoChildrenStyle = {
      flexShrink: 0,
      flexGrow: 0
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='population'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Population</H3>
      <div className='slide__card' style={cardStyle}>
        <div className='slide__card-one' style={{ gridArea: 'one' }}>
          <div style={{
            display: 'flex',
            fontFamily: 'Synthese',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Span
              level={0}
              onClick={e => this.setState({ toggle: false })}
              style={{
                opacity: state.toggle ? .6 : 1,
                fontFamily: 'Synthese',
                borderBottom: state.toggle
                  ? '.0625rem solid rgba(19, 19, 19, .3)'
                  : '.125rem solid rgba(251, 0, 6, 1)',
                cursor: 'pointer',
                marginRight: '1rem' }}>
              {props.regionName}
            </Span>
            <Span
              level={0}
              onClick={e => this.setState({ toggle: true })}
              style={{
                opacity: state.toggle ? 1 : .6,
                fontFamily: 'Synthese',
                borderBottom: state.toggle
                  ? '.125rem solid rgba(251, 0, 6, 1)'
                  : '.0625rem solid rgba(19, 19, 19, .3)',
                cursor: 'pointer' }}>
              France
            </Span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Span style={{ fontFamily: 'Libe-Sans-Semicondensed', letterSpacing: '.03rem' }}>
              {props.graphLabel}
            </Span>
            <Span>
              <Span level={2} style={{
                color: 'rgba(251, 0, 6)',
                fontWeight: 600,
                letterSpacing: '.03rem',
                fontFamily: 'Libe-Sans-Semicondensed',
                letterSpacing: '.03rem'
              }}>
                {makeReadable(props.population)}
              </Span>
              &nbsp;
              <Span level={-1} style={{
                color: '#191919',
                letterSpacing: '.03rem',
                fontFamily: 'Synthese'
              }}>
                {props.populationUnit}
              </Span>
            </Span>
          </div>
        </div>
        <div
          className='slide__card-two'
          style={cardTwoStyle}>
          <div style={{
            ...cardTwoChildrenStyle,
            width: 'calc(50% + 1rem)'
          }}>
            <BarChart>
              <Axis
                direction='bottom'
                domain={[...props.domain].reverse()}
                ticks={3}
                tickFormat={val => <Span
                  level={-1}
                  style={{ fontFamily: 'Synthese' }}>
                  {val}%
                </Span>} />
              <Axis
                direction='right'
                domain={[0, 100]}
                ticks={10}
                tickFormat={val => <Span
                  level={-1}
                  style={{
                    display: 'block',
                    width: '2rem',
                    textAlign: 'center',
                    top: '-.25rem',
                    position: 'relative',
                    fontFamily: 'Synthese',
                    fontWeight: 600
                  }}>
                  {val}
                </Span>} />
              <Bars
                orientation='vertical'
                direction='left'
                max={props.domain[1]}
                data={state.toggle ? props.maleFranceData : props.maleData}
                barsPadding='.5px'
                styles={(pos, val) => ({ background: 'rgba(193, 193, 193, 1)' })} />
            </BarChart>
          </div>
          <div style={{
            ...cardTwoChildrenStyle,
            width: 'calc(50% - 1rem)'
          }}>
            <BarChart>
              <Axis
                direction='bottom'
                domain={props.domain}
                ticks={3}
                tickFormat={val => <Span
                  level={-1}
                  style={{ fontFamily: 'Synthese' }}>
                  {val}%
                </Span>} />
              <Axis
                direction='left'
                ticks={0} />
              <Bars
                orientation='vertical'
                max={props.domain[1]}
                data={state.toggle ? props.femaleFranceData : props.femaleData}
                barsPadding='.5px'
                styles={(pos, val) => ({ background: 'rgba(251, 75, 81, 1)' })} />
            </BarChart>
          </div>
          <div style={{
            position: 'absolute',
            top: '-.5rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between' }}>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>Hommes</Span>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>Femmes</Span>
          </div>
        </div>
      </div>
    </div>
  }
}

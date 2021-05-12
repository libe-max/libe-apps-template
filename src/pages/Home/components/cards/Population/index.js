import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
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
    this.usedProps = ['regionName', 'maleData', 'femaleData', 'maleFranceData', 'femaleFranceData', 'domain']
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
      gridTemplateRows: '2rem 1fr',
      gridGap: '1rem',
      padding: '1rem 0',
      gridTemplateAreas: '"one" "two"'
    }
    const cardTwoStyle = {
      gridArea: 'two',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
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
          <button onClick={e => this.setState({ toggle: false })}>{
            state.toggle
              ? `• ${props.regionName}`
              : <strong>• {props.regionName}</strong>
          }</button>
          <button onClick={e => this.setState({ toggle: true })}>{
            state.toggle
              ? <strong>• France</strong>
              : '• France'
          }</button>
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
                  level={0}
                  style={{ fontFamily: 'Synthese' }}>
                  {val}%
                </Span>} />
              <Axis
                direction='right'
                domain={[0, 100]}
                ticks={10}
                tickFormat={val => <Span
                  level={0}
                  style={{
                    display: 'block',
                    width: '2rem',
                    textAlign: 'center',
                    top: '-.25rem',
                    position: 'relative',
                    fontFamily: 'Synthese'
                  }}>
                  {val}
                </Span>} />
              <Bars
                orientation='vertical'
                direction='left'
                max={props.domain[1]}
                data={state.toggle ? props.maleFranceData : props.maleData}
                styles={(pos, val) => ({ background: 'blue' })} />
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
                  level={0}
                  style={{ fontFamily: 'Synthese' }}>
                  {val}%
                </Span>} />
              <Bars
                orientation='vertical'
                max={props.domain[1]}
                data={state.toggle ? props.femaleFranceData : props.femaleData}
                styles={(pos, val) => ({ background: 'blue' })} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  }
}

import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Chomage component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   regionName, graphs
 *
 */

export default class Chomage extends Component {
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
      'regionName', 'graphs', 'currentUnemploymentRates', 'currentPovertyRates',
      'franceCurrentUnemploymentRate', 'franceUnemploymentRates', 'franceCurrentPovertyRate',
      'francePovertyRates'
    ]
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, state, c } = this

    /* Logic */
    const graphs = props.graphs ?? [{}, {}, {}]
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
      flexDirection: 'column',
      justifyContent: 'space-around'
    }
    const graphWrapperStyle = {
      display: 'flex',
      flexDirection: 'column',
      margin: '.5rem 0',
      height: 'calc((100% - 1.5rem) / 3)'
    }
    const lastGraphWrapperStyle = {
      ...graphWrapperStyle,
      height: 'calc(1.5rem + (100% - 1.5rem) / 3)'
    }
    const barChartWrapperStyle = {
      width: '100%',
      height: '100%'
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='chomage'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Les chiffres du chomage</H3>
      <div
        className='slide__card'
        style={cardStyle}>
        <div className='slide__card-one' style={{ gridArea: 'one' }}>
          <div style={{ display: 'flex', fontFamily: 'Synthese', justifyContent: 'center' }}>
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
                marginRight: '1rem'
              }}>{props.regionName}</Span>
            <Span
              level={0}
              onClick={e => this.setState({ toggle: true })}
              style={{
                opacity: state.toggle ? 1 : .6,
                fontFamily: 'Synthese',
                borderBottom: state.toggle
                  ? '.125rem solid rgba(251, 0, 6, 1)'
                  : '.0625rem solid rgba(19, 19, 19, .3)',
                cursor: 'pointer'
              }}>France</Span>
          </div>
        </div>
        <div
          className='slide__card-two'
          style={cardTwoStyle}>
          <div
            className='chomage-graph'
            style={graphWrapperStyle}>
            <div className='chomage-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>
                {graphs[0].label} <span style={{
                  color: 'rgba(251, 0, 6, 1)',
                  fontWeight: 600,
                  letterSpacing: '.03em' }}>{state.toggle
                  ? props.franceCurrentUnemploymentRate
                  : props.currentUnemploymentRates
                }%</span></Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[0].legend}</Span>
            </div>
            <div
              className='chomage-graph-bars-comp'
              style={barChartWrapperStyle}>
              <BarChart>
                <Axis
                  direction='right'
                  tickLabelOffset='.5rem'
                  domain={[0, 7]}
                  ticks={3} />
                <Bars
                  direction='top'
                  max={7}
                  data={graphs[0].data}  
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) {
                      style.background = `linear-gradient(
                        to bottom,
                        rgba(221, 0, 19, .8),
                        rgba(221, 0, 19, .2) .5rem,
                        rgba(221, 0, 19, .05)
                      )`
                    }
                    return style
                  }} />
              </BarChart>
            </div>
          </div>
          <div
            className='chomage-graph'
            style={lastGraphWrapperStyle}>
            <div className='chomage-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>
                {graphs[0].label} <span style={{
                  color: 'rgba(251, 0, 6, 1)',
                  fontWeight: 600,
                  letterSpacing: '.03em' }}>{state.toggle
                  ? props.franceCurrentPovertyRate
                  : props.currentPovertyRates
                }%</span></Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[0].legend}</Span>
            </div>
            <div
              className='chomage-graph-bars-comp'
              style={barChartWrapperStyle}>
              <BarChart>
                <Axis
                  direction='right'
                  tickLabelOffset='.5rem'
                  domain={[0, 7]}
                  ticks={3} />
                <Axis
                  direction='bottom'
                  scale='band'
                  domain={['one', 'two', 'three']} />
                <Bars
                  direction='top'
                  max={7}
                  data={graphs[1].data} 
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) {
                      style.background = `linear-gradient(
                        to bottom,
                        rgba(221, 0, 19, .8),
                        rgba(221, 0, 19, .2) .5rem,
                        rgba(221, 0, 19, .05)
                      )`
                    }
                    return style
                  }} />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

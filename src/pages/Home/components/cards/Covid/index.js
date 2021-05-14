import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
import JSXInterpreter from '../../../../../libe-components/logic/JSXInterpreter'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Covid component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   regionName, graphs
 *
 */

export default class Covid extends Component {
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
    this.usedProps = ['regionName', 'graphs']
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
      padding: '1rem 0',
      gridTemplateAreas: '"one" "two"'
    }
    const cardTwoStyle = {
      gridArea: 'two',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
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
      id='covid'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Les chiffres du Covid</H3>
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
            className='covid-graph'
            style={graphWrapperStyle}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[0].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[0].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={barChartWrapperStyle}>
              <BarChart>
                <Axis
                  direction='right'
                  tickLabelOffset='-2.25rem'
                  domain={graphs[0].domain}
                  ticks={3}
                  tickFormat={tick => <Span
                    level={-1}
                    style={{
                      fontFamily: 'Synthese',
                      position: 'relative',
                      top: '-8px',
                      fontWeight: 600,
                      width: '2rem',
                      display: 'block',
                      textAlign: 'right',
                      textShadow: '1px 1px 0 rgba(255, 255, 255, .7)'
                    }}>{tick}</Span>} />
                <Axis
                  direction='bottom'
                  scale='band'
                  domain={[]} />
                <Bars
                  direction='top'
                  max={graphs[0].domain[1]}
                  data={state.toggle ? graphs[0].france_data : graphs[0].data}
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
            className='covid-graph'
            style={graphWrapperStyle}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[1].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[1].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={barChartWrapperStyle}>
              <BarChart>
                <Axis
                  direction='right'
                  tickLabelOffset='-2.25rem'
                  domain={graphs[1].domain}
                  ticks={3}
                  tickFormat={tick => <Span
                    level={-1}
                    style={{
                      fontFamily: 'Synthese',
                      position: 'relative',
                      top: '-8px',
                      fontWeight: 600,
                      width: '2rem',
                      display: 'block',
                      textAlign: 'right',
                      textShadow: '1px 1px 0 rgba(255, 255, 255, .7)'
                    }}>{tick}</Span>} />
                <Axis
                  direction='bottom'
                  scale='band'
                  domain={[]} />
                <Bars
                  direction='top'
                  max={graphs[1].domain[1]}
                  data={state.toggle ? graphs[1].france_data : graphs[1].data}
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) {
                      style.background = `linear-gradient(
                        to bottom,
                        rgba(221, 0, 19, .8),
                        rgba(221, 0, 19, .3) .5rem,
                        rgba(221, 0, 19, 0)
                      )`
                    }
                    return style
                  }} />
              </BarChart>
            </div>
          </div>
          <div
            className='covid-graph'
            style={lastGraphWrapperStyle}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[2].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[2].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={barChartWrapperStyle}>
              <BarChart>
                <Axis
                  direction='right'
                  tickLabelOffset='-2.25rem'
                  domain={graphs[2].domain}
                  ticks={3}
                  tickFormat={tick => <Span
                    level={-1}
                    style={{
                      fontFamily: 'Synthese',
                      position: 'relative',
                      top: '-8px',
                      fontWeight: 600,
                      width: '2rem',
                      display: 'block',
                      textAlign: 'right',
                      textShadow: '1px 1px 0 rgba(255, 255, 255, .7)'
                    }}>{`${tick}%`}</Span>} />
                <Axis
                  direction='bottom'
                  scale='band'
                  domain={['one', 'two', 'three']}
                  tickFormat={tick => <Span
                    level={-1}
                    style={{
                      fontFamily: 'Synthese',
                    }}>{tick}</Span>} />
                <Bars
                  direction='top'
                  max={graphs[2].domain[1]}
                  data={state.toggle ? graphs[2].france_data : graphs[2].data}
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) {
                      style.background = `linear-gradient(
                        to bottom,
                        rgba(221, 0, 19, .8),
                        rgba(221, 0, 19, .3) .5rem,
                        rgba(221, 0, 19, 0)
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

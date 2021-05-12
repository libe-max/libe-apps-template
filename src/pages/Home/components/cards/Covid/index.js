import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
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
      gridGap: '1rem',
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
                  tickLabelOffset='.5rem'
                  domain={[0, 7]}
                  ticks={3} />
                <Bars
                  direction='top'
                  max={7}
                  data={graphs[0].data}                  
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) style.background = 'coral'
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
                  tickLabelOffset='.5rem'
                  domain={[0, 7]}
                  ticks={3} />
                <Bars
                  direction='top'
                  max={7}
                  data={graphs[1].data}
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) style.background = 'coral'
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
                  data={graphs[2].data}                  
                  styles={(pos, value) => {
                    const style = {}
                    if (pos.length === 2) style.background = 'coral'
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

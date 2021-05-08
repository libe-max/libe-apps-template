import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
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
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '2rem 1fr',
          gridGap: '1rem',
          padding: '1rem 0',
          gridTemplateAreas: '"one" "two"'
        }}>
        <div
          className='slide__card-one'
          style={{ gridArea: 'one', background: 'blue' }}>
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
          style={{
            gridArea: 'two',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <div
            className='covid-graph'
            style={{ margin: '.5rem 0', background: 'blue' }}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[0].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[0].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={{ width: '100%', height: '6rem', position: 'relative' }}>
              <BarChart
                width='100%'
                height='100%'
                barsPadding='.5px'
                data={graphs[0].data}
                orientation='vertical'
                styleBars={(pos, value) => {
                  if (pos.slice(0, 3).join(',') === '1,1,0') return { background: 'violet' }
                  return { background: 'yellow' }
                }} />
            </div>
          </div>
          {/*<div
            className='covid-graph'
            style={{ margin: '.5rem 0', background: 'blue' }}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[1].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[1].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={{ width: '100%', height: '4rem' }}>
              <Bars
                width='100%'
                height='100%'
                data={graphs[1].data}
                orientation='vertical' />
            </div>
          </div>
          <div
            className='covid-graph'
            style={{ margin: '.5rem 0', background: 'blue' }}>
            <div className='covid-graph-title'>
              <Span style={{ fontFamily: 'Libe-Sans-Semicondensed' }}>{graphs[2].label} </Span>
              <Span level={-2} style={{ fontFamily: 'Synthese' }}>{graphs[2].legend}</Span>
            </div>
            <div
              className='covid-graph-bars-comp'
              style={{ width: '100%', height: '4rem' }}>
              <Bars
                width='100%'
                height='100%'
                data={graphs[2].data}
                orientation='vertical'
                direction='left' />
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  }
}

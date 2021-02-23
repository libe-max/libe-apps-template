import React, { Component } from 'react' 
import moment from 'moment'
import { scaleLinear, scaleTime } from 'd3'
import perlin from 'perlin-noise'
import AppContext from '../../context'
import BarChart from '../../libe-components/graphs-2/BarChart'
import Grid from '../../libe-components/graphs-2/Grid'
import Paragraph from '../../libe-components/text-levels/Paragraph'
import fibonacci from '../../libe-utils/fibonacci'

const dataGenerator = (nbChanels, length) => {
  const noises = new Array(nbChanels)
    .fill(null)
    .map(e => perlin.generatePerlinNoise(length, 1, {
      octaveCount: 4,
      amplitude: 0.1,
      persistence: 0.2
    }))
  return new Array(length).fill(null).map((e, i) => {
    return noises.map((line, j) => line[i] * 2500000)
  })
}

const startMoment = moment('1-1-2021', 'DD-MM-YYYY')
const endMoment = moment()
const nbDays = endMoment.diff(startMoment, 'days')

const columns = new Array(nbDays)
  .fill(null)
  .map((e, i) => moment(startMoment)
    .add(i, 'days')
    .format('D MMM'))

const franceData = dataGenerator(2, nbDays)
const regionsData = new Array(18).fill(null).map(e => dataGenerator(2, nbDays))

/*
 *   Home page component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   The front page of your app.
 *
 *   PROPS
 *   -
 *
 */

class Home extends Component {
  state = {
    columns,
    data: {
      france: franceData,
      regions: regionsData
    }
  }
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-app-home-page'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext
  
  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c } = this
    const { viewport } = context
    const { rem } = viewport
    
    const width = viewport.width
    const height = 4000

    const franceWidth = viewport.width
    const franceHeight = Math.min(Math.floor(franceWidth * 9 / 16), 600)

    const nbRegions = state.data.regions.length
    const regionSlotsPerLine = Math.floor(width / (10 * rem))
    const regionSlotWidth = (width - 3 * rem) / regionSlotsPerLine
    const regionWidth = regionSlotWidth - rem
    const regionHeight = Math.floor(regionSlotWidth * 9 / 16)

    return <svg
      width={width}
      height={height}>
      
      {/* France */}
      <g className={`${c}__france`}>
        {/* Background */}
        <rect
          x={0}
          y={0}
          width={franceWidth}
          height={franceHeight}
          opacity={0} />
        {/* Grid */}
        <Grid
          x={3 * rem}
          y={rem}
          width={franceWidth - 4 * rem}
          height={franceHeight - 3 * rem}
          xScale={scaleTime().domain([
            moment(startMoment).toDate(),
            moment(startMoment).add(nbDays, 'days').toDate()
          ])}
          yScale={scaleLinear().domain([0, 6e6])}
          xTicks={new Array(nbDays).fill(null)
            .map((mmt, i) => moment(startMoment).add(i, 'days'))
            .filter(mmt => mmt.date() === 1
              && mmt.month() !== 0
              && mmt.format('YYYY-MM') !== endMoment.format('YYYY-MM'))
            .map(mmt => mmt.toDate())
          }
          yTicks={new Array(6).fill(0).map((e, i) => i * 6e6 / 6)}
          xTickFormat={date => moment(date).format('D MMM YY')}
          yTickFormat={val => `${val / 1e6}M`}
          xBottomLabelPosition={({ x, y, val, label }) => ({ x, y: y + .5 * rem })}
          yLeftLabelPosition={({ x, y, val, label }) => ({ y, x: (x - .5 * rem) })} />
        {/* Bars */}
        <BarChart
          x={3 * rem}
          y={rem}
          width={franceWidth - 4 * rem}
          height={franceHeight - 3 * rem}
          bgHoverable={true}
          cursor='pointer'
          stackBars={true}
          accumulate={false}
          min={0}
          max={6e6}
          columns={state.columns}
          data={state.data.france}
          tooltip={({ val, col, bar, chart, i }) => {
            return <foreignObject
              key={i}
              x={bar.x - ((240 - bar.width) * bar.x / chart.width)}
              y={0}
              width={240}
              height={104 + 2*rem}>
              <div style={{
                width: 240 - 2 * rem,
                margin: rem,
                background: 'white',
                padding: '.25rem',
                boxShadow: '.125rem .125rem .25rem 0 rgba(25, 25, 25, .1)'
              }}>
                <Paragraph small literary>
                  <strong>{col}</strong>
                  {val.map((v, i) => <span key={i}>
                    <br />
                    Value {i + 1} - {v.toString().slice(0, 4)}
                  </span>)}
                  <br />
                  <em>Sum: {val.reduce((a, b) => a + b, 0).toString().slice(0, 5)}</em>
                </Paragraph>
              </div>
            </foreignObject>}} />
        <line 
          x1={3 * rem}
          y1={rem + franceHeight - 3 * rem}
          x2={3 * rem + franceWidth - 4 * rem}
          y2={rem + franceHeight - 3 * rem}
          style={{ strokeWidth: 3, stroke: '#191919', strokeLinecap: 'round' }} />
      </g>
      <g
        className={`${c}__regions`}
        transform={`translate(${3 * rem}, ${franceHeight + rem})`}>{
        new Array(Math.ceil(nbRegions / regionSlotsPerLine)).fill(null).map((line, lineNb) => {
          
          const loSlotNb = lineNb * regionSlotsPerLine
          const hiSlotNb = Math.min((lineNb + 1) * regionSlotsPerLine, nbRegions)
          const nbSlots = hiSlotNb - loSlotNb
          const lineX = ((regionSlotsPerLine - nbSlots) / 2) * regionSlotWidth
          const lineY = lineNb * (regionHeight + 2 * rem)
          const lineWidth = nbSlots * regionSlotWidth - rem
          const lineHeight = regionHeight

          return <g
            key={lineNb}
            transform={`translate(${lineX}, ${lineY})`}
            className={`${c}__region-line`}>
            <rect x={0} y={0} width={lineWidth} height={lineHeight} opacity={0} />
            <Grid
              x={0}
              y={0}
              width={lineWidth}
              height={lineHeight}
              yScale={scaleLinear().domain([0, 100])}
              xTicks={0}
              yTicks={1}
              yTickFormat={val => `${val}%`}
              yLeftLabelPosition={props => ({ ...props, x: props.x - .5 * rem })} />
            {new Array(nbSlots).fill(null).map((slot, slotNb) => {
              return <g key={slotNb}>
                <Grid
                  x={(slotNb % regionSlotsPerLine) * regionSlotWidth}
                  width={regionWidth}
                  height={regionHeight}
                  xScale={scaleTime().domain([
                    moment('2021-1-1', 'YYYY-MM-DD').toDate(),
                    moment('2021-1-1', 'YYYY-MM-DD').add(nbDays, 'days').toDate()
                  ])}
                  xTicks={new Array(nbDays).fill(null)
                    .map((mmt, i) => moment('2021-1-1', 'YYYY-MM-DD').add(i, 'days'))
                    .filter(mmt => mmt.date() === 1 && mmt.month() !== 0 && mmt.format('YYYY-MM') !== moment().format('YYYY-MM'))
                    .map(mmt => mmt.toDate()
                  )}
                  yTicks={0}
                  xTickFormat={date => moment(date).format('MMM')}
                  xBottomLabelPosition={({ x, y, val, label }) => ({ x, y: y + .5 * rem })} />
                <BarChart                  
                  x={(slotNb % regionSlotsPerLine) * regionSlotWidth}
                  width={regionWidth}
                  height={regionHeight}
                  cursor='pointer'
                  bgHoverable={true}
                  min={0}
                  max={6e6}
                  columns={state.columns}
                  data={state.data.regions[slotNb + lineNb * regionSlotsPerLine]}
                  stackBars={true}
                  accumulate={false}
                  tooltip={({ val, col, bar, chart, i }) => {
                    return <foreignObject
                      x={0}
                      y={0}
                      width={chart.width}
                      height={3.5 * rem}>
                      <div style={{
                        width: chart.width - 2 * rem,
                        margin: rem,
                        background: 'white',
                        padding: '.125rem',
                        boxShadow: '.0625rem .0625rem .125rem 0 rgba(25, 25, 25, .1)',
                        textAlign: 'center'
                      }}>
                        <Paragraph small literary>
                          <strong style={{ marginRight: '.25rem' }}>{col}</strong>
                          {val.map((v, i) => <span key={i} style={{ marginRight: '.25rem' }}>
                            {Math.floor(v / 1e4)}
                          </span>)}
                        </Paragraph>
                      </div>
                    </foreignObject>
                  }} />
              </g>
            })}
            <line 
              x1={0}
              y1={lineHeight}
              x2={lineWidth}
              y2={lineHeight}
              style={{ strokeWidth: 3, stroke: '#191919', strokeLinecap: 'round' }} />
          </g>
        })

        // new Array(18).fill(null).map((e, i) => {
        //   const lineNb = Math.floor(i / regionSlotsPerLine)
        //   return <rect
        //     key={i}
        //     x={(i % regionSlotsPerLine) * regionSlotWidth}
        //     y={lineNb * (regionHeight + rem)}
        //     width={regionWidth}
        //     height={regionHeight} />
        // })
      }</g>
    </svg>
  }
}

export default Home

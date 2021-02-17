import React, { Component } from 'react' 
import moment from 'moment'
import { scaleLinear, scaleTime, timeMonth } from 'd3'
import perlin from 'perlin-noise'
import AppContext from '../../context'
import './components/style.css'
import BarChart from './components/BarChart'
import Grid from './components/Grid'
import Paragraph from '../../libe-components/text-levels/Paragraph'

const noises = [
  perlin.generatePerlinNoise(90, 1, { octaveCount: 4, amplitude: 0.1, persistence: 0.2 }),
  perlin.generatePerlinNoise(90, 1, { octaveCount: 4, amplitude: 0.1, persistence: 0.2 })
]
const columns = new Array(90).fill(null).map((e, i) => moment('1-1-2021', 'DD-MM-YYYY').add(i, 'days').format('D MMM'))
const data = new Array(90).fill(null).map((e, i) => noises.map((line, j) => line[i] * (noises.length - j) * 1/8))

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
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.state = { columns, data }
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
    const { props, context } = this
    const { data } = props
    const { viewport } = context
    const { rem } = viewport
    
    const width = viewport.width - 2 * rem
    const height = width > 63 * rem ? 600 : width > 40 * rem ? 500 : 400
    return <svg
      width={width}
      height={height}
      style={{ marginTop: '4rem', marginLeft: '1rem' }}>
      {/* Background */}
      <rect x={0} y={0} width={width} height={height} style={{ fill: 'white' }} />
      {/* Grid */}
      <Grid
        className='some-grid'
        x={rem}
        y={rem}
        width={width - 2 * rem}
        height={height - 2 * rem}
        xScale={scaleTime([new Date(2021, 0, 1), new Date(2021, 2, 31)], [0, width - 2 * rem])}
        yScale={scaleLinear([0, 20], [0, height - 2 * rem])}
        xTicks={10}
        yTicks={timeMonth.every(2)} />
      {/* Bars */}
      <BarChart
        className='some-bar-chart'
        x={rem}
        y={rem}
        width={width - 2 * rem}
        height={height - 2 * rem}
        fill={[
          'rgba(35, 6, 75, .9)',
          'rgba(104, 216, 186, .7)'
        ]}
        fillHover={[
          'rgba(35, 6, 75, 1)',
          'rgba(104, 216, 186, 1)'
        ]}
        bgFill='rgba(240, 240, 240, 0)'
        bgFillHover='rgba(240, 240, 240, .2)'
        bgHoverable={true}
        cursor='pointer'
        origin='bottom'
        stackBars={false}
        accumulate={true}
        min={0}
        max={20}
        columns={this.state.columns}
        data={this.state.data}
        tooltip={({ val, col, bar, chart, i }) => {
          return <foreignObject
            key={i}
            x={bar.x - ((240 - bar.width) * bar.x / chart.width)}
            y={Math.min(chart.height - bar.height, chart.height - 140)}
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
    </svg>
  }
}

export default Home

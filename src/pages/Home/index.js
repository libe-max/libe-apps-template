import React, { Component } from 'react' 
import moment from 'moment'
import { scaleLinear, scaleTime } from 'd3'
import perlin from 'perlin-noise'
import AppContext from '../../context'
import BarChart from '../../libe-components/graphs-2/BarChart'
import Grid from '../../libe-components/graphs-2/Grid'
import Paragraph from '../../libe-components/text-levels/Paragraph'
import fibonacci from '../../libe-utils/fibonacci'

const noises = [
  perlin.generatePerlinNoise(90, 1, { octaveCount: 4, amplitude: 0.1, persistence: 0.2 }),
  perlin.generatePerlinNoise(90, 1, { octaveCount: 4, amplitude: 0.1, persistence: 0.2 })
]
const columns = new Array(90).fill(null).map((e, i) => moment('1-1-2021', 'DD-MM-YYYY').add(i, 'days').format('D MMM'))
const data = new Array(90).fill(null).map((e, i) => {
  return noises.map((line, j) => {
    const lineFactor = (1 - (j / noises.length))
    const reductionFactor = 3000000
    return line[i] * lineFactor * reductionFactor
  })
})

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
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{ fill: 'white' }} />
      {/* Grid */}
      <Grid
        className='some-grid'
        x={3 * rem}
        y={rem}
        width={width - 4 * rem}
        height={height - 3 * rem}
        xScale={scaleTime().domain([new Date(2021, 0, 1), new Date(2021, 3, 31)])}
        yScale={scaleLinear().domain([0, 6e6])}
        xTicks={[1, 2, 3].map(e => moment('2021-1-1', 'YYYY-MM-DD').add(e, 'months').toDate())}
        yTicks={new Array(6).fill(0).map((e, i) => i * 6e6 / 6)}
        xTickFormat={date => moment(date).format('D MMM YY')}
        yTickFormat={val => `${val / 1e6}M`}
        xBottomLabelPosition={({ x, y, val, label }) => ({ x, y: y + .5 * rem })}
        yLeftLabelPosition={({ x, y, val, label }) => ({ y, x: (x - .5 * rem) })} />
      {/* Bars */}
      <BarChart
        className='some-bar-chart'
        x={3 * rem}
        y={rem}
        width={width - 4 * rem}
        height={height - 3 * rem}
        bgHoverable={true}
        cursor='pointer'
        stackBars={true}
        accumulate={false}
        min={0}
        max={6e6}
        columns={this.state.columns}
        data={this.state.data}
        tooltip={({ val, col, bar, chart, i }) => {
          return <foreignObject
            key={i}
            x={bar.x - ((240 - bar.width) * bar.x / chart.width)}
            y={rem}
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

import React, { Component } from 'react' 
import perlin from 'perlin-noise'
import AppContext from '../../context'
import './components/style.css'
import BarChart from './components/BarChart'

const noises = [
  perlin.generatePerlinNoise(90, 1, {
    octaveCount: 4,
    amplitude: 0.1,
    persistence: 0.2
  }),
  perlin.generatePerlinNoise(90, 1, {
    octaveCount: 4,
    amplitude: 0.1,
    persistence: 0.2
  }),
  perlin.generatePerlinNoise(90, 1, {
    octaveCount: 4,
    amplitude: 0.1,
    persistence: 0.2
  })
]
const data = new Array(90).fill(null).map((e, i) => {
  return noises.map(line => line[i] * 5)
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
    this.state = {
      columns: ['1 jan', '2 jan', '3 jan', '4 jan', '5 jan', '6 jan', '7 jan'],
      data: data
    }
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
    
    const width = viewport.width
    const height = 600
    return <svg width={width} height={height}>
      {/* Background */}
      <rect x={0} y={0} width={width} height={height} style={{ fill: 'white' }} />
      {/* Bars */}
      <BarChart
        className='some-bar-chart'
        x={rem}
        y={rem}
        width={width - 2 * rem}
        height={height - 2 * rem}
        fill={[
          'rgba(230, 0, 0, .4)',
          'rgba(0, 230, 0, .4)',
          'rgba(0, 0, 230, .4)'
        ]}
        fillHover={[
          '#E08888',
          '#88E088',
          '#8888E0'
        ]}
        bgFill='#FAFAFA'
        bgFillHover='#F0F0F0'
        bgHoverable={true}
        cursor='pointer'
        origin='bottom'
        stackBars={true}
        accumulate={false}
        min={0}
        max={20}
        columns={this.state.columns}
        data={this.state.data}
        tooltip={({ val, col, bar, chart, i }) => {
          return <foreignObject
            x={rem + bar.x - ((200 - bar.width + 2 * rem) * bar.x / chart.width)}
            y={1 * rem}
            width={200}
            height={150}>
            <div style={{ background: 'yellow', padding: '.5rem' }}>
              <strong>{col}:</strong> {val.join(' - ')}<br />
              Un texte de tooltip.
            </div>
          </foreignObject>}} />
    </svg>
  }
}

export default Home

import React, { Component } from 'react' 
import AppContext from '../../context'
import BarChart from './components/BarChart'

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
      <rect x={0} y={0} width={width} height={height} style={{ fill: 'red' }} />

      <BarChart
        className='some-bar-chart'
        x={rem}
        y={rem}
        width={width - 2 * rem}
        height={height - 2 * rem}
        fill='blue'
        columns={['1 jan', '2 jan', '3 jan', '4 jan', '5 jan', '6 jan', '7 jan']}
        data={[1.1, 4, 5, 2.2, 4, 4.3, 8.1]}
        min={1}
        max={10}
        origin='left'
        tooltip={(val, col, bar, chart) => <foreignObject
          x={bar.x}
          y={bar.y}
          width={200}
          height={200}>
          <div>
            <strong>{col}:</strong> {val}<br />
            Un texte de tooltip.
          </div>
        </foreignObject>} />
    </svg>
  }
}

export default Home

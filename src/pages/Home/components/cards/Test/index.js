import React, { Component } from 'react'
import moment from 'moment'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
import H3 from '../../../../../libe-components/text/H3'
import { max as numbersArrayMax } from '../../../../../libe-utils/numbers-array-utils'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Test component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class Test extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = []
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    const data = [[1, 2, 6], [2, 3, 6], [4, 1.2, 4], [1, [2, 3], 1, 3], [4]/*, 6, 3, 1, 9, 3*/]
    const dataMax = numbersArrayMax(...data) + 5
    const dataMin = 0
    const hDomain = data.map((day, i) => moment('2017-4-16', 'YYYY-MM-DD').add(i, 'days'))
    const vDomain = [dataMin, dataMax]

    /* Display */
    return <div
      id='test'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Un test</H3>
      <div
        className='slide__card'
        style={{ background: 'transparent' }}>
        <BarChart>
          <Axis
            direction='top'
            domain={hDomain}
            scale='band'
            ticks={[
              moment('2017-4-17', 'YYYY-MM-DD'),
              moment('2017-4-19', 'YYYY-MM-DD')
            ]}
            tickFormat={v => v.format('DD/MM')}
            tickLineLength='3rem'
            tickLabelOffset='2rem'
            offset='.5rem' />
          <Axis
            direction='right'
            domain={[dataMin, dataMax]}
            ticks={16}
            tickLabelOffset='.5rem'
            offset='.5rem' />
          <Axis
            direction='bottom'
            domain={hDomain}
            scale='band'
            ticks={2}
            tickLabelOffset='.5rem'
            tickFormat={v => v.format('DD/MM')}
            offset='3rem' />
          <Axis
            direction='left'
            domain={[dataMin, dataMax]}
            ticks={5}
            tickLabelOffset='.5rem'
            offset='.5rem' />
          <Bars
            direction='top'
            max={dataMax}
            data={data}
            barsPadding='.125rem'
            styles={(pos, value) => {
              const style = {}
              if (pos[0] === 1) style.opacity = '.8'
              if (pos[1] === 0) style.background = 'coral'
              else if (pos[1] === 1) style.background = 'limegreen'
              else if (pos[1] === 2) style.background = 'aliceblue'
              else style.background = 'violet'
              return style
            }} />
        </BarChart>
      </div>
    </div>
  }
}

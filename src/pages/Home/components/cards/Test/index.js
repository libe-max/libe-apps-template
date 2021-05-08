import React, { Component } from 'react'
import BarChart from '../../blocks/BarChart'
import Bars from '../../blocks/Bars'
import Axis from '../../blocks/Axis'
import H3 from '../../../../../libe-components/text/H3'
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
          <Axis direction='top' offset='1rem' />
          <Axis direction='left' offset='1rem' />
          <Bars
            direction='top'
            max={12}
            data={[[1, 2, 6], [2, 3, 6], [4, 1.2, 4]]}
            barsPadding='1rem'
            styleBars={(pos, value) => {
              const style = {}
              if (pos[0] === 1) style.opacity = '.8'
              if (pos[1] === 0) style.background = 'red'
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

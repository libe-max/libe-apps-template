import React, { Component } from 'react'
import SplitBar from '../SplitBar'
import {
  reverse as numbersArrayReverse,
  max as numbersArrayMax,
  sum as numbersArraySum
} from '../../../../../libe-utils/numbers-array-utils'
import switcher from '../../../../../libe-utils/switcher'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Bars component
 *   ------------------------------------------------------
 *
 */
const usedProps = [
  'width', 'height', 'data', 'max', 'orientation', 'direction', 'barsPadding',
  'styles', 'className', 'style'
]
export { usedProps }

export default class Bars extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-bars'
    this.usedProps = usedProps
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Logic */
    const data = props.data ?? []
    const max = props.max ?? numbersArrayMax(...data) ?? 0
    const height = props.height ?? '100%'
    const width = props.width ?? '100%'
    const orientationNb = props.orientation === 'vertical' ? 1 : 0
    const directionNb = switcher(props.direction, [
      { case: v => /^t/.test(v), return: v => 1 },
      { case: v => /^r/.test(v), return: v => 0 },
      { case: v => /^b/.test(v), return: v => 0 },
      { case: v => /^l/.test(v), return: v => 1 },
      { case: v => /^c/.test(v), return: v => 2 },
      { case: v => true, return: v => 1 - orientationNb }
    ])
    const barsPadding = props.barsPadding ?? 0
    const style = {
      height,
      width,
      maxWidth: width,
      maxHeight: height,
      minWidth: width,
      minHeight: height,
      overflow: 'hidden',
      display: 'flex',
      padding: orientationNb ? `${barsPadding} 0` : `0 ${barsPadding}`,
      flexDirection: orientationNb ? 'column' : 'row',
      alignItems: directionNb === 0
        ? 'flex-start'
        : directionNb === 1
          ? 'flex-end'
          : 'center',
      ...props.style
    }    
    const bars = data.map((datum, i) => {
      const flatValue = numbersArraySum(datum)
      const barWideness = `calc(100% / ${data.length})`
      const barLength = `calc(100% * ${flatValue} / ${max})`
      const barHeight = orientationNb ? barWideness : barLength
      const barWidth = orientationNb ? barLength : barWideness
      return <div
        key={i}
        style={{
          width: barWidth,
          height: barHeight,
          padding: orientationNb ? `${barsPadding} 0` : `0 ${barsPadding}`,
          position: 'relative'
        }}>
        <SplitBar
          key={i}
          reverse={directionNb === 1}
          orientation={orientationNb ? 'horizontal' : 'vertical'}
          styles={(pos, value) => (props.styles ? props.styles([i, ...pos], value) : {})}
          data={datum}
          height='100%'
          width= '100%' />
      </div>
    })

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      className={classes.join(' ')}
      style={style}
      {...passedProps}>
      {bars}
    </div>
  }
}

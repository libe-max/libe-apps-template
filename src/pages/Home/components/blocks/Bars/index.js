import React, { Component } from 'react'
import SplitBar from '../SplitBar'
import {
  reverse as numbersArrayReverse,
  max as numbersArrayMax,
  sum as numbersArraySum
} from '../../../../../libe-utils/numbers-array-utils'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Bars component
 *   ------------------------------------------------------
 *
 */
const usedProps = [
  'width', 'height', 'data', 'max', 'orientation', 'direction', 'barsPadding',
  'styleBars', 'className', 'style'
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
    const orientation = props.orientation === 'vertical' ? 1 : 0
    const direction = props.direction === 'top' || props.direction === 'left'
      ? 1
      : props.direction === 'right' || props.direction === 'bottom'
        ? 0
        : props.direction === 'center'
          ? 2
          : orientation === 1
            ? 0
            : 1
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
      padding: orientation ? `${barsPadding} 0` : `0 ${barsPadding}`,
      flexDirection: orientation ? 'column' : 'row',
      alignItems: direction === 0
        ? 'flex-start'
        : direction === 1
          ? 'flex-end'
          : 'center',
      ...props.style
    }    
    const bars = data.map((datum, i) => {
      const flatValue = numbersArraySum(datum)
      const barWideness = `calc(100% / ${data.length})`
      const barLength = `calc(100% * ${flatValue} / ${max})`
      const barHeight = orientation ? barWideness : barLength
      const barWidth = orientation ? barLength : barWideness
      return <div
        key={i}
        style={{
          width: barWidth,
          height: barHeight,
          padding: orientation ? `${barsPadding} 0` : `0 ${barsPadding}`,
          position: 'relative'
        }}>
        <SplitBar
          key={i}
          reverse={direction === 1}
          orientation={orientation ? 'horizontal' : 'vertical'}
          styleSplits={(pos, value) => props.styleBars([i, ...pos], value)}
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

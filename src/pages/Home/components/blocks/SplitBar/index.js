import React, { Component } from 'react'
import { max as numbersArrayMax, sum as numbersArraySum } from '../../../../../libe-utils/numbers-array-utils'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   SplitBar component
 *   ------------------------------------------------------
 *
 */

export default class SplitBar extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-split-bars'
    this.usedProps = ['height', 'width', 'orientation', 'data', 'styles', 'labels', 'reverse', 'style']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Logic */
    const orientationNb = props.orientation === 'vertical' ? 1 : 0
    const reverse = props.reverse
      ? props.reverse
      : orientationNb
        ? true
        : false

    const data = props.data ? Array.isArray(props.data) ? props.data : [props.data] : []
    const sum = numbersArraySum(props.data)

    const splits = data.map((split, i) => {
      const splitSum = numbersArraySum(split)
      const splitLength = `calc(100% * ${splitSum} / ${sum})`
      const splitWideness = '100%'
      const splitHeight = orientationNb ? splitLength : splitWideness
      const splitWidth = orientationNb ? splitWideness : splitLength

      const splitStyle = props.styles ? props.styles([i], split) : {}
      const splitLabel = props.labels ? props.labels([i], split) : undefined

      return <div
        key={i}
        className={`${c}__split`}
        style={{
          width: splitWidth,
          height: splitHeight,
          flexShrink: 0,
          flexGrow: 0,
          position: 'relative',
        }}>
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          ...splitStyle
        }}>
          {splitLabel}
        </span>
        {Array.isArray(split) && <SplitBar
          key={i}
          width={splitWidth}
          height={splitHeight}
          labels={(pos, value) => (props.labels ? props.labels([i, ...pos], value) : undefined)}
          styles={(pos, value) => (props.styles ? props.styles([i, ...pos], value) : {})}
          orientation={orientationNb ? 'vertical' : 'horizontal'}
          data={split} />}
      </div>
    })

    const style = {
      height: props.height ?? '100%',
      width: props.width ?? '100%',
      flexShrink: 0,
      flexGrow: 0,
      display: 'flex',
      flexDirection: orientationNb && reverse
        ? 'column-reverse'
        : orientationNb
          ? 'column'
          : reverse
            ? 'row-reverse'
            : 'row',
      ...props.style
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div
      style={style}
      className={classes.join(' ')}
      {...passedProps}>
      {splits}
    </div>
  }
}

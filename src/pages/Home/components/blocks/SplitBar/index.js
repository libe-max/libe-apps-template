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
    this.usedProps = ['height', 'width', 'orientation', 'data', 'styleSplits', 'reverse', 'style']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Logic */
    const orientation = props.orientation === 'vertical' ? 1 : 0
    const reverse = props.reverse
      ? props.reverse
      : orientation
        ? true
        : false
    const style = {
      height: props.height ?? '100%',
      width: props.width ?? '100%',
      flexShrink: 0,
      flexGrow: 0,
      display: 'flex',
      flexDirection: orientation && reverse
        ? 'column-reverse'
        : orientation
          ? 'column'
          : reverse
            ? 'row-reverse'
            : 'row',
      ...props.style
    }

    const data = props.data ? Array.isArray(props.data) ? props.data : [props.data] : []
    const sum = numbersArraySum(props.data)

    const splits = data.map((subData, i) => {
      const subDataSum = numbersArraySum(subData)
      const subSplitBarLength = `calc(100% * ${subDataSum} / ${sum})`
      const subSplitBarWideness = '100%'
      const subSplitBarHeight = orientation ? subSplitBarLength : subSplitBarWideness
      const subSplitBarWidth = orientation ? subSplitBarWideness : subSplitBarLength
      const subSplitBarStyle = props.styleSplits([i], subData)

      if (Array.isArray(subData)) return <SplitBar
        key={i}
        width={subSplitBarWidth}
        height={subSplitBarHeight}
        styleSplits={(pos, value) => props.styleSplits([i, ...pos], value)}
        orientation={orientation ? 'vertical' : 'horizontal'}
        data={subData} />

      return <div
        key={i}
        className={`${c}__split`}
        style={{
          width: subSplitBarWidth,
          height: subSplitBarHeight,
          flexShrink: 0,
          flexGrow: 0,
          position: 'relative',
          ...subSplitBarStyle
        }}>
        <span style={{ position: 'absolute' }}>
          &nbsp;
        </span>
      </div>
    })

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

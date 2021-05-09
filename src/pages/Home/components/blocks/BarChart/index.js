import React, { Component } from 'react'
import Bars from '../Bars'
import Axis from '../Axis'
import switcher from '../../../../../libe-utils/switcher'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   BarChart component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class BarChart extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-bar-chart'
    this.usedProps = ['className', 'style']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Logic */
    const height = props.height ?? '100%'
    const width = props.width ?? '100%'
    const style = {
      width,
      height,
      display: 'grid',
      gridTemplateRows: 'min-content 1fr min-content',
      gridTemplateColumns: 'min-content 1fr min-content',
      gridTemplateRows: 'min-content 1fr min-content',
      gridTemplateColumns: 'min-content 1fr min-content',
      ...props.style
    }

    const children = {
      bars: [],
      tAxis: null,
      rAxis: null,
      bAxis: null,
      lAxis: null
    }

    React.Children.forEach(props.children, (child, i) => {
      if (!React.isValidElement(child)) return
      const childStyle = child.props.style ?? {}
      if (child.type === Bars) return children.bars.push(React.cloneElement(child, {
        key: i,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          ...childStyle
        }
      }))
      if (child.type === Axis) {
        const gridArea = switcher(child.props.direction, [
          { case: v => /^t/.test(v), return: v => 'tAxis' },
          { case: v => /^r/.test(v), return: v => 'rAxis' },
          { case: v => /^b/.test(v), return: v => 'bAxis' },
          { case: v => /^l/.test(v), return: v => 'lAxis' },
          { case: v => true, return: v => 'bAxis' }
        ])
        if (gridArea) {
          children[gridArea] = child
        }
      }
    })

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)
    return <div
      className={classes.join(' ')}
      style={style}
      {...passedProps}>
      <div style={{ gridRow: 2, gridColumn: 2, position: 'relative' }}>
        {children.bars}
      </div>
      <div style={{ gridRow: 1, gridColumn: 2 }}>{children.tAxis}</div>
      <div style={{ gridRow: 2, gridColumn: 3 }}>{children.rAxis}</div>
      <div style={{ gridRow: 3, gridColumn: 2 }}>{children.bAxis}</div>
      <div style={{ gridRow: 2, gridColumn: 1 }}>{children.lAxis}</div>
    </div>
  }
}

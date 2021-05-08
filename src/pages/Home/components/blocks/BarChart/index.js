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
          { case: v => /^t/.test(v), return: 'tAxis' },
          { case: v => /^r/.test(v), return: 'rAxis' },
          { case: v => /^b/.test(v), return: 'bAxis' },
          { case: v => /^l/.test(v), return: 'lAxis' },
          { case: v => true, return: 'bAxis' }
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
      <div style={{ gridRow: 1, gridColumn: 2 }}>{children.tAxis}</div>
      <div style={{ gridRow: 2, gridColumn: 3 }}>{children.rAxis}</div>
      <div style={{ gridRow: 3, gridColumn: 2 }}>{children.bAxis}</div>
      <div style={{ gridRow: 2, gridColumn: 1 }}>{children.lAxis}</div>
      <div style={{ gridRow: 2, gridColumn: 2, position: 'relative' }}>
        {children.bars}
      </div>
    </div>

    // return <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    //   <div style={{ width: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', textAlign: 'center' }}>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>top left</div>
    //     <div style={{ flexGrow: 1, textAlign: 'center', background: 'coral' }}>top</div>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>top right</div>
    //   </div>
    //   <div style={{ width: '100%', display: 'flex', flexGrow: 1, flexShrink: 0 }}>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>left</div>
    //     <div style={{ flexGrow: 1, textAlign: 'center', background: 'white' }}>
    //       <Bars {...this.props} />
    //     </div>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>right</div>
    //   </div>
    //   <div style={{ width: '100%', flexGrow: 0, flexShrink: 0, display: 'flex', textAlign: 'center' }}>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>bottom left</div>
    //     <div style={{ flexGrow: 1, textAlign: 'center', background: 'coral' }}>bottom</div>
    //     <div style={{ flexGrow: 0, flexShrink: 0, textAlign: 'center', background: 'violet' }}>bottom right</div>
    //   </div>
    // </div>
  }
}

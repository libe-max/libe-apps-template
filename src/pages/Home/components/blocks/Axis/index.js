import React, { Component } from 'react'
import { scaleLinear, scaleBand, scaleTime } from 'd3'
import switcher from '../../../../../libe-utils/switcher'

const c = 'lblb-axis'
const usedProps = ['width', 'height', 'direction', 'className', 'style', 'offset', 'domain']

const Axis = (props) => {
  /* Logic */
  const direction = switcher(props.direction, [
    { case: v => /^t/i.test(v), return: v => 1 },
    { case: v => /^r/i.test(v), return: v => 0 },
    { case: v => /^b/i.test(v), return: v => 0 },
    { case: v => /^l/i.test(v), return: v => 1 },
    { case: v => true, return: v => 0 }
  ])
  const orientation = switcher(props.direction, [
    { case: v => /^t/i.test(v), return: v => 0 },
    { case: v => /^r/i.test(v), return: v => 1 },
    { case: v => /^b/i.test(v), return: v => 0 },
    { case: v => /^l/i.test(v), return: v => 1 },
    { case: v => true, return: v => 0 }
  ])
  const width = props.width ?? '100%'
  const height = props.height ?? '100%'
  const offset = props.offset ?? 0

  /* Scale and Ticks */
  const domain = switcher(props.domain, [
    { case: v => props.domain !== undefined, return: v => (orientation ? [...props.domain].reverse() : props.domain) },
    { case: v => true, return: v => ([0, 100]) }
  ])
  const scaleType = switcher(props.scale, [
    { case: v => /^lin/i.test(v), return: v => scaleLinear },
    { case: v => /^ban/i.test(v), return: v => scaleBand },
    { case: v => /^tim/i.test(v), return: v => scaleTime },
    { case: v => true, return: v => scaleLinear }
  ])
  const scale = scaleType(domain, [0, 100])
  const ticks = scale.ticks ? scale.ticks(props.ticks) : scale.domain()
  const ticksFormatter = switcher(props.tickFormat, [
    { case: v => Array.isArray(v) && scale.tickFormat, return: v => scale.tickFormat(...props.tickFormat) },
    { case: v => typeof v === 'function', return: v => v },
    { case: v => true, return: v => (val => val) }
  ])
  const ticksStyle = {
    position: 'relative',
    background: 'skyblue',
    display: 'flex',
    flexDirection: orientation ? 'column' : 'row'
  }

  const ticksComponent = <div
    className={`${c}__ticks`}
    style={ticksStyle}>
    {ticks.map((tick, i, _ticks) => {
      const tickLabel = ticksFormatter(tick)
      const tickAbsPos = scaleType === scaleBand ? (scale(tick) + scale.bandwidth() / 2) : scale(tick)
      const precTick = i ? _ticks[i - 1] : scale.domain()[0]
      const precTickAbsPos = scaleType === scaleBand ? (scale(precTick) + scale.bandwidth() / 2) : scale(precTick)
      const tickPosition = tickAbsPos - precTickAbsPos
      const tickStyle = {
        background: 'coral',
        height: orientation ? 0 : undefined,
        flexShrink: 0,
        flexGrow: 0,
        lineHeight: orientation ? 0 : undefined,
        display: orientation ? 'block' : 'inline-block',
        position: orientation ? 'relative' : 'absolute',
        top: orientation ? `${tickAbsPos}%` : undefined,
        left: orientation ? undefined : `${tickAbsPos}%`,
        background: 'transparent',
        textAlign: orientation && direction ? 'right' : 'left',
        transform: orientation ? undefined : 'translate(-50%, 0)',
        fontSize: 20
      }

      if (orientation) return <div
        key={i}
        style={tickStyle}>
        {tickLabel}
      </div>

      else return <div key={i} style={{ display: 'inline-block' }}>
        <div style={tickStyle}>
          {tickLabel}
        </div>
        <div style={{ ...tickStyle, position: 'relative', visibility: 'hidden' }}>
          {tickLabel}
        </div>
      </div>
    })}
  </div>


  /* Styles */
  const style = {
    width,
    height,
    display: 'flex',
    flexDirection: switcher([orientation, direction], [
      { case: ([o, d]) => !o && !d, return: v => 'column-reverse' },
      { case: ([o, d]) => !o && d, return: v => 'column' },
      { case: ([o, d]) => o && !d, return: v => 'row-reverse' },
      { case: ([o, d]) => !o && !d, return: v => 'row' },
    ]),
    justifyContent: switcher(orientation, [
      { case: 0, return: v => 'flex-end' },
      { case: 1, return: v => 'flex-end' }
    ]),
    ...props.style
  }

  const labelsStyle = {}

  const lineStyle = {
    width: orientation ? '1px' : '100%',
    height: orientation ? '100%' : '1px',
    background: 'black'
  }
  const offsetStyle = {
    width: orientation ? offset : '100%',
    height: orientation ? '100%' : offset
  }


  /* Assign classes */
  const classes = [c]
  if (props.className) classes.push(props.className)
  
  /* Display */
  return <div className={classes.join(' ')} style={style}>
    {ticksComponent}
    <div className={`${c}__line`} style={lineStyle} />
    <div className={`${c}__offset`} style={offsetStyle} />
  </div>
}

export default Axis

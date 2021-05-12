import React, { Component } from 'react'
import { scaleLinear, scaleBand, scaleTime } from 'd3'
import switcher from '../../../../../libe-utils/switcher'
import Tick from '../Tick'

const c = 'lblb-axis'
const usedProps = [
  'width', 'height', 'offset', 'direction',
  'domain', 'scale', 'ticks', 'tickFormat', 'tickLineLength', 'tickLabelOffset',
  'style', 'className'
]

const Axis = props => {
  /* Logic */
  const width = props.width ?? '100%'
  const height = props.height ?? '100%'
  const offset = props.offset ?? 0
  const directionNb = switcher(props.direction, [
    { case: v => /^t/i.test(v), return: v => 1 },
    { case: v => /^r/i.test(v), return: v => 0 },
    { case: v => /^b/i.test(v), return: v => 0 },
    { case: v => /^l/i.test(v), return: v => 1 },
    { case: v => true, return: v => 0 }
  ])
  const orientationNb = switcher(props.direction, [
    { case: v => /^t/i.test(v), return: v => 0 },
    { case: v => /^r/i.test(v), return: v => 1 },
    { case: v => /^b/i.test(v), return: v => 0 },
    { case: v => /^l/i.test(v), return: v => 1 },
    { case: v => true, return: v => 0 }
  ])

  /* Scale and Ticks */
  const domain = switcher(props.domain, [
    { case: v => props.domain !== undefined, return: v => (orientationNb ? [...props.domain].reverse() : props.domain) },
    { case: v => true, return: v => ([0, 100]) }
  ])
  const scaleType = switcher(props.scale, [
    { case: v => /^lin/i.test(v), return: v => scaleLinear },
    { case: v => /^ban/i.test(v), return: v => scaleBand },
    { case: v => /^tim/i.test(v), return: v => scaleTime },
    { case: v => true, return: v => scaleLinear }
  ])
  const scale = scaleType(domain, [0, 100])
  const ticksValues = switcher(props.ticks, [
    { case: v => Array.isArray(v), return: v => v },
    { case: v => scale.ticks, return: v => scale.ticks(props.ticks) },
    { case: v => true, return: v => scale.domain() }
  ])
  const ticksFormatter = switcher(props.tickFormat, [
    { case: v => Array.isArray(v) && scale.tickFormat, return: v => scale.tickFormat(...props.tickFormat) },
    { case: v => typeof v === 'function', return: v => v },
    { case: v => true, return: v => (val => val) }
  ])
  const ticksStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: orientationNb ? 'column' : 'row',
  }

  /* Styles */
  const style = {
    width,
    height,
    display: 'flex',
    flexDirection: switcher([orientationNb, directionNb], [
      { case: ([o, d]) => !o && !d, return: v => 'column-reverse' },
      { case: ([o, d]) => !o && d, return: v => 'column' },
      { case: ([o, d]) => o && !d, return: v => 'row-reverse' },
      { case: ([o, d]) => !o && !d, return: v => 'row' },
    ]),
    justifyContent: switcher(orientationNb, [
      { case: 0, return: v => 'flex-end' },
      { case: 1, return: v => 'flex-end' }
    ]),
    ...props.style
  }

  const lineStyle = {
    width: orientationNb ? '1px' : '100%',
    height: orientationNb ? '100%' : '1px',
    background: 'black'
  }
  const offsetStyle = {
    width: orientationNb ? offset : '100%',
    height: orientationNb ? '100%' : offset
  }

  /* Assign classes */
  const classes = [c]
  if (props.className) classes.push(props.className)
  
  /* Display */
  return <div className={classes.join(' ')} style={style}>
    <div className={`${c}__ticks`} style={ticksStyle}>
      {ticksValues.map((tick, i) => {
        const tickAbsPos = switcher(scaleType, [
          { case: v => v === scaleBand, return: v => (scale(tick) + scale.bandwidth() / 2) },
          { case: v => true, return: v => scale(tick) }
        ])
        const tickStyle = {
          top: orientationNb ? `${tickAbsPos}%` : undefined,
          left: orientationNb ? undefined : `${tickAbsPos}%`,
          right: orientationNb && directionNb ? 0 : undefined
        }
        return <Tick
          key={i}
          value={ticksFormatter(tick)}
          domain={props.domain}
          scale={props.scale}
          direction={props.direction}
          lineLength={props.tickLineLength}
          labelOffset={props.tickLabelOffset}
          style={tickStyle} />
      })}
    </div>
    <div className={`${c}__line`} style={lineStyle} />
    <div className={`${c}__offset`} style={offsetStyle} />
  </div>
}

export default Axis

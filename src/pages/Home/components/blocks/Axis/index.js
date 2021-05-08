import React, { Component } from 'react'
import switcher from '../../../../../libe-utils/switcher'

const c = 'lblb-axis'
const usedProps = ['width', 'height', 'direction', 'className', 'style', 'offset']

const Axis = (props) => {
  /* Logic */
  const direction = switcher(props.direction, [
    { case: v => /^t/.test(v), return: 1 },
    { case: v => /^r/.test(v), return: 0 },
    { case: v => /^b/.test(v), return: 0 },
    { case: v => /^l/.test(v), return: 1 },
    { case: v => true, return: 0 }
  ])
  const orientation = switcher(props.direction, [
    { case: v => /^t/.test(v), return: 0 },
    { case: v => /^r/.test(v), return: 1 },
    { case: v => /^b/.test(v), return: 0 },
    { case: v => /^l/.test(v), return: 1 },
    { case: v => true, return: 0 }
  ])
  const width = props.width ?? '100%'
  const height = props.height ?? '100%'
  const style = {
    width,
    height,
    background: 'yellow',
    display: 'flex',
    flexDirection: switcher([orientation, direction], [
      { case: ([o, d]) => !o && !d, return: 'column-reverse' },
      { case: ([o, d]) => !o && d, return: 'column' },
      { case: ([o, d]) => o && !d, return: 'row-reverse' },
      { case: ([o, d]) => !o && !d, return: 'row' },
    ]),
    justifyContent: switcher(orientation, [
      { case: 0, return: 'flex-end' },
      { case: 1, return: 'flex-end' }
    ]),
    ...props.style
  }
  const lineStyle = {
    width: orientation ? '1px' : '100%',
    height: orientation ? '100%' : '1px',
    background: 'black'
  }
  const offsetStyle = {
    width: orientation ? props.offset : '100%',
    height: orientation ? '100%' : props.offset
  }
  const ticksStyle = {}
  const labelsStyle = {}

  console.log(lineStyle)

  /* Assign classes */
  const classes = [c]
  if (props.className) classes.push(props.className)
  
  /* Display */
  return <div
    className={classes.join(' ')}
    style={style}>
    <div className={`${c}__labels`} style={labelsStyle}>labels</div>
    <div className={`${c}__ticks`} style={ticksStyle}>ticks</div>
    <div className={`${c}__line`} style={lineStyle} />
    <div className={`${c}__offset`} style={offsetStyle} />
  </div>
}

export default Axis

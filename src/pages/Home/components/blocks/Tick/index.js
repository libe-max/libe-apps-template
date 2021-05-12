import React, { Component } from 'react'
import { scaleLinear, scaleBand, scaleTime } from 'd3'
import switcher from '../../../../../libe-utils/switcher'

const c = 'lblb-tick'
const usedProps = [
  'value', 'domain', 'scale', 'direction',
  'lineLength', 'labelOffset', 'style', 'className']

const Tick = props => {
  /* Logic */
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
  const tickSlotStyle = {
    width: orientationNb ? undefined : 0,
    height: orientationNb ? 0 : undefined,
    flexShrink: 0,
    flexGrow: 0,
    ...props.style
  }
  const tickSlotRelStyle = { ...tickSlotStyle, visibility: 'hidden' }
  const tickSlotAbsStyle = { ...tickSlotStyle, position: 'absolute' }
  const tickSlotRelInnerStyle = {
    width: orientationNb ? undefined : 'fit-content',
    textAlign: switcher([orientationNb, directionNb], [
      { case: v => v[0] === 0, return: v => 'center' },
      { case: v => v[1] === 0, return: v => 'left' },
      { case: v => true, return: v => 'right' }
    ]),
    display: 'flex',
    flexDirection: switcher([orientationNb, directionNb], [
      { case: v => v.join() === '1,1', return: v => 'row-reverse' },
      { case: v => v.join() === '1,0', return: v => 'row' },
      { case: v => v.join() === '0,1', return: v => 'column-reverse' },
      { case: v => true, return: v => 'column' }
    ]),
    alignItems: 'center'
  }
  const tickSlotAbsInnerStyle = {
    width: orientationNb ? undefined : 'fit-content',
    textAlign: switcher([orientationNb, directionNb], [
      { case: v => v[0] === 0, return: v => 'center' },
      { case: v => v[1] === 0, return: v => 'left' },
      { case: v => true, return: v => 'right' }
    ])
  }
  const tickSlotAbsInnerInnerStyle = {
    display: 'flex',
    transform: orientationNb ? 'translate(0%, -50%)' : 'translate(-50%, 0%)',
    flexDirection: switcher([orientationNb, directionNb], [
      { case: v => v.join() === '1,1', return: v => 'row-reverse' },
      { case: v => v.join() === '1,0', return: v => 'row' },
      { case: v => v.join() === '0,1', return: v => 'column-reverse' },
      { case: v => true, return: v => 'column' }
    ]),
    alignItems: 'center'
  }

  /* Display */
  return <>
    <div
      className='tick-slot-rel'
      style={tickSlotRelStyle}>
      <div className='tick-slot-rel__inner' style={tickSlotRelInnerStyle}>
        <div style={{
          width: orientationNb ? props.lineLength : 1,
          height: orientationNb ? 1 : props.lineLength,
          overflow: 'hidden'
        }} />
        <div style={{
          ...switcher([orientationNb, directionNb].join(), [
            { case: v => v === '0,0', return: v => ({ marginTop: props.labelOffset }) },
            { case: v => v === '0,1', return: v => ({ marginBottom: props.labelOffset }) },
            { case: v => v === '1,0', return: v => ({ marginLeft: props.labelOffset }) },
            { case: v => true, return: v => ({ marginRight: props.labelOffset }) }
          ])
        }}>{props.value}</div>
      </div>
    </div>
    <div
      className='tick-slot-abs'
      style={tickSlotAbsStyle}>
      <div className='tick-slot-abs__inner' style={tickSlotAbsInnerStyle}>
        <div style={tickSlotAbsInnerInnerStyle}>
          <div style={{
            background: 'black',
            width: orientationNb ? props.lineLength : 1,
            height: orientationNb ? 1 : props.lineLength
          }} />
          <div style={{
            ...switcher([orientationNb, directionNb].join(), [
              { case: v => v === '0,0', return: v => ({ marginTop: props.labelOffset }) },
              { case: v => v === '0,1', return: v => ({ marginBottom: props.labelOffset }) },
              { case: v => v === '1,0', return: v => ({ marginLeft: props.labelOffset }) },
              { case: v => true, return: v => ({ marginRight: props.labelOffset }) }
            ])
          }}>{props.value}</div>
        </div>
      </div>
    </div>
  </>
}

export default Tick

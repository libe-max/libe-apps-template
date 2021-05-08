import React, { Component } from 'react'
import chroma from 'chroma-js'
import P from '../../../../../libe-components/text/P'
import Span from '../../../../../libe-components/text/Span'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'
import AppContext from '../../../../../context'

/*
 *   SplitBar component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   height, data
 *
 */

export default class SplitBar extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-split-bar'
    this.usedProps = ['height', 'data']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this
    const { viewport } = context

    /* Logic */
    const height = props.height ?? '2rem'
    const data = props.data ?? []
    const totalValue = props.data.reduce((acc, curr, i) => acc + (parseFloat(curr.value) || 0), 0)

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      className={classes.join(' ')}
      {...passedProps}
      style={{
        height: height,
        background: '#FAFAFA',
        display: 'flex',
        alignItems: 'center'
      }}>
      {data.map((datum, datumPos) => {
        const splitWidth = `${100 * datum.value / totalValue}%`
        const totalValueBehind = data
          .slice(0, datumPos)
          .reduce((acc, curr, i) => acc + (parseFloat(curr.value) || 0), 0)
        const labelTransform = `translate(${-100 * totalValueBehind / totalValue}%, 0)`
        const color = datum.color
        const whiteContrast = chroma.contrast('#FAFAFA', color)
        const blackContrast = chroma.contrast('#191919', color)
        {/*const contrastColor = blackContrast > whiteContrast ? '#191919' : '#FAFAFA'*/}
        return <div
          key={datumPos}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            flexGrow: 0,
            height: '100%',
            width: splitWidth,
            background: datum.color
          }}>
          <div style={{
            display: 'block',
            textAlign: 'center',
            labelTransform: labelTransform
          }}>
            {datum.label}
          </div>
        </div>
      })}
    </div>
  }
}

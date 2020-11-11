import React, { Component } from 'react'
import AppContext from '../../../../context'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'

/*
 *   TextLine component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   No HOC for Text components
 *
 *   DESCRIPTION
 *   Displays a single line text component 
 *
 *   CONTEXT (from asGraphAsset HOC)
 *   width, height, data, xScale, yScale, calcWidth, calcHeight, calcPadding
 *   
 *   PROPS (from HOC)
 *   None (no HOC)
 *
 *   OWN PROPS
 *   x, y, children, level, lineLevel, family, weight, spacing, align, style, className
 *
 */

class Line extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-svg-text-line'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this

    /* Inner logic */
    const level = props.level !== undefined ? props.level : 1
    const lineLevel = props.lineLevel !== undefined ? props.lineLevel : level
    const { fontSize, lineHeight } = computeTextLevels(level, lineLevel, context.viewport)
    const y = (props.y || 0) + (lineHeight - Math.min(1.15 * fontSize, lineHeight)) * .6
    const style = {
      fontSize,
      fontFamily: props.family,
      fontWeight: props.weight,
      letterSpacing: props.spacing,
      textAlign: props.align, // [WIP] do some conversion to text-anchor here
      ...props.style
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <tspan
      x={0}
      y={y}
      style={style}
      dominantBaseline='hanging'
      ref={n => this.$node = n}
      className={classes.join(' ')}>
      <tspan>{props.children}</tspan>
    </tspan>
  }
}

export default Line

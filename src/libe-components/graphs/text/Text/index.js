import React, { Component } from 'react'
import AppContext from '../../../../context'
import TextLine from '../Line'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'

/*
 *   Text component
 *   ------------------------------------------------------
 *
 *   NOTICE
 *   No HOC for Text components
 *
 *   DESCRIPTION
 *   Displays a multiline text element
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

class Text extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-svg-text'
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

    /*
     * style
     * align, alignLast, transform, kerning
     *
     */

    const linesArr = []
    React.Children.forEach(props.children, (child, i) => {
      const lastLine = linesArr[linesArr.length - 1]
      if (child.type
        && typeof child.type === 'function'
        && new child.type().c === 'lblb-svg-text-line') {
        linesArr.push(child)
      } else {
        if (Array.isArray(lastLine)) lastLine.push(child)
        else linesArr.push([child])
      }
    })

    let currentOffsetTop = 0
    const lines = linesArr.map((line, i) => {
      if (Array.isArray(line)) {
        const ret =  <TextLine
          key={i}
          y={currentOffsetTop}
          level={level}
          lineLevel={lineLevel}>
          {line}
        </TextLine>
        currentOffsetTop += lineHeight
        return ret
      } else {
        const lineY = line.props.y !== undefined ? line.props.y : 0
        const thisLevel = line.props.level !== undefined ? line.props.level : level
        const thisLineLevel = line.props.lineLevel !== undefined ? line.props.lineLevel : level
        const { lineHeight } = computeTextLevels(thisLevel, thisLineLevel, context.viewport)
        const ret = React.cloneElement(line, {
          level: thisLevel,
          lineLevel: thisLineLevel,
          key: i,
          y: currentOffsetTop + lineY
        })
        currentOffsetTop += lineHeight
        return ret
      }
    })

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

    return <text
      x={props.x}
      y={props.y}
      style={style}
      className={classes.join(' ')}>
      {lines}
    </text>
  }
}

export default Text

/* * * * * Prop types * * * * */

Text.propTypes = {}
Text.defaultProps = {}

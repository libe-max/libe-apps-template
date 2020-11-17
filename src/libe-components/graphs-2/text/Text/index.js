import React, { Component } from 'react'
import AppContext from '../../../../context'
import TextLine from '../Line'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'
import alignToAnchor from '../../../../libe-utils/css-text-align-to-text-anchor'

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
 *   x, y, children, level, lineLevel, family, weight, spacing,
 *   align, blockAlign, outline, outlineWidth, style, className
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
    this.alignBlock = this.alignBlock.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT & DID UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () { this.alignBlock() }
  componentDidUpdate () { this.alignBlock() }

  /* * * * * * * * * * * * * * * * *
   *
   * ALIGN BLOCK
   *
   * * * * * * * * * * * * * * * * */
  alignBlock () {
    const { props, $wrapper } = this
    if (!$wrapper) return
    const blockAlign = props.blockAlign !== undefined ? props.blockAlign : 'start'
    const startVals = ['left', 'start']
    const centerVals = ['center', 'middle', 'justify', 'justify-all']
    const endVals = ['right', 'end']
    const percentBlockAlign = startVals.includes(blockAlign)
      ? 0
      : centerVals.includes(blockAlign)
        ? .5
        : endVals.includes(blockAlign)
          ? 1
          : parseFloat(blockAlign) / 100
    if (Number.isNaN(percentBlockAlign)) return
    const blockWidth = $wrapper.getBoundingClientRect().width
    const propsX = props.x || 0
    const alignOffset = propsX + blockWidth * percentBlockAlign
    const transform = `translate(${alignOffset}, ${props.y || 0})`
    $wrapper.setAttribute('transform', transform)
  }

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
          align={props.align}
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
          align: line.props.align || props.align,
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
      paintOrder: 'stroke',
      stroke: props.outline,
      strokeWidth: props.outlineWidth !== undefined ? props.outlineWidth : props.outline ? 1 : 0,
      strokeLinejoin: props.outline || props.outlineWidth ? 'round' : undefined,
      ...props.style
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <g
      className={classes.join(' ')}
      ref={n => this.$wrapper = n}
      transform={`translate(${props.x || 0}, ${props.y || 0})`}>
      <text
        style={style}
        textAnchor={alignToAnchor(props.align)}>
        {lines}
      </text>
    </g>
  }
}

export default Text

/* * * * * Prop types * * * * */

Text.propTypes = {}
Text.defaultProps = {}

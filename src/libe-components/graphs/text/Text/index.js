import React, { Component } from 'react'
import AppContext from '../../../../context'
import asText from '../../primitives/asText'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'

/*
 *   Text component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   -
 *
 *   PROPS
 *   fontSize, lineHeight, computeChildLevels
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
    this.c = 'lblb-graph-text'
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
    const { props, context, c, $wrapper } = this

    /* Inner logic */
    const { fontSize, lineHeight, computeTextLevels } = props
    const { level: contextLevel, line_level: contextLineLevel } = context.current_graph_text_element
    let currentOffset = 0
    const lines = React.Children.map(props.children, child => {
      
      // Line levels
      const childPropsLevel = child.props.level
      const childPropsLineLevel = child.props.lineLevel !== undefined
        ? child.props.lineLevel
        : childPropsLevel
      const childDefaultLevel = typeof child.type === 'function'
        ? child.type.defaultLevel
        : undefined
      const childDefaultLineLevel = typeof child.type === 'function'
        && child.type.defaultLineLevel !== undefined
        ? child.type.defaultLineLevel
        : childDefaultLevel
      const childContextLevel = contextLevel !== undefined
        ? contextLevel
        : 1
      const childContextLineLevel = contextLineLevel !== undefined
        ? contextLineLevel
        : childContextLevel
      const childLevel = childPropsLevel !== undefined
        ? childPropsLevel
        : childDefaultLevel !== undefined
          ? childDefaultLevel
          : childContextLevel
      const childLineLevel = childPropsLineLevel !== undefined
        ? childPropsLineLevel
        : childDefaultLineLevel !== undefined
          ? childDefaultLineLevel
          : childContextLineLevel

      // Line sizes
      const {
        fontSize: computedChildLevel,
        lineHeight: computedChildLineLevel
      } = computeTextLevels(childLevel, childLineLevel)
      const childPropsFontSize = child.props.fontSize
      const childPropsLineHeight = child.props.lineHeight
      const childFontSize = childPropsFontSize !== undefined
        ? childPropsFontSize
        : computedChildLevel
      const childLineHeight = childPropsLineHeight !== undefined
        ? childPropsLineHeight
        : computedChildLineLevel

      // Move child line
      currentOffset += childLineHeight / 2
      const transform = `translate(0, ${currentOffset})`
      currentOffset += childLineHeight / 2
      
      // Style & render child
      const childStyle = {
        ...props.style,
        ...child.props.style
      }
      
      const renderedChild = React.cloneElement(child, { style: childStyle })
      
      if (typeof child.type === 'function') return <g
        className={'lblb-graph-text__line'}
        transform={transform}>
        {renderedChild}
      </g>
      
      if (child.type === 'text') return <g
        className={'lblb-graph-text__line'}
        transform={transform}>
        <rect />
        {renderedChild}
      </g>
      
      return <g
        className={'lblb-graph-text__line'}
        transform={transform}>
        <rect />
        <text>{renderedChild}</text>
      </g>
    })

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    return <g
      ref={n => this.$wrapper = n}
      className={classes.join(' ')}>
      {lines}
    </g>
  }
}

export default asText(Text)

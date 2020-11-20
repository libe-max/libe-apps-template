import React, { Component } from 'react'
import AppContext from '../../../../context'
import PositionBox from '../../primitives/PositionBox'
import computeTextLevels from '../../../../libe-utils/text-levels-to-font-size-and-line-heights'

/*
 *   asText HOC
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates generic props for shapes, then renders the
 *   provided wrapped component
 *   
 *   PROPS
 *   fontSize, lineHeight, level, lineLevel
 *   x, y, xValue, yValue
 *
 */

const asText = (Wrapped, defaultLevel, defaultLineLevel) => {
  class AsText extends Component {
    /* * * * * * * * * * * * * * * * *
     *
     * MAKE CONTEXT ACCESSIBLE
     *
     * * * * * * * * * * * * * * * * */
    static contextType = AppContext

    static defaultLevel = defaultLevel
    static defaultLineLevel = defaultLineLevel
    static lol = new Wrapped().c

    /* * * * * * * * * * * * * * * * *
     *
     * RENDER
     *
     * * * * * * * * * * * * * * * * */
    render () {
      const { props, context } = this
      
      /* Inner logic */

      /* Position */
      const { current_graph: { xScale, yScale, calcWidth, calcHeight } } = context
      const x = props.x !== undefined ? calcWidth(props.x) : props.xValue !== undefined ? xScale(props.xValue) : undefined
      const y = props.y !== undefined ? calcHeight(props.y) : props.yValue !== undefined ? yScale(props.yValue) : undefined
      
      /* Levels */
      const { current_graph_text_element: currentText } = context
      const propsLevel = props.level
      const propsLineLevel = props.lineLevel !== undefined
        ? props.lineLevel
        : propsLevel
      const defaultLevel = this.constructor.defaultLevel
      const defaultLineLevel = this.constructor.defaultLineLevel !== undefined
        ? this.constructor.defaultLineLevel
        : defaultLineLevel
      const contextLevel = currentText
        && currentText.level !== undefined
        ? currentText.level
        : 1
      const contextLineLevel = currentText
        && currentText.line_level !== undefined
        ? currentText.line_level
        : contextLevel
      const level = propsLevel !== undefined
        ? propsLevel
        : defaultLevel !== undefined
          ? defaultLevel
          : contextLevel
      const lineLevel = propsLineLevel !== undefined
        ? propsLineLevel
        : defaultLineLevel !== undefined
          ? defaultLineLevel
          : contextLineLevel
      
      /* Sizes */
      const { fontSize: computedLevel, lineHeight: computedLineLevel } = computeTextLevels(level, lineLevel)
      const propsFontSize = props.fontSize
      const propsLineHeight = props.lineHeight
      const fontSize = propsFontSize !== undefined
        ? propsFontSize
        : computedLevel
      const lineHeight = propsLineHeight !== undefined
        ? propsLineHeight
        : computedLineLevel

      /* Child props */
      const childProps = {
        ...props,
        level,
        lineLevel,
        fontSize,
        lineHeight,
        computeTextLevels: (level, lineLevel) => computeTextLevels(level, lineLevel, context.viewport)
      }
      delete childProps.x
      delete childProps.xValue
      delete childProps.y
      delete childProps.yValue
      delete childProps.level
      delete childProps.lineLevel

      /* Child context */
      const childContext = {
        ...context,
        current_graph_text_element: {
          ...currentText,
          level: level,
          line_level: lineLevel,
          font_size: fontSize,
          line_height: lineHeight,
          value: Math.random()
        }
      }

      console.log(Wrapped.name, {
        contextLevel,
        contextLineLevel,
        propsLevel: props.level,
        propsLineLevel: props.lineLevel,
        level,
        lineLevel,
        computedLevel,
        computedLineLevel,
        defaultLevel,
        defaultLineLevel,
        fontSize,
        lineHeight
      })
      console.log(currentText)
      console.log(childContext.current_graph_text_element)

      /* Display */
      return <AppContext.Provider value={childContext}>
        <PositionBox x={x} y={y}>
          <Wrapped {...childProps} />
        </PositionBox>
      </AppContext.Provider>
    }
  }
  return AsText
}

export default asText

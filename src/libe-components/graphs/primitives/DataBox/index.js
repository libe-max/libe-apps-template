import React, { Component } from 'react'
import { scaleLinear } from 'd3'
import AppContext from '../../../../context'
import cssCalcToPx from '../../../../libe-utils/css-calc-to-px'
import cssPaddingExpressionToObject from '../../../../libe-utils/css-padding-expression-to-object'
import d3ScaleNameToScale from '../../../../libe-utils/d3-scale-name-to-scale'
import d3ScaleToScaleType from '../../../../libe-utils/d3-scale-to-scale-type'
import d3CopyTypedScale from '../../../../libe-utils/d3-copy-typed-scale'

/*
 *   DataBox component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates data props and renders an accordingly informed box
 *   
 *   PROPS
 *   data, xScale, xScaleDomain, xScaleConf, yScale, yScaleDomain, yScaleConf,
 *   render, children
 *
 */

class DataBox extends Component {
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
    const { props, context } = this

    /* Inner logic */
    const { viewport, current_graph: currentGraph } = context
    const { width, height } = currentGraph
    
    // Data
    const data = props.data !== undefined ? props.data : currentGraph.data
    
    // Scales
    const unconfXScale = props.xScale
      ? typeof props.xScale === 'function'
        ? d3CopyTypedScale(props.xScale).domain([0, width]).range([0, width])
        : d3ScaleNameToScale(props.xScale)([0, width], [0, width])
      : currentGraph.xScale
        ? d3CopyTypedScale(currentGraph.xScale).domain([0, width]).range([0, width])
        : scaleLinear([0, width], [0, width])
    const unconfYScale = props.yScale
      ? typeof props.yScale === 'function'
        ? d3CopyTypedScale(props.yScale).domain([0, height]).range([0, height])
        : d3ScaleNameToScale(props.yScale)([0, height], [0, height])
      : currentGraph.yScale
        ? d3CopyTypedScale(currentGraph.yScale).domain([0, height]).range([0, height])
        : scaleLinear([0, height], [0, height])
    if (props.xScaleDomain) unconfXScale.domain(props.xScaleDomain)
    if (props.yScaleDomain) unconfYScale.domain(props.yScaleDomain)
    const xScale = props.xScaleConf ? props.xScaleConf({ width, height, data, scale: unconfXScale }) : unconfXScale
    const yScale = props.yScaleConf ? props.yScaleConf({ width, height, data, scale: unconfYScale }) : unconfYScale
    xScale._type = xScale._type || d3ScaleToScaleType(xScale)
    yScale._type = yScale._type || d3ScaleToScaleType(yScale)
    
    // Renderer
    const render = props.render || (() => '')
    const _renderer = () => render({ data, width, height, xScale, yScale })
    
    // Context
    const childContext = {
      ...context,
      current_graph: {
        ...currentGraph,
        data,
        xScale,
        yScale,
        calcWidth: val => cssCalcToPx(val, width, viewport),
        calcHeight: val => cssCalcToPx(val, height, viewport),
        calcPadding: val => cssPaddingExpressionToObject(val,  { width, height }, viewport)
      }
    }

    /* Display */
    return <AppContext.Provider value={childContext}>
      {_renderer()}
      {props.children}
    </AppContext.Provider>
  }
}

export default DataBox

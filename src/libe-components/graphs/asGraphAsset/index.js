import React, { Component } from 'react'
import { scaleLinear } from 'd3'
import chroma from 'chroma-js'
import AppContext from '../../../context'
import cssCalcToPx from '../../../libe-utils/css-calc-to-px'
import cssPaddingExpressionToObject from '../../../libe-utils/css-padding-expression-to-object'
import d3ScaleNameToScale from '../../../libe-utils/d3-scale-name-to-scale'

/*
 *   GraphAsset higher order component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   - Computes generig props for all graph components
 *   - Checks in context if we're already in a SVG environment, and:
 *     • Updates the context for children with current viewport values
 *       (width, height, data, xScale, yScale)
 *     • Renders a wrapper (Div > Svg > G or simply G depending on the context)
 *     • Fills the wrapper with the lower order component and give them the props they need
 *
 *   PROPS
 *   x, y, width, height, padding, data, xScale, xScaleDomain, xScaleConf, yScale, yScaleDomain, yScaleConf, render
 *
 */

const asGraphAsset = WrappedComponent => {
  class AsGraphAsset extends Component {
    /* * * * * * * * * * * * * * * * *
     *
     * CONSTRUCTOR
     *
     * * * * * * * * * * * * * * * * */
    constructor () {
      super()
      this.state = {
        id: Math.random().toString(36).slice(2)
      }
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
      const { props, state, context, $assetWrapper } = this

      // Current Graph Asset dimensions
      const currentGraphAssetDimensions = context.current_graph_asset

      // Parent DOM element (if component has already been rendered once)
      const $parent = $assetWrapper ? $assetWrapper.parentElement : undefined
      const parentOutWidth = $parent ? $parent.getBoundingClientRect().width : undefined
      const parentOutHeight = $parent ? $parent.getBoundingClientRect().height : undefined
      const parentStyle = $parent ? $parent.style : {}
      const parentPaddingTop = parseFloat(parentStyle.paddingTop) || 0
      const parentPaddingRight = parseFloat(parentStyle.paddingRight) || 0
      const parentPaddingBottom = parseFloat(parentStyle.paddingBottom) || 0
      const parentPaddingLeft = parseFloat(parentStyle.paddingLeft) || 0
      const parentWidth = Math.max(parentOutWidth - parentPaddingLeft - parentPaddingRight, 0)
      const parentHeight = Math.max(parentOutHeight - parentPaddingTop - parentPaddingBottom, 0)

      // Container's (current graph or $parent) width and height
      // On the first rendering of the first asset in chain, width and height
      // will default to 0. Hoping for a subsequent render to get correct sizes.
      const containerDimensions = {
        width: currentGraphAssetDimensions ? currentGraphAssetDimensions.width : $parent ? parentWidth : 0,
        height: currentGraphAssetDimensions ? currentGraphAssetDimensions.height : $parent ? parentHeight : 0
      }

      // X, Y position
      const x = cssCalcToPx(props.x, containerDimensions.width, context.viewport) || 0
      const y = cssCalcToPx(props.y, containerDimensions.height, context.viewport) || 0
      
      // Interpret dimensions from props
      // can be: undefined, a 0 from a % value calculated on the basis of a 0x0 container
      // or a correctly read css length expression from props
      const propsWidth = cssCalcToPx(props.width, containerDimensions.width, context.viewport)
      const propsHeight = cssCalcToPx(props.height, containerDimensions.height, context.viewport)

      // Outer width
      const outerWidth = propsWidth === undefined ? Math.max(containerDimensions.width, 0) : Math.max(propsWidth, 0)
      const outerHeight = propsHeight === undefined ? Math.max(containerDimensions.height, 0) : Math.max(propsHeight, 0)

      // Padding
      const padding = cssPaddingExpressionToObject(props.padding, { width: outerWidth, height: outerHeight }, context.viewport)

      // Dimensions
      const width = Math.max(outerWidth - padding.left - padding.right, 0)
      const height = Math.max(outerHeight - padding.top - padding.bottom, 0)
      const dimensions = { width, height }

      // Data
      const data = props.data || context.current_graph_asset.data

      // Scales
      const unconfXScale = props.xScale
        ? typeof props.xScale === 'function'
          ? props.xScale.copy()
          : d3ScaleNameToScale(props.xScale)([0, width], [0, width])
        : scaleLinear([0, width], [0, width])
      const unconfYScale = props.yScale
        ? typeof props.yScale === 'function'
          ? props.yScale.copy()
          : d3ScaleNameToScale(props.yScale)([0, height], [0, height])
        : scaleLinear([0, height], [0, height])
      if (props.xScaleDomain) unconfXScale.domain(props.xScaleDomain)
      if (props.yScaleDomain) unconfYScale.domain(props.yScaleDomain)
      const xScale = props.xScaleConf ? props.xScaleConf({ scale: unconfXScale, width, height, data }) : unconfXScale
      const yScale = props.yScaleConf ? props.yScaleConf({ scale: unconfYScale, width, height, data }) : unconfYScale

      // Render
      const render = props.render ? props.render : () => ''

      const childProps = {
        ...props,
        width,
        height,
        data,
        xScale: xScale.copy(),
        yScale: yScale.copy(),
        render,
        calcWidth: val => cssCalcToPx(val, width, context.viewport),
        calcHeight: val => cssCalcToPx(val, height, context.viewport),
        calcPadding: val => cssPaddingExpressionToObject(val,  dimensions, context.viewport),
        x: undefined,
        y: undefined,
        padding: undefined,
        name: undefined
      }

      const childrenAssetsContext = {
        ...context,
        current_graph_asset: {
          ...context.current_graph_asset,
          width,
          height,
          data
        }
      }

      /* Display */
      return context.current_graph_asset
        ? <g className={`lblb-graph-asset`} id={`lblb-graph-asset-id-${state.id}`} ref={n => this.$assetWrapper = n}>
          <rect width={outerWidth} height={outerHeight} style={{ fill: 'transparent', stroke: 'rgba(33, 33, 33, .1)', strokeWidth: 1, strokeLocation: 'inside' }} />
          <g className='lblb-graph-asset__mar-and-pad' transform={`translate(${x + padding.left}, ${y + padding.top})`}>
            <rect width={width} height={height} style={{ fill: 'rgba(33, 33, 33, .015)' }} />
            <AppContext.Provider value={childrenAssetsContext}>
              <WrappedComponent {...childProps} />
            </AppContext.Provider>
          </g>
        </g>
        : <div className={`lblb-graph-asset`} id={`lblb-graph-asset-id-${state.id}`} ref={n => this.$assetWrapper = n}>
          <svg width={outerWidth} height={outerHeight}>
            <rect width={outerWidth} height={outerHeight} style={{ fill: 'transparent', stroke: 'rgba(33, 33, 33, .1)', strokeWidth: 1, strokeLocation: 'inside' }} />
            <g className='lblb-graph-asset__mar-and-pad' transform={`translate(${x + padding.left}, ${y + padding.top})`}>
              <rect width={width} height={height} style={{ fill: 'rgba(33, 33, 33, .015)' }} />
              <AppContext.Provider value={childrenAssetsContext}>
                <WrappedComponent {...childProps} />
              </AppContext.Provider>
            </g>
          </svg>
        </div>
    }
  }

  /* * * * * Prop types * * * * */

  AsGraphAsset.propTypes = {}
  AsGraphAsset.defaultProps = {
    x: 0,
    y: 0,
    padding: 0
  }

  return AsGraphAsset
}

export default asGraphAsset

import React, { Component } from 'react'
import { scaleLinear } from 'd3'
import AppContext from '../../../../context'
import cssCalcToPx from '../../../../libe-utils/css-calc-to-px'
import cssPaddingExpressionToObject from '../../../../libe-utils/css-padding-expression-to-object'
import d3ScaleNameToScale from '../../../../libe-utils/d3-scale-name-to-scale'
import d3ScaleToScaleType from '../../../../libe-utils/d3-scale-to-scale-type'
import d3CopyTypedScale from '../../../../libe-utils/d3-copy-typed-scale'

/*
 *   GraphAsset higher order component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   - Computes generic props for all graph components
 *   - Checks in context if we're already in a SVG environment, and:
 *     • Updates the context for children with current viewport values
 *       (width, height, data, xScale, yScale)
 *     • Renders a wrapper (Div > Svg > G or simply G depending on the context)
 *     • Fills the wrapper with the lower order component and give them the
 *       props and context they need
 *
 *   PROPS
 *   x, y, width, height, padding, data, xScale, xScaleDomain, xScaleConf,
 *   yScale, yScaleDomain, yScaleConf, render, style, background, clipContent
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
        inner_clip_id: `lblb-clip__${Math.random().toString(36).slice(2)}`,
        outer_clip_id: `lblb-clip__${Math.random().toString(36).slice(2)}`
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
      const data = props.data || (context.current_graph_asset ? context.current_graph_asset.data : undefined)

      // Scales
      const unconfXScale = props.xScale
        ? typeof props.xScale === 'function'
          ? d3CopyTypedScale(props.xScale).domain([0, width]).range([0, width])
          : d3ScaleNameToScale(props.xScale)([0, width], [0, width])
        : context.current_graph_asset && context.current_graph_asset.xScale
          ? d3CopyTypedScale(context.current_graph_asset.xScale).domain([0, width]).range([0, width])
          : scaleLinear([0, width], [0, width])
      const unconfYScale = props.yScale
        ? typeof props.yScale === 'function'
          ? d3CopyTypedScale(props.yScale).domain([0, height]).range([0, height])
          : d3ScaleNameToScale(props.yScale)([0, height], [0, height])
        : context.current_graph_asset && context.current_graph_asset.yScale
          ? d3CopyTypedScale(context.current_graph_asset.yScale).domain([0, height]).range([0, height])
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

      // Passed props
      const childProps = { ...props, render, _renderer }
      delete childProps.x
      delete childProps.y
      delete childProps.width
      delete childProps.height
      delete childProps.padding
      delete childProps.data
      delete childProps.xScale
      delete childProps.yScale
      delete childProps.style

      // Passed context
      const childrenAssetsContext = {
        ...context,
        current_graph_asset: {
          ...context.current_graph_asset,
          width,
          height,
          data,
          xScale,
          yScale,
          calcWidth: val => cssCalcToPx(val, width, context.viewport),
          calcHeight: val => cssCalcToPx(val, height, context.viewport),
          calcPadding: val => cssPaddingExpressionToObject(val,  dimensions, context.viewport)
        }
      }

      // Inner stuff
      const innerStyle = { ...props.innerStyle }
      if (props.innerBackground) innerStyle.fill = props.innerBackground
      const innerBox = <AppContext.Provider value={childrenAssetsContext}>
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          <rect
            width={width}
            height={height}
            style={innerStyle} />
          {props.innerClipContent
            && <clipPath id={state.inner_clip_id}>
            <rect
              width={width}
              height={height} />
          </clipPath>}
          {!props.clipContent
            && props.clipContent
            && <clipPath id={state.outer_clip_id}>
            <rect
              x={-1 * padding.left}
              y={-1 * padding.top}
              width={outerWidth}
              height={outerHeight} />
          </clipPath>}
          {props.innerClipContent
            && <g clipPath={`url(#${state.inner_clip_id})`}>
            <WrappedComponent {...childProps} />
          </g>}
          {!props.innerClipContent
            && props.clipContent
            && <g clipPath={`url(#${state.outer_clip_id})`}>
            <WrappedComponent {...childProps} />
          </g>}
          {!props.innerClipContent
            && !props.clipContent
            && <g><WrappedComponent {...childProps} /></g>}
        </g>
      </AppContext.Provider>

      // Outer stuff
      const style = { ...props.style }
      if (props.background) style.fill = props.background
      const outerBox = context.current_graph_asset
        ? <g
          className={`lblb-graph-asset`}
          transform={`translate(${x}, ${y})`}
          ref={n => this.$assetWrapper = n}>
          <rect
            width={outerWidth}
            height={outerHeight}
            style={style} />
          {innerBox}
        </g>
        : <div
          className={`lblb-graph-asset`}
          style={{ marginLeft: `${x}px`, marginTop: `${y}px` }}
          ref={n => this.$assetWrapper = n}>
          <svg
            width={outerWidth}
            height={outerHeight}>
            <rect
              width={outerWidth}
              height={outerHeight}
              style={style} />
            {innerBox}
          </svg>
        </div>

      /* Display */
      return outerBox
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

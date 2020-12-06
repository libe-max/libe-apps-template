import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import AppContext from '../../../../context'
import cssCalc from '../../../../libe-utils/css-calc-to-px'

/*
 *   PositionBox component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates positional props and renders an accordingly positioned box
 *   
 *   PROPS
 *   x, y, width, height, clip, background, children
 *
 */

class PositionBox extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super()
    this.state = { clip_id: uuid() }
    this.c = 'lblb-graph-position-box'
    this.selfAwareStuff = this.selfAwareStuff.bind(this)
    console.log(props.name, 'constructor')
  }

  tilt = false

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT & UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    console.log(this.props.name, 'mount')
    this.selfAwareStuff()
  }

  componentDidUpdate () {
    console.log(this.props.name, 'update')
    this.selfAwareStuff()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SELF AWARE STUFF
   *
   * * * * * * * * * * * * * * * * */
  selfAwareStuff () {
    console.log(this.props.name, 'self aware stuff')
    const { props, context, c, $wrapper } = this
    this.tilt = !this.tilt
    if (!$wrapper) return
    const {
      anchor: propsAnchor,
      translate: propsTranslate,
      rotate: propsRotate,
      skew: propsSkew,
      scale: propsScale
    } = props
    const { viewport } = context

    const $anchorBox = $wrapper.querySelector(`.${c}__anchor-box`)
    const $translateBox = $wrapper.querySelector(`.${c}__translate-box`)
    const $rotateBox = $wrapper.querySelector(`.${c}__rotate-box`)
    const $skewBox = $wrapper.querySelector(`.${c}__skew-box`)
    const $scaleBox = $wrapper.querySelector(`.${c}__scale-box`)

    $anchorBox.setAttribute('transform', '')
    $translateBox.setAttribute('transform', '')
    $rotateBox.setAttribute('transform', '')
    $skewBox.setAttribute('transform', '')
    $scaleBox.setAttribute('transform', '')

    const boundingClientRect = $wrapper.getBoundingClientRect()
    const { width, height } = boundingClientRect

    // Anchor
    const strAnchor = propsAnchor !== undefined
      ? typeof propsAnchor === 'number'
        ? `${propsAnchor}`
        : propsAnchor
      : ''
    const splStrAnchor = strAnchor.split(' ')
    const xAnchorStr = splStrAnchor[0]
    const yAnchorStr = splStrAnchor[1] !== undefined ? splStrAnchor[1] : splStrAnchor[0]
    const xAnchor = cssCalc(xAnchorStr, width, viewport) || 0
    const yAnchor = cssCalc(yAnchorStr, height, viewport) || 0
    const anchorTransform = `translate(${-1 * xAnchor}, ${-1 * yAnchor})`
    $anchorBox.setAttribute('transform', anchorTransform)
    
    // Translate
    const strTranslate = propsTranslate !== undefined
      ? typeof propsTranslate === 'number'
        ? `${propsTranslate}`
        : propsTranslate
      : ''
    const splStrTranslate = strTranslate.split(' ')
    const xTranslateStr = splStrTranslate[0]
    const yTranslateStr = splStrTranslate[1] !== undefined ? splStrTranslate[1] : 0
    const xTranslate = cssCalc(xTranslateStr, width, viewport) || 0
    const yTranslate = cssCalc(yTranslateStr, height, viewport) || 0
    const translateTransform = `translate(${xTranslate}, ${yTranslate})`
    $translateBox.setAttribute('transform', translateTransform)

    // Rotate
    const rotate = parseFloat(propsRotate) || 0
    const rotateTransform = `rotate(${rotate} ${xAnchor} ${yAnchor})`
    $rotateBox.setAttribute('transform', rotateTransform)

    // Skew
    const strSkew = propsSkew !== undefined
      ? typeof propsSkew === 'number'
        ? `${propsSkew}`
        : propsSkew
      : ''
    const splStrSkew = strSkew.split(' ')
    const xSkewStr = splStrSkew[0]
    const ySkewStr = splStrSkew[1] !== undefined ? splStrSkew[1] : 0
    const xSkew = parseFloat(xSkewStr) || 0
    const ySkew = parseFloat(ySkewStr) || 0
    const skewTransform = `skewX(${xSkew}) skewY(${ySkew})`
    $skewBox.setAttribute('transform', skewTransform)

    // Scale
    const strScale = propsScale !== undefined
      ? typeof propsScale === 'number'
        ? `${propsScale}`
        : propsScale
      : ''
    const splStrScale = strScale.split(' ')
    const xScaleStr = splStrScale[0]
    const yScaleStr = splStrScale[1] !== undefined ? splStrScale[1] : splStrScale[0]
    const xScale = parseFloat(xScaleStr) || 1
    const yScale = parseFloat(yScaleStr) || 1
    const scaleTransform = `translate(${xAnchor * (xScale - 1) * -1} ${yAnchor * (yScale - 1) * -1}) scale(${xScale}, ${yScale})`
    $scaleBox.setAttribute('transform', scaleTransform)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c } = this
    console.log(props.name, 'render')

    /* Inner logic */
    const { x: propsX, y: propsY, width: propsWidth, height: propsHeight } = props
    const { viewport, current_graph: currentGraph } = context
    const { width: contextWidth, height: contextHeight } = currentGraph
    const x = cssCalc(propsX, contextWidth, viewport) || 0
    const y = cssCalc(propsY, contextHeight, viewport) || 0
    const width = propsWidth !== undefined ? Math.max(cssCalc(propsWidth, contextWidth, viewport), 0) : contextWidth
    const height = propsHeight !== undefined ? Math.max(cssCalc(propsHeight, contextHeight, viewport), 0) : contextHeight
    const clipPath = props.clip ? `url(#${state.clip_id})` : undefined
    const childContext = {
      ...context,
      current_graph: {
        ...currentGraph,
        width: width,
        height: height
      }
    }

    /* Display */
    return <AppContext.Provider value={childContext}>
      <g
        className={c}
        transform={`translate(${x}, ${y})`}
        ref={n => this.$wrapper = n}>
        <g className={`${c}__anchor-box`} transform='translate(0, 0) rotate(0, 0, 0), scale(0) skewX(0) skewY(0)'>
          <g className={`${c}__translate-box`} transform='translate(0, 0) rotate(0, 0, 0), scale(0) skewX(0) skewY(0)'>
            <g className={`${c}__rotate-box`} transform='translate(0, 0) rotate(0, 0, 0), scale(0) skewX(0) skewY(0)'>
              <g className={`${c}__skew-box`} transform='translate(0, 0) rotate(0, 0, 0), scale(0) skewX(0) skewY(0)'>
                <g className={`${c}__scale-box`} transform='translate(0, 0) rotate(0, 0, 0), scale(0) skewX(0) skewY(0)'>
                  {props.background && <rect width={width} height={height} style={{ fill: props.background || 'transparent' }} />}
                  {props.clip && <clipPath id={state.clip_id}><rect width={width} height={height} /></clipPath>}
                  {props.clip && <g clipPath={clipPath}>{props.children}</g>}
                  {!props.clip && props.children}
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </AppContext.Provider>
  }
}

export default PositionBox

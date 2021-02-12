import React, { Component } from 'react'

/*
 *   BarChart component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Draws a bar chart
 *
 *   PROPS
 *   x, y, width, height, fill, data, columns, min, max, origin, className
 *
 */

class BarChart extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * STATE
   *
   * * * * * * * * * * * * * * * */
  state = {
    hovered_bar: null
  }

  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-bar-chart'
    this.handleBarEnter = this.handleBarEnter.bind(this)
    this.handleBarLeave = this.handleBarLeave.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * BAR HOVER HANDLERS
   *
   * * * * * * * * * * * * * * * */
  handleBarEnter (i) { this.setState({ hovered_bar: i }) }
  handleBarLeave (i) { this.setState({ hovered_bar: null }) }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, state, c, handleBarEnter, handleBarLeave } = this
    const {
      x: propsX,
      y: propsY,
      width: propsWidth,
      height: propsHeight,
      fill: propsFill,
      fillHover: propsFillHover,
      bgFill: propsBgFill,
      bgFillHover: propsBgFillHover,
      bgHoverable: propsBgHoverable,
      cursor: propsCursor,
      stackBars: propsStackBars,
      accumulate: propsAccumulate,
      origin: propsOrigin,
      data: propsData,
      columns: propsColumns,
      min: propsMin,
      max: propsMax,
      tooltip: propsTooltip,
      className
    } = props

    /* Default props */
    const x = propsX || 0
    const y = propsY || 0
    const width = propsWidth || 0
    const height = propsHeight || 0
    const fill = Array.isArray(propsFill) ? propsFill : (propsFill ? [propsFill] : ['black'])
    const fillHover = Array.isArray(propsFillHover)
      ? [...propsFillHover, ...fill.slice(propsFillHover.length)]
      : (propsFillHover ? [propsFillHover, ...fill.slice(1)] : fill)
    const bgFill = propsBgFill || 'transparent'
    const bgFillHover = propsBgFillHover || bgFill
    const bgHoverable = propsBgHoverable || false
    const cursor = propsCursor || 'default'
    const stackBars = propsStackBars || false
    const origin = propsOrigin || 'bottom'
    const unaccumulatedData = Array.isArray(propsData)
      ? propsData.map(vals => Array.isArray(vals) ? vals : [vals])
      : []
    const data = !propsAccumulate
      ? unaccumulatedData
      : unaccumulatedData.map((col, i, unacData) => {
        return col.map((val, j, co) => {
          if (!i) return val
          const sumOfPrecVals = unacData
            .slice(0, i)
            .map(col => col[j])
            .reduce((a, b) => a + b, 0)
          return val + sumOfPrecVals
        })
      })
    const columns = Array.isArray(propsColumns)
      ? [...propsColumns, ...Object.keys(data).slice(propsColumns.length)]
      : [...Object.keys(data)]
    const min = propsMin !== undefined
      ? propsMin
      : stackBars
        ? Math.min(...data.map(vals => vals.reduce((a, b) => a + b, 0)))
        : Math.min(...[...data].flat())
    const max = propsMax !== undefined
      ? propsMax
      : stackBars
        ? Math.max(...data.map(vals => vals.reduce((a, b) => a + b, 0)))
        : Math.max(...[...data].flat())
    const tooltiper = typeof propsTooltip === 'function' ? propsTooltip : undefined

    /* Inner logic */
    const originDirection = origin === 'top' || origin === 'bottom' ? 'horizontal' : 'vertical'
    const bandThickness = originDirection === 'horizontal' ? width / data.length : height / data.length
    const bandLength = originDirection === 'horizontal' ? height : width
    
    const barsData = data.map((vals, i) => {
      const colWidth = bandThickness
      const colHeight = bandLength
      const colX = i * bandThickness
      const colY = 0
      const colFill = bgFill
      const colFillHover = bgFillHover
      let currentColTop = 0
      let currentColBottom = 0
      const bars = vals.map((val, j) => {
        const barWidth = colWidth
        const barHeightRatio = (val - min) / (max - min)
        const barHeight = barHeightRatio * bandLength
        const barX = colX
        const barY = stackBars ? (barHeight >= 0 ? currentColTop : currentColBottom) : 0
        const barFill = fill[j] || fill[0]
        const barFillHover = fillHover[j] || fillHover[0]
        if (barHeight >= 0) currentColTop += barHeight
        else currentColBottom += barHeight
        const notOrientedBarData = {
          x: barX,
          y: barHeight >= 0 ? barY : (barY + barHeight),
          width: barWidth,
          height: barHeight >= 0 ? barHeight : -1 * barHeight,
          fill: barFill,
          fillHover: barFillHover
        }
        return {
          x: originDirection === 'horizontal' ? notOrientedBarData.x : (origin === 'left' ? notOrientedBarData.y : (width - notOrientedBarData.y - notOrientedBarData.height)),
          y: originDirection === 'vertical' ? notOrientedBarData.x : (origin === 'top' ? notOrientedBarData.y : (height - notOrientedBarData.y - notOrientedBarData.height)),
          width: originDirection === 'horizontal' ? notOrientedBarData.width : notOrientedBarData.height,
          height: originDirection === 'vertical' ? notOrientedBarData.width : notOrientedBarData.height,
          fill: notOrientedBarData.fill,
          fillHover: notOrientedBarData.fillHover
        }
      })
      return {
        bars,
        bg: {
          x: originDirection === 'horizontal' ? colX : colY,
          y: originDirection === 'horizontal' ? colY : colX,
          width: originDirection === 'horizontal' ? colWidth : colHeight,
          height: originDirection === 'horizontal' ? colHeight : colWidth,
          fill: colFill,
          fillHover: colFillHover
        }
      }
    })

    const bars = barsData.map((barData, i) => {
      const isHovered = state.hovered_bar === i
      return <g
        key={i}
        className={`${c}__bar-wrapper`}
        onMouseEnter={() => bgHoverable ? handleBarEnter(i) : null}
        onMouseLeave={() => bgHoverable ? handleBarLeave(i) : null}
        style={{ cursor: bgHoverable ? cursor : undefined }}>
        <rect
          className={`${c}__bar-bg`}
          x={barData.bg.x}
          y={barData.bg.y}
          width={barData.bg.width}
          height={barData.bg.height}
          style={{ fill: !isHovered ? barData.bg.fill : barData.bg.fillHover }} />
        <g className={`${c}__sub-bars`}>
          {barData.bars.map((subBarData, j) => {
            return <rect
              key={j}
              className={`${c}__bar`}
              x={subBarData.x}
              y={subBarData.y}
              width={subBarData.width}
              height={subBarData.height}
              onMouseEnter={() => !bgHoverable ? handleBarEnter(i) : null}
              onMouseLeave={() => !bgHoverable ? handleBarLeave(i) : null}
              style={{
                fill: !isHovered ? subBarData.fill : subBarData.fillHover,
                cursor: !bgHoverable ? cursor : undefined
              }} />
          })}
        </g>
      </g>
    })

    const tooltips = barsData.map((barData, i) => {
      if (!tooltiper) return
      const isHovered = state.hovered_bar === i
      const val = data[i]
      const col = columns[i]
      const barLowX = Math.min(...barData.bars.map(e => e.x))
      const barLowY = Math.min(...barData.bars.map(e => e.y))
      const barHighX = Math.max(...barData.bars.map(e => e.x + e.width))
      const barHighY = Math.max(...barData.bars.map(e => e.y + e.height))
      const bar = {
        x: barLowX,
        y: barLowY,
        width: barHighX - barLowX,
        height: barHighY  - barLowY
      }
      const chart = { x, y, width, height }
      return <g
        key={i}
        className={`${c}__tooltip`}
        onMouseEnter={() => handleBarEnter(i)}
        onMouseLeave={() => handleBarLeave(i)}
        style={{ display: isHovered ? 'block' : 'none' }}>
        {tooltiper({ val, col, bar, chart, i })}
      </g>
    })

    /* Assign classes */
    const classes = [c]
    if (className) classes.push(className)

    /* Display */
    return <g
      transform={`translate(${x || 0}, ${y || 0})`}
      className={classes.join(' ')}>
      <g className={`${c}__bars`}>{bars}</g>
      <g className={`${c}__tooltips`}>{tooltips}</g>
    </g>
  }
}

export default BarChart

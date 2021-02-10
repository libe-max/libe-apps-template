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
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-graph-bar-chart'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    const {
      x, y, width, height, fill, data: propsData, columns: propsColumns,
      min: propsMin, max: propsMax, origin, tooltip: propsTooltip, className
    } = props

    /* Inner logic */
    const data = Array.isArray(propsData) ? propsData : []
    const columns = Array.isArray(propsColumns)
      ? [...propsColumns, ...Object.keys(data).slice(propsColumns.length)]
      : [...Object.keys(data)]
    const min = propsMin !== undefined ? propsMin : Math.min(...data)
    const max = propsMax !== undefined ? propsMax : Math.max(...data)
    const bandWidth = origin === 'top' || origin === 'bottom' ? width / data.length : height / data.length
    const barsData = data.map((val, i) => {
      const bandLengthRatio = (val - min) / (max - min)
      const bandLength = origin === 'top' || origin === 'bottom'
        ? bandLengthRatio * height
        : bandLengthRatio * width
      const barX = origin === 'left' ? 0 : (origin === 'right') ? (width - bandLength) : (i * bandWidth)
      const barY = origin === 'top' ? 0 : origin === 'bottom' ? (height - bandLength) : (i * bandWidth)
      const barWidth = origin === 'top' || origin === 'bottom' ? bandWidth : bandLength
      const barHeight = origin === 'left' || origin === 'right' ? bandWidth : bandLength
      return {
        x: barX,
        y: barY,
        width: barWidth,
        height: barHeight
      }
    })

    const bars = barsData.map(barData => <rect
      x={barData.x}
      y={barData.y}
      width={barData.width}
      height={barData.height}
      style={{ fill }} />)

    const tooltips = barsData.map((barData, i) => {
      const val = data[i]
      const col = columns[i]
      const bar = { ...barData }
      const chart = { x, y, width, height }
      return propsTooltip(val, col, bar, chart)
    })

    /* Assign classes */
    const classes = [c]
    if (className) classes.push(className)

    /* Display */
    return <g
      transform={`translate(${x || 0}, ${y || 0})`}
      className={classes.join(' ')}>
      <rect width={width} height={height} fill='#FAFAFA' />
      {bars}
      {tooltips}
    </g>
  }
}

export default BarChart

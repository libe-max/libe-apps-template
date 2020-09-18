import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './style'

/*
 *   Grid component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Container for Slots and responsive design logic
 *
 *   PROPS
 *   width, gutterSize, noSideGutter, showGrid
 *
 */

export default class Grid extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-grid'
    this.interpretProps = this.interpretProps.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * INTERPRET PROPS
   *
   * * * * * * * * * * * * * * * * */
  interpretProps () {
    const { props } = this
    return {
      lgGutterSize: Array.isArray(props.gutterSize)
        ? props.gutterSize[0] ? parseFloat(props.gutterSize[0], 10) : 0
        : parseFloat(props.gutterSize, 10),
      mdGutterSize: Array.isArray(props.gutterSize)
        ? props.gutterSize[1] ? parseFloat(props.gutterSize[1], 10) : 0
        : parseFloat(props.gutterSize, 10),
      smGutterSize: Array.isArray(props.gutterSize)
        ? props.gutterSize[2] ? parseFloat(props.gutterSize[2], 10) : 0
        : parseFloat(props.gutterSize, 10),
      lgWidth: Array.isArray(props.width)
        ? props.width[0] ? parseFloat(props.width[0], 10) : 0
        : parseFloat(props.width, 10),
      mdWidth: Array.isArray(props.width)
        ? props.width[1] ? parseFloat(props.width[1], 10) : 0
        : parseFloat(props.width, 10),
      smWidth: Array.isArray(props.width)
        ? props.width[2] ? parseFloat(props.width[2], 10) : 0
        : parseFloat(props.width, 10)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.noSideGutter) classes.push(`${c}_no-side-gutter`)
    if (props.showGrid) classes.push(`${c}_show-grid`)

    /* Inner logic */
    const interpretedProps = this.interpretProps()
    const slots = React.Children.map(props.children, (child, i) => {
      return React.cloneElement(child, {
        key: i,
        gridProps: interpretedProps
      })
    })
    const visibleGrids = {
      lg: new Array(interpretedProps.lgWidth).fill(null).map((e, i) => {
        return <div className={`${c}__visible-column`} key={i}>
          <div className={`${c}__visible-column-inner`} />
        </div>
      }),
      md: new Array(interpretedProps.mdWidth).fill(null).map((e, i) => {
        return <div className={`${c}__visible-column`} key={i}>
          <div className={`${c}__visible-column-inner`} />
        </div>
      }),
      sm: new Array(interpretedProps.smWidth).fill(null).map((e, i) => {
        return <div className={`${c}__visible-column`} key={i}>
          <div className={`${c}__visible-column-inner`} />
        </div>
      })
    }

    /* Display component */
    return <Wrapper className={classes.join(' ')}
      {...interpretedProps}>
      <div className={`${c}__visible-grid ${c}__visible-grid_lg`}>{visibleGrids.lg}</div>
      <div className={`${c}__visible-grid ${c}__visible-grid_md`}>{visibleGrids.md}</div>
      <div className={`${c}__visible-grid ${c}__visible-grid_sm`}>{visibleGrids.sm}</div>
      <div className={`${c}__inner`}>{slots}</div>
    </Wrapper>
  }
}

/* * * * * Prop types * * * * */

Grid.propTypes = {
  width: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  gutterSize: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  noSideGutter: PropTypes.bool,
  showGrid: PropTypes.bool
}

Grid.defaultProps = {
  width: 12,
  gutterSize: 1,
  noSideGutter: false,
  showGrid: true
}

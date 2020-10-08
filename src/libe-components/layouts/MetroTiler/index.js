import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppContext from '../../../context'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   MetroTiler component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays it's children as a metro paving
 *
 *   PROPS
 *   columns, breakpoints, noSideGutters, className
 *
 */

export default class MetroTiler extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-metro-tiler'
    this.usedProps = ['columns', 'breakpoints', 'noSideGutters', 'className']
    this.setTilesMargins = this.setTilesMargins.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DID UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidUpdate () {
    this.setTilesMargins()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SET TILES MARGINS
   *
   * * * * * * * * * * * * * * * * */
  setTilesMargins () {
    if (!this.$wrapper) return
    const { c, props, context } = this
    const $tiles = this.$wrapper.querySelectorAll(`.${c}__tile`)
    const arrayContextBreakpoints = Object.keys(context.viewport.breakpoints)
      .map(displayName => context.viewport.breakpoints[displayName].min)
    const propsBreakpoints = props.breakpoints ? props.breakpoints.map(min => min + 1) : []
    const breakpoints = [...propsBreakpoints, ...arrayContextBreakpoints.slice(propsBreakpoints.length)]
    const vw = context.viewport.width
    const currBreakpointPos = breakpoints.findIndex(min => min < vw)
    const columns = [...props.columns, ...[1, 1, 1].slice(props.columns.length)]
    const nbColumns = columns[currBreakpointPos]
    const columnPiles = new Array(nbColumns).fill(null).map((e, i) => ({ pos: i, height: 0, $tiles: [] }))
    Array.from($tiles).map(($tile, i) => {
      const shortestPileHeight = Math.min(...columnPiles.map(pile => pile.height))
      const shortestPile = columnPiles.find(pile => pile.height === shortestPileHeight)
      $tile.style.top = `${shortestPile.height}px`
      $tile.style.left = `${100 * shortestPile.pos / nbColumns}%`
      shortestPile.height += $tile.offsetHeight
      shortestPile.$tiles.push($tile)
    })
    const maxHeight = Math.max(...columnPiles.map(pile => pile.height))
    this.$wrapper.style.height = `${maxHeight}px`
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, context } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Inner logic */
    const arrayContextBreakpoints = Object.keys(context.viewport.breakpoints)
      .map(displayName => context.viewport.breakpoints[displayName].min)
    const propsBreakpoints = props.breakpoints ? props.breakpoints.map(min => min + 1) : []
    const breakpoints = [...propsBreakpoints, ...arrayContextBreakpoints.slice(propsBreakpoints.length)]
    const vw = context.viewport.width
    const currBreakpointPos = breakpoints.findIndex(min => min < vw)
    const columns = [...props.columns, ...[1, 1, 1].slice(props.columns.length)]
    const nbColumns = columns[currBreakpointPos]
    const gutters = [...props.gutters, ...[0, 0, 0].slice(props.gutters.length)]

    /* Wrapper style */
    const wrapperSidePaddings = gutters[currBreakpointPos] / 2
    const ownStyle = {
      // paddingLeft: `${wrapperSidePaddings}px`,
      // paddingRight: `${wrapperSidePaddings}px`
    }

    /* Inner style */
    const innerStyle = {
      marginLeft: props.noSideGutters ? `-${wrapperSidePaddings}px` : undefined,
      width: props.noSideGutters
        ? `calc(100% + ${wrapperSidePaddings * 2}px)`
        : `calc(100% - ${wrapperSidePaddings * 2}px)`,
    }

    /* Tiles stile */
    const tileSideMargins = gutters[currBreakpointPos] / 2
    const tileStyle = {
      width: `calc(100% / ${nbColumns})`,
      paddingLeft: `${tileSideMargins}px`,
      paddingRight: `${tileSideMargins}px`,
      paddingBottom: `${tileSideMargins * 2}px`
    }
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)
    passedProps.style = { ...ownStyle, ...props.style }

    /* Display component */
    return <div
      className={classes.join(' ')}
      {...passedProps}
      ref={n => this.$wrapper = n}>
      <div
        className={`${c}__inner`}
        style={innerStyle}>
        {props.children.map(child => <div
          className={`${c}__tile`}
          style={tileStyle}>
          {child}
        </div>)}
      </div>
    </div>
  }
}

/* * * * * Prop types * * * * */
MetroTiler.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
  gutters: PropTypes.arrayOf(PropTypes.number),
  noSideGutters: PropTypes.bool
}

MetroTiler.defaultProps = {
  columns: [3, 2, 1],
  gutters: [0, 0, 0]
}

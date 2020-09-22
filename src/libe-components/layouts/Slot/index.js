import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './style'

/*
 *   Slot component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Slot responsive slot, that can display, hide or resize
 *   itself according to screen size
 *
 *   PROPS
 *   width, offset
 *
 */

export default class Slot extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-slot'
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
      lgWidth: Array.isArray(props.width)
        ? props.width[0] ? parseFloat(props.width[0], 10) : 0
        : parseFloat(props.width, 10),
      mdWidth: Array.isArray(props.width)
        ? props.width[1] ? parseFloat(props.width[1], 10) : 0
        : parseFloat(props.width, 10),
      smWidth: Array.isArray(props.width)
        ? props.width[2] ? parseFloat(props.width[2], 10) : 0
        : parseFloat(props.width, 10),
      lgOffset: Array.isArray(props.offset)
        ? props.offset[0] ? parseFloat(props.offset[0], 10) : 0
        : parseFloat(props.offset, 10),
      mdOffset: Array.isArray(props.offset)
        ? props.offset[1] ? parseFloat(props.offset[1], 10) : 0
        : parseFloat(props.offset, 10),
      smOffset: Array.isArray(props.offset)
        ? props.offset[2] ? parseFloat(props.offset[2], 10) : 0
        : parseFloat(props.offset, 10)
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

    /* Inner logic */
    const interpretedProps = this.interpretProps()

    /* Display component */
    return <Wrapper className={classes.join(' ')}
      gridProps={props.gridProps}
      {...interpretedProps}>
      <div className={`${c}__inner`}>{props.children}</div>
    </Wrapper>
  }
}

/* * * * * Prop types * * * * */

Slot.propTypes = {
  width: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  offset: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number])
}

Slot.defaultProps = {
  width: 1,
  offset: 0
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import interpretJSX from './interpret-JSX'

/*
 *   JSX interpreter component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Renders a div containing any other libe-component or
 *   any valid HTML tag, being given a string describing
 *   in a JSX way the contents.
 *
 *   PROPS
 *   content
 *
 */

export default class JSXInterpreter extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-jsx-interpreter'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Inner logic */
    const interpreted = interpretJSX(props.content)

    /* Assign classes */
    const classes = [c]

    return <span className={classes.join(' ')}>
      {interpreted}
    </span>
  }
}

/* * * * * Prop types * * * * */

JSXInterpreter.propTypes = { content: PropTypes.string }
JSXInterpreter.defaultProps = {}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { statics_url as staticsUrl } from '../../../config.js'
import Svg from '../../primitives/Svg'

/*
 *   Quote component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Simple quote component
 *
 *   PROPS
 *   children, literary, small, big, huge, author, sideBar,
 *   decoration
 *
 */

export default class Quote extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-quote'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)
    if (props.author) classes.push(`${c}_with-author`)
    if (props.sideBar) classes.push(`${c}_with-side-bar`)
    if (props.decoration) classes.push(`${c}_with-decoration`)

    return <blockquote className={classes.join(' ')}>
      <div className={`${c}__content`}>
        <p className={`${c}__content-text`}>{props.children}</p>
        <div className={`${c}__decoration`}>
          <div className={`${c}__opening-quotation-mark`}><Svg src={`${staticsUrl}/assets/libe-opening-quotation-mark.svg`} /></div>
          <div className={`${c}__closing-quotation-mark`}><Svg src={`${staticsUrl}/assets/libe-closing-quotation-mark.svg`} /></div>
        </div>
      </div>
      <p className={`${c}__author`}>– {props.author}</p>
    </blockquote>
  }
}

/* * * * * Prop types * * * * */

Quote.propTypes = {
  small: PropTypes.bool,
  big: PropTypes.bool,
  huge: PropTypes.bool,
  literary: PropTypes.bool,
  author: PropTypes.string,
  sideBar: PropTypes.bool,
  decoration: PropTypes.bool
}
Quote.defaultProps = {}

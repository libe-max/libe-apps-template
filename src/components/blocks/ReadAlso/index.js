import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slug from '../../text-levels/Slug'
import Paragraph from '../../text-levels/Paragraph'

/*
 *   Read also component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   A block containing a link
 *
 *   PROPS
 *   title, url, small, big, huge
 *
 */

export default class ReadAlso extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-read-also'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    /* Display component */
    return <div className={classes.join(' ')}>
      <Slug noBg
        small={props.small}
        big={props.big}
        huge={props.huge}>
        À lire aussi
      </Slug>
      <Paragraph
        small={props.small}
        big={props.big}
        huge={props.huge}>
        <a href={props.url}>{props.title}</a>
      </Paragraph>
    </div>
  }
}

/* * * * * Prop types * * * * */

ReadAlso.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  small: PropTypes.bool,
  big: PropTypes.bool,
  huge: PropTypes.bool
}

ReadAlso.defaultProps = {
  title: 'Titre du lien',
  url: null,
  small: false,
  big: false,
  huge: false
}

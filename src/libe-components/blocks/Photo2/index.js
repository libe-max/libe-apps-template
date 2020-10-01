import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Annotation from '../../text-levels/Annotation'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Photo component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a photo with credits, and expands the image
 *   to fullscreen on click if required
 *
 *   PROPS
 *   src, hdSrc, description, credit, expandable, cover,
 *   contain, className
 *
 */

export default class Photo extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-photo-2'
    this.usedProps = ['src', 'hdSrc', 'description', 'credit', 'expandable', 'cover', 'contain', 'className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.cover) classes.push(`${c}_cover`)
    if (props.contain) classes.push(`${c}_contain`)
    
    /* Inner logic */
    const passedProps = removeObjectKeys(props, this.usedProps)
    
    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <img className={`${c}__image`} src={props.src} />
      <div className={`${c}__background-image`} style={{ backgroundImage: `url(${props.src})` }} />
      <div className={`${c}__meta`}>
        <span className={`${c}__description`}><Annotation>{props.description}</Annotation></span>
        <span className={`${c}__credit`}><Annotation>{props.credit}</Annotation></span>
      </div>
    </div>
  }
}

/* * * * * Prop types * * * * */
Photo.propTypes = {}
Photo.defaultProps = {}

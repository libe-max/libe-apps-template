import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Annotation from '../../text-levels/Annotation'

/*
 *   Photo component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a photo with credits, and expands the image
 *   to fullscreen on click if required
 *
 *   PROPS
 *   src, hdSrc, description, credit, expandable, className
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
    this.usedProps = ['src', 'hdSrc', 'description', 'credit', 'expandable', 'className']
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
    
    /* Inner logic */
    const passedProps = {}
    Object.keys(props).forEach(propName => {
      if (this.usedProps.indexOf(propName) !== -1) return
      passedProps[propName] = props[propName]
    })
    
    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <img className={`${c}__image`} src={props.src} />
      <span className={`${c}__description`}><Annotation>{props.description}</Annotation></span>
      <span className={`${c}__credit`}><Annotation>{props.credit}</Annotation></span>
    </div>
  }
}

/* * * * * Prop types * * * * */
Photo.propTypes = {}
Photo.defaultProps = {}

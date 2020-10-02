import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { statics_url as staticsUrl } from '../../../config'
import AppContext from '../../../context'
import Svg from '../../primitives/Svg'
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
 *   src, hdSrc, description, credit, expandable, width, height,
 *   cover, contain, position, attachment, className
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
    this.state = { id: uuid() }
    this.usedProps = [
      'src', 'hdSrc', 'description', 'credit', 'expandable', 'width',
      'height', 'cover', 'contain', 'position', 'attachment', 'className'
    ]
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { props, state, context } = this
    if (props.expandable) {
      const { add_expandable_media: addExpandableMedia } = context
      addExpandableMedia('photo', props, state.id)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidUpdate (prevProps) {
    const { props, state, context } = this
    if (prevProps.src === props.src
      && prevProps.expandable === props.expandable
      && prevProps.hdSrc === props.hdSrc) return
    if (props.expandable) {
      const { update_expandable_media: updateExpandableMedia } = context
      updateExpandableMedia('photo', props, state.id)
    } else {
      const { remove_expandable_media: removeExpandableMedia } = context
      removeExpandableMedia(state.id)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    const { state, context } = this
    const { remove_expandable_media: removeExpandableMedia } = context
    removeExpandableMedia(state.id)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE EXPAND CLICK
   *
   * * * * * * * * * * * * * * * * */
  handleExpandClick (e) {
    const { props, state, context } = this
    if (!props.expandable) return
    const { request_media_expansion: requestMediaExpansion } = context
    requestMediaExpansion(this.state.id)
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
    if (props.expandable) classes.push(`${c}_expandable`)
    
    /* Inner logic */
    const passedProps = removeObjectKeys(props, this.usedProps)
    const ownStyle = { width: props.width, height: props.height }
    passedProps.style = { ...ownStyle, ...props.style }
    const bgImageStyle = {
      backgroundImage: `url(${props.src})`,
      backgroundPosition: props.position,
      backgroundAttachment: props.attachment
    }
    
    /* Display component */
    return <div
      className={classes.join(' ')}
      onClick={this.handleExpandClick}
      {...passedProps}>
      <img className={`${c}__image`} src={props.src} />
      <div
        className={`${c}__background-image`}
        style={bgImageStyle} />
      <div className={`${c}__meta`}>
        <Annotation className={`${c}__description`}>{props.description}</Annotation>
        <Annotation className={`${c}__credit`}>{props.credit}</Annotation>
      </div>
      <button className={`${c}__expand-button`}>
        <Svg src={`${staticsUrl}/assets/expand-arrows-icon_40.svg`} />
      </button>
    </div>
  }
}

/* * * * * Prop types * * * * */
Photo.propTypes = {}
Photo.defaultProps = {}

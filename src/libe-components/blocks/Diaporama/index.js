import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { statics_url as staticsUrl } from '../../../config'
import Photo from '../Photo2'
import Svg from '../../primitives/Svg'
import AppContext from '../../../context'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Diaporama component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Simple diaporama to display medias
 *
 *   PROPS
 *   showThumbs, medias, active, onChange
 *
 */

export default class Diaporama extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-diaporama'
    this.state = { active: null }
    this.usedProps = ['showThumbs', 'medias', 'active', 'onChange']
    this.activateMedia = this.activateMedia.bind(this)
    this.centerMedia = this.centerMedia.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.activateNearestIfNecessary = this.activateNearestIfNecessary.bind(this)
    this.activateNearest = this.activateNearest.bind(this)
    this.getMediaCenterOffset = this.getMediaCenterOffset.bind(this)
    this.handlePrevButtonClick = this.handlePrevButtonClick.bind(this)
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * GET DERIVED STATE FROM PROPS
   *
   * * * * * * * * * * * * * * * * */
  static getDerivedStateFromProps (props, state) {
    return {
      ...state,
      active: props.active ? props.active : state.active
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidUpdate (prevProps, prevState) {
    this.centerMedia(this.state.active)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE MEDIA
   *
   * * * * * * * * * * * * * * * * */
  activateMedia (id) {
    const found = this.props.medias.find(media => media.id === id)
    if (!found) return
    this.setState(curr => ({ ...curr, active: id }))
    if (this.props.onChange) this.props.onChange(id)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET MEDIA CENTER OFFSET
   *
   * * * * * * * * * * * * * * * * */
  getMediaCenterOffset (id) {
    const found = this.props.medias.find(media => media.id === id)
    if (!id || !this.$wrapper || !found) return
    const $medias = this.$wrapper.querySelectorAll(`.${this.c}__media`)
    let offset = 0
    let stop = false
    $medias.forEach($media => {
      if (stop) return
      if (id !== $media.dataset.id) {
        const width = $media.offsetWidth
        const style = window.getComputedStyle ? window.getComputedStyle($media, null) : $media.currentStyle
        const marginLeft = parseInt(style.marginLeft) || 0
        const marginRight = parseInt(style.marginRight) || 0
        offset += width + marginLeft + marginRight
      } else {
        const parentWidth = this.$wrapper.offsetWidth
        const width = $media.offsetWidth
        const style = window.getComputedStyle ? window.getComputedStyle($media, null) : $media.currentStyle
        const marginLeft = parseInt(style.marginLeft) || 0
        const marginRight = parseInt(style.marginRight) || 0
        offset += marginLeft
        offset -= (parentWidth - width) / 2
        stop = true
      }
    })
    return offset
  }

  /* * * * * * * * * * * * * * * * *
   *
   * CENTER MEDIA
   *
   * * * * * * * * * * * * * * * * */
  centerMedia (id) {
    const found = this.props.medias.find(media => media.id === id)
    if (!id || !this.$wrapper || !found) return
    const offset = this.getMediaCenterOffset(id)
    this.$wrapper.scroll({ left: offset, behavior: 'smooth' })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE NEAREST IF NECESSARY
   *
   * * * * * * * * * * * * * * * * */
  activateNearestIfNecessary () {
    if (Date.now() - this.lastScrollEvent < 50) return
    this.activateNearest()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE NEAREST
   *
   * * * * * * * * * * * * * * * * */
  activateNearest () {
    if (!this.$wrapper) return
    const currentOffset = this.$wrapper.scrollLeft
    const mediasAndCenterOffset = this.props.medias.map(media => {
      const mediaCenterOffset = this.getMediaCenterOffset(media.id)
      const diffFromCurrentOffset = Math.abs(currentOffset - mediaCenterOffset)
      return {
        media,
        centerOffset: mediaCenterOffset,
        diffFromCurrentOffset
      }
    })
    const nearest = mediasAndCenterOffset.reduce((acc, curr) => {
      return curr.diffFromCurrentOffset < acc.diffFromCurrentOffset
        ? { id: curr.media.id, ...curr }
        : acc
    }, { id: this.state.active, centerOffset: Infinity, diffFromCurrentOffset: Infinity })
    this.activateMedia(nearest.id)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE SCROLL
   *
   * * * * * * * * * * * * * * * * */
  handleScroll (e) {
    this.lastScrollEvent = Date.now()
    window.clearTimeout(this.activateNearestIfNecessary)
    window.setTimeout(this.activateNearestIfNecessary, 50)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE TOUCH END
   *
   * * * * * * * * * * * * * * * * */
  handleTouchEnd (e) {
    this.activateNearest()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE PREV BUTTON CLICK
   *
   * * * * * * * * * * * * * * * * */
  handlePrevButtonClick (e) {
    const { props, state } = this
    const activeId = state.active
    const foundActivePos = props.medias.findIndex(media => media.id === activeId)
    if (foundActivePos === -1) return
    const newActivePos = (props.medias.length + foundActivePos - 1) % props.medias.length
    const newActive = props.medias[newActivePos]
    if (!newActive) return
    this.activateMedia(newActive.id)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE NEXT BUTTON CLICK
   *
   * * * * * * * * * * * * * * * * */
  handleNextButtonClick (e) {
    const { props, state } = this
    const activeId = state.active
    const foundActivePos = props.medias.findIndex(media => media.id === activeId)
    if (foundActivePos === -1) return
    const newActivePos = (props.medias.length + foundActivePos + 1) % props.medias.length
    const newActive = props.medias[newActivePos]
    if (!newActive) return
    this.activateMedia(newActive.id)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state, context } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    
    /* Inner logic */
    const passedProps = removeObjectKeys(props, this.usedProps)
    
    /* Display component */
    return <div
      ref={node => this.$wrapper = node}
      className={classes.join(' ')}
      onTouchEnd={this.handleTouchEnd}
      onScroll={this.handleScroll}
      {...passedProps}>{
        props.medias.map((media, i) => <div
          key={media.id}
          data-id={media.id}
          className={`${c}__media ${media.id === state.active ? `${c}__media_active` : null}`}
          onClick={e => this.activateMedia(media.id)}>{
          media.type === 'photo'
            ? <Photo
              contain
              src={media.props.hdSrc || media.props.src}
              description={media.props.description}
              credit={media.props.credit} />
            : ''
        }</div>)
      } 
      <button
        className={`${c}__prev-button`}
        onClick={this.handlePrevButtonClick}>
        <Svg src={`${staticsUrl}/assets/left-arrow-head-icon_40.svg`} />
      </button>
      <button
        className={`${c}__next-button`}
        onClick={this.handleNextButtonClick}>
        <Svg src={`${staticsUrl}/assets/right-arrow-head-icon_40.svg`} />
      </button>
    </div>
  }
}

/* * * * * Prop types * * * * */
Diaporama.propTypes = {}
Diaporama.defaultProps = {}

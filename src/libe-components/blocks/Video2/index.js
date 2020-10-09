import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuid } from 'uuid'
import { statics_url as staticsUrl } from '../../../config'
import AppContext from '../../../context'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Video2 component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Wrapper for Youtube/Dailymotion/Ina embeds, and local videos
 *
 *   PROPS
 *   url, type, width, height, className
 *
 */

export default class Video2 extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-video-2'
    this.state = { source: null, embed: null }
    this.usedProps = ['url', 'type', 'width', 'height', 'className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DERIVED STATE FROM PROPS
   *
   * * * * * * * * * * * * * * * * */
  static getDerivedStateFromProps (props, state) {
    const source = Video2.guessSource(props.url)
    const embed = Video2.buildEmbedUrlFromSource(props.url, source)
    const type = props.type || Video2.guessSourcetype(props.url)
    return { source, embed, type, url: props.url }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GUESS SOURCE
   *
   * * * * * * * * * * * * * * * * */
  static guessSource (url) {
    if (url.includes('youtube')) return 'youtube'
    else if (url.includes('dailymotion')) return 'dailymotion'
    else if (url.includes('ina.fr/video')) return 'ina'
    else return 'local'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GUESS SOURCE TYPE
   *
   * * * * * * * * * * * * * * * * */
  static guessSourcetype (url) {
    const ext = url.split('.').pop()
    if (ext.includes('mp4')) return 'video/mp4'
    if (ext.includes('webm')) return 'video/webm'
    if (ext.includes('ogg')) return 'video/ogg'
    if (ext.includes('flv')) return 'video/x-flv'
    if (ext.includes('m3u8')) return 'application/x-mpegURL'
    if (ext.includes('ts')) return 'video/MP2T'
    if (ext.includes('3gp')) return 'video/3gpp'
    if (ext.includes('mov')) return 'video/quicktime'
    if (ext.includes('avi')) return 'video/x-msvideo'
    if (ext.includes('wmv')) return 'video/x-ms-wmv'
    return 'video/mp4'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * BUILD EMBED URL FROM SOURCE
   *
   * * * * * * * * * * * * * * * * */
  static buildEmbedUrlFromSource (url, source) {
    if (source === 'youtube') return `https://youtube.com/embed/${url.split('&')[0].split('?v=')[1]}`
    else if (source === 'dailymotion') return `https://www.dailymotion.com/embed/video/${url.split('&')[0].split('/').pop()}`
    else if (source === 'ina') return `https://player.ina.fr/player/embed/${url.split('&')[0].split('/')[4]}/1/1b0bd203fbcd702f9bc9b10ac3d0fc21/wide/1`
    else if (source === 'local') return url
    else return null
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
    classes.push(`${c}_${state.source}`)
    
    /* Inner logic */
    const passedProps = removeObjectKeys(props, this.usedProps)
    const ownStyle = { width: props.width, height: props.height }
    passedProps.style = { ...ownStyle, ...props.style }
    
    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      {/* Local */}
      {state.source === 'local' && <video {...passedProps}>
        <source src={props.url} type={state.type} />
      </video>}

      {/* Embed */}
      {state.source !== 'local' && <iframe
        ref={node => this.$iframe = node}
        title={`${state.source} video embed`}
        src={state.embed}
        scrolling='no'
        allowFullScreen
        {...passedProps} />}
    </div>
  }
}

/* * * * * Prop types * * * * */
Video2.propTypes = {}
Video2.defaultProps = {}

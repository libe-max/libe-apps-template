import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Video2 component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Wrapper for Youtube / Dailymotion / Ina embeds, and local videos
 *
 *   PROPS
 *   src, type, width, height, className
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
    this.usedProps = ['src', 'type', 'width', 'height', 'className']
    this.guessSource = this.guessSource.bind(this)
    this.guessSourceType = this.guessSourceType.bind(this)
    this.buildEmbedUrlFromSource = this.buildEmbedUrlFromSource.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GUESS SOURCE
   *
   * * * * * * * * * * * * * * * * */
  guessSource (src) {
    if (src.includes('youtube')) return 'youtube'
    else if (src.includes('dailymotion')) return 'dailymotion'
    else if (src.includes('ina.fr/video')) return 'ina'
    else return 'local'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GUESS SOURCE TYPE
   *
   * * * * * * * * * * * * * * * * */
  guessSourceType (src) {
    const ext = src.split('.').pop()
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
  buildEmbedUrlFromSource (src, source) {
    if (source === 'youtube') return `https://youtube.com/embed/${src.split('&')[0].split('?v=')[1]}`
    else if (source === 'dailymotion') return `https://www.dailymotion.com/embed/video/${src.split('&')[0].split('/').pop()}`
    else if (source === 'ina') return `https://player.ina.fr/player/embed/${src.split('&')[0].split('/')[4]}/1/1b0bd203fbcd702f9bc9b10ac3d0fc21/wide/1`
    else if (source === 'local') return src
    else return null
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this
    
    /* Inner logic */
    const source = this.guessSource(props.src)
    const embed = this.buildEmbedUrlFromSource(props.src, source)
    const type = props.type || this.guessSourceType(props.src)
    const passedProps = removeObjectKeys(props, this.usedProps)
    const ownStyle = { width: props.width, height: props.height }
    passedProps.style = { ...ownStyle, ...props.style }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    classes.push(`${c}_${source}`)
    
    /* Display component */
    return <div className={classes.join(' ')}>
      {/* Local */}
      {source === 'local' && <video {...passedProps}>
        <source src={props.src} type={type} />
      </video>}
      {/* Embed */}
      {state.source !== 'local' && <iframe
        ref={node => this.$iframe = node}
        title={`${source} video embed`}
        src={embed}
        scrolling='no'
        allowFullScreen
        {...passedProps} />}
    </div>
  }
}

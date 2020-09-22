import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paragraph from '../../text-levels/Paragraph'

/*
 *   Video component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   A video embed from YouTube, Dailymotion or the INA
 *   website
 *
 *   PROPS
 *   src, ratio
 *
 */

export default class Video extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-video'
    this.guessOriginAndId = this.guessOriginAndId.bind(this)
    this.buildVideoEmbedUrl = this.buildVideoEmbedUrl.bind(this)
  }

  guessOriginAndId (src) {
    if (src.includes('youtube')) {
      return {
        origin: 'youtube',
        id: src.split('&')[0].split('?v=')[1]
      }
    }
    if (src.includes('dailymotion')) {
      return {
        origin: 'dailymotion',
        id: src.split('&')[0].split('/').pop()
      }
    }
    if (src.includes('ina.fr/video')) {
      return {
        origin: 'ina',
        id: this.props.src.split('&')[0].split('/').pop()
      }
    }
    if (src.includes('ina')) {
      return {
        origin: 'ina',
        id: null
      }
    }
    return {
      origin: 'file',
      id: null
    }
  }

  buildVideoEmbedUrl (origin, id) {
    switch (origin) {
      case 'youtube':
        return `https://youtube.com/embed/${id}`
      case 'dailymotion':
        return `https://www.dailymotion.com/embed/video/${id}`
      case 'ina':
        return `https://player.ina.fr/player/embed/${id}/1/1b0bd203fbcd702f9bc9b10ac3d0fc21/wide/1`
      default:
        return ''
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    const { origin, id } = this.guessOriginAndId(props.src)

    const unknown = !origin || (origin !== 'file' && !id)

    /* Assign classes */
    const classes = [c]
    if (unknown) classes.push(`${c}_unknown-origin`)
    else classes.push(`${c}_${origin}`)

    return <div
      className={classes.join(' ')}
      style={!unknown && origin !== 'file' ? { paddingTop: `${100 / props.ratio}%` } : {}}>
      {unknown && <Paragraph>Source inconnue</Paragraph>}
      {origin === 'file' && <video controls {...props} />}
      {!unknown && origin !== 'file' && (
        <iframe
          title={`${origin}-${id}`}
          src={this.buildVideoEmbedUrl(origin, id)}
          scrolling='no'
          allowFullScreen />
      )}
    </div>
  }
}

/* * * * * Prop types * * * * */

Video.propTypes = {
  src: PropTypes.string.isRequired,
  ratio: PropTypes.number
}

Video.defaultProps = {
  ratio: 1.78
}

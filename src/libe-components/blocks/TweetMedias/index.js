import React, { Component } from 'react'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
import Photo2 from '../Photo2'
import Video2 from '../Video2'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   TweetMedias component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays medias associated with a tweet
 *
 *   PROPS
 *   data, expandable
 *
 */

export default class TweetMedias extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-tweet-medias'
    this.usedProps = ['data', 'expandable', 'className']
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
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)
    
    /* Inner logic */
    const medias = props.data.map((media, i) => {
      const width = media.sizes.medium.w
      const height = media.sizes.medium.h
      const ratio = width / height
      const { type } = media
      const mediaMeta = type === 'photo'
        ? { url: media.media_url_https }
        : media.video_info.variants.find(info => info.content_type.match(/(video\/ogg)|(video\/mp4)|(video\/webm)/))
      const { url, contentType } = mediaMeta
      const displayRatio = props.data.length === 1 ? Math.max(ratio, 0.6) : props.data.length === 3 && i !== 2 ? 1 : 1.75
      const displayPercentWidth = props.data.length === 1 ? 100 : props.data.length === 3 && i === 2 ? 100 : 50
      const displayPercentHeight = displayPercentWidth / displayRatio
      const displayWidth = `${displayPercentWidth}%`
      const displayHeight = `${displayPercentHeight}%`
      return {
        ...media,
        width, height, ratio,
        type, url, contentType,
        display_width: displayWidth,
        display_height: displayHeight,
      }
    })

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>{
      medias.map((media, i) => <div
        key={media.id}
        className={`${c}__media`}
        style={{
          width: media.display_width,
          paddingTop: media.display_height }}>
          <div className={`${c}__media-inner`}>{
          media.type === 'photo'
            ? <Photo2
              cover
              src={media.url}
              hdSrc={media.ulr}
              expandable={props.expandable} />
            : media.type === 'video'
              ? <Video2
                controls
                url={media.url}
                type={media.contentType} />
              : <Video2
                loop
                autoPlay
                url={media.url}
                type={media.contentType} />
        }</div>
      </div>)
    }</div>
  }
}

/* * * * * Prop types * * * * */
TweetMedias.propTypes = {
  data: PropTypes.array
}

TweetMedias.defaultProps = {
  data: []
}

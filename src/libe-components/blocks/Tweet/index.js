import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { proxydata_url as proxydataUrl } from '../../../config.js'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import JSXInterpreter from '../../logic/JSXInterpreter'
import Paragraph from '../../text-levels/Paragraph'
import TweetMedias from '../TweetMedias'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Tweet component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Tweet embed component
 *
 *   PROPS
 *   data, url, urlsLength, expandableMedias, small, big, huge, literary, quoted
 *
 */

export default class Tweet extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-tweet'
    this.usedProps = [
      'data', 'url', 'urlsLength', 'expandableMedias', 'small',
      'big', 'huge', 'literary', 'quoted', 'className'
    ]
    this.state = {
      loading: true,
      error: null,
      tweet_data: null
    }
    this.replaceEntitiesInText = this.replaceEntitiesInText.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { props } = this
    if (props.data) return this.setState({ loading: false, tweet_data: props.data })
    const tweetUrl = props.url.split('?')[0]
    const splUrl = tweetUrl.split('/').filter(e => e)
    const tweetId = splUrl.slice(-1)
    if (splUrl[0] !== 'https:' ||
      splUrl[1] !== 'twitter.com' ||
      splUrl[3] !== 'status' ||
      !splUrl[4].match(/^[0-9]+$/)) {
      console.warn(`Invalid Twitter URL: ${props.url}`)
      this.setState({
        loading: false,
        error: 'Invalid Twitter URL'
      })
    } else {
      window.fetch(`${proxydataUrl}/proxy/twitter/status/${tweetId}`)
        .then(r => r.json())
        .then(res => res.err
          ? this.setState({ loading: false, error: res.err })
          : this.setState({ loading: false, error: null, tweet_data: res.data })
        ).catch(err => this.setState({ loading: false, error: err, tweet_data: null }))
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * REPLACE ENTITIES IN TEXT
   *
   * * * * * * * * * * * * * * * * */
  replaceEntitiesInText (data) {
    const text = data ? data.full_text : ''
    const entities = data ? data.entities : { hashtags: [], urls: [], symbols: [], user_mentions: [] }
    const hasMedia = data && data.extended_entities
    const medias = hasMedia ? data.extended_entities.media : []
    const quote = data ? data.quoted_status : null

    const textReplacements = []
    entities.hashtags.forEach(hashtag => {
      const hashtagMatch = _.toArray(text).slice(hashtag.indices[0], hashtag.indices[1]).join('')
      const transformedMention = `<a href="https://twitter.com/hashtag/${hashtag.text}" ref="noopener noreferrer" target="_blank">${hashtagMatch}</a>`
      textReplacements.push({
        before: hashtagMatch,
        after: transformedMention,
        init_indices: hashtag.indices.map(e => e),
        type: 'hashtags'
      })
    })
    entities.urls.forEach(url => {
      const urlMatch = _.toArray(text).slice(url.indices[0], url.indices[1]).join('')
      const expUrl = url.expanded_url
      const displayExpUrl = expUrl.length > (this.props.urlsLength || 37) ? `${expUrl.slice(0, (this.props.urlsLength || 37))}...` : expUrl
      const quotedScreenName = quote ? quote.user.screen_name : undefined
      const quotedId = quote ? quote.id_str : undefined
      const quotedUrl = `https://twitter.com/${quotedScreenName}/status/${quotedId}`
      const transformedMention = expUrl !== quotedUrl ? `<a href="${expUrl}" ref="noopener noreferrer" target="_blank">${displayExpUrl}</a>` : ''
      textReplacements.push({
        before: urlMatch,
        after: transformedMention,
        init_indices: url.indices,
        type: 'urls'
      })
    })
    entities.symbols.forEach(symbol => {
      const symbolMatch = _.toArray(text).slice(symbol.indices[0], symbol.indices[1]).join('')
      const transformedMention = symbolMatch
      textReplacements.push({
        before: symbolMatch,
        after: transformedMention,
        init_indices: symbol.indices,
        type: 'symbols'
      })
    })
    entities.user_mentions.forEach(userMention => {
      const mentionMatch = _.toArray(text).slice(userMention.indices[0], userMention.indices[1]).join('')
      const transformedMention = `<a href="https://twitter.com/${userMention.screen_name}" ref="noopener noreferrer" target="_blank">${mentionMatch}</a>`
      textReplacements.push({
        before: mentionMatch,
        after: transformedMention,
        init_indices: userMention.indices,
        type: 'mentions'
      })
    })
    if (entities.media) entities.media.forEach(media => {
      const mediaMatch = _.toArray(text).slice(media.indices[0], media.indices[1]).join('')
      const transformedMedia = ''
      textReplacements.push({
        before: mediaMatch,
        after: transformedMedia,
        init_indices: media.indices,
        type: 'medias'
      })
    })
    const sortedTextReplacements = textReplacements.sort((a, b) => a.init_indices[0] - b.init_indices[0])
    sortedTextReplacements.forEach((replacement, i) => {
      const addedChars = replacement.after.length - replacement.before.length
      if (i === 0) replacement.after_replacement_offset = 0
      sortedTextReplacements.slice(i + 1).forEach(nextReplacement => {
        const currentOffset = nextReplacement.after_replacement_offset
        nextReplacement.after_replacement_offset = (currentOffset || 0) + addedChars
      })
    })
    const finalReplacementsMap = sortedTextReplacements.map(replacement => ({
      ...replacement,
      computed_indices: [
        replacement.init_indices[0] + replacement.after_replacement_offset,
        replacement.init_indices[1] + replacement.after_replacement_offset
      ]
    }))
    return finalReplacementsMap.reduce((acc, replacement) => {
      const textBefore = _.toArray(acc).slice(0, replacement.computed_indices[0]).join('')
      const textAfter = _.toArray(acc).slice(replacement.computed_indices[1]).join('')
      return textBefore + replacement.after + textAfter
    }, text).replace(/\n/igm, '<br />')
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Inner logic */
    const tweetData = state.tweet_data
    const tweetUrl = tweetData ? `https://twitter.com/${tweetData.user.screen_name}/status/${tweetData.id_str}` : ''
    const userName = tweetData ? tweetData.user.name : ''
    moment.locale('en')
    const momentTime = state.tweet_data ? moment(state.tweet_data.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY') : moment(0, 'x')
    const time = momentTime.locale('fr').format('D MMMM YYYY, à HH:mm')
    const hasMedia = tweetData && tweetData.extended_entities
    const tweetMedias = hasMedia ? tweetData.extended_entities.media : []
    const textWithEntities = this.replaceEntitiesInText(tweetData)

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (state.loading) classes.push(`${c}_loading`)
    if (state.error) classes.push(`${c}_error`)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)
    if (props.quoted) classes.push(`${c}_quoted`)
    if (!state.loading && !state.error && !textWithEntities) classes.push(`${c}_no-content`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display loading state */
    if (state.loading) {
      return <div className={classes.join(' ')} {...passedProps}>
        <div className={`${c}__content`}>
          <Loader />
        </div>
      </div>
    }

    /* Display error state */
    if (state.error) {
      return <div className={classes.join(' ')} {...passedProps}>
        <div className={`${c}__content`}>
          <LoadingError small={props.small}
            big={props.big}
            huge={props.huge}
            literary={props.literary}>
            Impossible de charger le tweet.&nbsp;
            <a href={tweetUrl} rel='noopener noreferrer' target='_blank'>Voir sur Twitter</a>
          </LoadingError>
        </div>
      </div>
    }

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <TweetMedias expandable={props.expandableMedias} data={tweetMedias.length === 4 ? tweetMedias.slice(1) : tweetMedias} />
      <div className={`${c}__content`}>
        <Paragraph small={props.small}
          big={props.big}
          huge={props.huge}
          literary={props.literary}>
          <JSXInterpreter content={textWithEntities} />
        </Paragraph>
        {tweetData.quoted_status
          && !props.quoted
          ? <Tweet
            small={props.small}
            big={props.big}
            huge={props.huge}
            literary={props.literary}
            quoted={true}
            data={tweetData.quoted_status} />
          : null
        }
      </div>
      <div className={`${c}__meta`}>
        <span className={`${c}__author-profile-picture`}>
          <img src={tweetData.user.profile_image_url_https} />
        </span>
        <span className={`${c}__author-name`}>
          <Paragraph small={(!props.big && !props.huge)}
            big={props.huge}
            literary={props.literary}>
            {userName}
          </Paragraph>
        </span>
        <span className={`${c}__date`}>
          <Paragraph small={(!props.big && !props.huge)}
            big={props.huge}
            literary={props.literary}>
            <a href={tweetUrl}
              rel='noopener noreferrer'
              target='_blank'>
              {time}
            </a>
          </Paragraph>
        </span>
      </div>
    </div>
  }
}

/* * * * * Prop types * * * * */
Tweet.propTypes = {
  url: PropTypes.string,
  quoted: PropTypes.bool,
  expandableMedias: PropTypes.bool
}

Tweet.defaultProps = {
  url: '20',
  quoted: false,
  expandableMedias: false
}

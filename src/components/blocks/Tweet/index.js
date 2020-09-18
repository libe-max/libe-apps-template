import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { proxydata_url as proxydataUrl } from '../../../config.js'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import JSXInterpreter from '../../logic/JSXInterpreter'
import Paragraph from '../../text-levels/Paragraph'
import moment from 'moment'

/*
 *   Tweet component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Tweet embed component
 *
 *   PROPS
 *   url, small, big, huge, literary
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
    this.state = {
      loading: true,
      error: null,
      tweet_data: null
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { props } = this
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
      window.fetch(`${proxydataUrl}/twitter/status/${tweetId}`)
        .then(r => r.json())
        .then(res => res.err
          ? this.setState({ loading: false, error: res.err })
          : this.setState({ loading: false, error: null, tweet_data: res.data })
        ).catch(err => this.setState({ loading: false, error: err, tweet_data: null }))
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Inner logic */
    const tweetUrl = props.url.split('?')[0]
    const hasImg = state.tweet_data &&
      state.tweet_data.entities.media &&
      state.tweet_data.entities.media.length
    const imgUrl = hasImg ? state.tweet_data.entities.media[0].media_url_https : ''

    /* Assign classes */
    const classes = [c]
    if (state.loading) classes.push(`${c}_loading`)
    if (state.error) classes.push(`${c}_error`)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (props.literary) classes.push(`${c}_literary`)
    if (hasImg) classes.push(`${c}_with-img`)

    /* Inner logic */
    const textWithoutLinks = state.tweet_data ? state.tweet_data.full_text.replace(/\n/g, '<br />') : ''
    const text = textWithoutLinks.replace(/[^\s]+\.[^\s]+/g, match => `<a href="${match}" ref="noopener noreferrer" target="_blank">${match}</a>`)
    const user = state.tweet_data ? state.tweet_data.user.name : ''
    moment.locale('en')
    const momentTime = state.tweet_data ? moment(state.tweet_data.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY') : moment(0, 'x')
    const time = momentTime.locale('fr').format('D MMMM YYYY, à HH:mm')

    /* Display component */
    if (state.loading) {
      // Loading
      return <div className={classes.join(' ')}>
        <div className={`${c}__content`}>
          <Loader />
        </div>
      </div>
    } else if (state.error) {
      // Error
      return <div className={classes.join(' ')}>
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
    } else {
      // Loaded
      return <div className={classes.join(' ')}>
        <div className={`${c}__image`} style={{ backgroundImage: `url(${imgUrl})` }}>
          <img src={imgUrl} alt='Média associé au tweet' />
        </div>
        <div className={`${c}__content`}>
          <Paragraph small={props.small}
            big={props.big}
            huge={props.huge}
            literary={props.literary}>
            <JSXInterpreter content={text} />
          </Paragraph>
        </div>
        <div className={`${c}__meta`}>
          <span className={`${c}__author`}>
            <Paragraph small={(!props.big && !props.huge)}
              big={props.huge}
              literary={props.literary}>
              {user}
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
}

/* * * * * Prop types * * * * */
Tweet.propTypes = {
  url: PropTypes.string
}

Tweet.defaultProps = {
  url: '20'
}

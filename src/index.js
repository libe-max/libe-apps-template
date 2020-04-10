import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import * as serviceWorker from './serviceWorker'
import App from './App'
import config from './config'
import 'whatwg-fetch'

class AppWrapper extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.getElementsHeight = this.getElementsHeight.bind(this)
    if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
    window.LBLB_GLOBAL.rem = 16
    window.LBLB_GLOBAL.breakpoints = {
      lg: { min: 1 + 63 * window.LBLB_GLOBAL.rem, max: Infinity },
      md: { min: 1 + 40 * window.LBLB_GLOBAL.rem, max: 63 * window.LBLB_GLOBAL.rem },
      sm: { min: 0, max: 40 * window.LBLB_GLOBAL.rem }
    }
    Object.defineProperty(window.LBLB_GLOBAL, 'current_display', {
      get: function () {
        return Object.keys(this.breakpoints).find(name => {
          return this.breakpoints[name].min <= this.client_width &&
            this.breakpoints[name].max >= this.client_width
        })
      }
    })
    window.setInterval(this.getElementsHeight, 250)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    window.clearInterval(this.getElementsHeight)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    if (config.show_header) {
      const headerScript = document.createElement('script')
      headerScript.setAttribute('type', 'text/javascript')
      headerScript.setAttribute('src', 'https://www.liberation.fr/menu/script.js')
      document.body.appendChild(headerScript)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET HEADER HEIGHT
   *
   * * * * * * * * * * * * * * * * */
  getElementsHeight () {
    const $nav = document.querySelector('.header-fix-nav')
    const $body = document.querySelector('body')
    const pNavHeight = window.LBLB_GLOBAL.nav_height
    const pBodyPaddingTop = window.LBLB_GLOBAL.body_padding_top
    const pClientWidth = window.LBLB_GLOBAL.client_width
    const pClientHeight = window.LBLB_GLOBAL.client_height
    const navHeight = $nav ? $nav.offsetHeight : 0
    const bodyPaddingTop = $body ? parseFloat(window.getComputedStyle($body)['padding-top'].slice(0, -2)) : 0
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight
    const pCurrentDisplay = window.LBLB_GLOBAL.current_display
    window.LBLB_GLOBAL.nav_height = navHeight
    window.LBLB_GLOBAL.body_padding_top = bodyPaddingTop
    window.LBLB_GLOBAL.client_width = clientWidth
    window.LBLB_GLOBAL.client_height = clientHeight
    if (pNavHeight !== navHeight ||
      pBodyPaddingTop !== bodyPaddingTop ||
      pClientWidth !== clientWidth ||
      pClientHeight !== clientHeight) {
      window.dispatchEvent(new CustomEvent('lblb-client-dimensions-change'))
    }
    if (pCurrentDisplay !== window.LBLB_GLOBAL.current_display) {
      window.dispatchEvent(new CustomEvent('lblb-client-display-change'))
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props } = this
    const { meta, statics_url, stylesheet } = props
    const { title, url, description, author, image } = meta
    return <div id='libe-labo-app-wrapper'>
      <Helmet>
        <title>Libération.fr – {title}</title>
        <link rel='canonical' href={url} />
        <meta name='author' content={author} />
        <meta name='description' content={description} />
        <meta property='og:url' content={url} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta name='twitter:url' content={url} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        {/* Libé styles */}
        <link rel='stylesheet' href={`${statics_url}/styles/liberation.css`} />
        {/* Libe Labo styles */}
        <link rel='stylesheet' href={`${statics_url}/lib/normalize-8.0.0.css`} />
        <link rel='stylesheet' href={`${statics_url}/styles/fonts.css`} />
        <link rel='stylesheet' href={`${statics_url}/styles/font-classes.css`} />
        <link rel='stylesheet' href={`${statics_url}/styles/components.css`} />
        <link rel='stylesheet' href={`${statics_url}/styles/apps.css`} />
        {/* Leaflet styles */}
        <link rel='stylesheet' href={`${statics_url}/lib/leaflet-1.4.0/leaflet.css`} />
        {/* This app styles */}
        <link rel='stylesheet' href={`${statics_url}/styles/apps/${stylesheet}`} />
        <link rel='stylesheet' href='./custom.css' />
      </Helmet>
      <App {...props} />
    </div>
  }
}

ReactDOM.render(
  <AppWrapper {...config} />,
  document.getElementById('libe-labo-app-root')
)

serviceWorker.unregister()

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import App from './App'
import config from './config'
import 'whatwg-fetch'
import AppContext from './context'

class AppWrapper extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.state = {
      rem: 16,
      width: window.innerWidth,
      height: window.innerHeight,
      display: 'sm',
      nav_height: 0,
      body_padding_top: 0
    }
    this.storeViewportDimentions = this.storeViewportDimentions.bind(this)
    window.addEventListener('resize', this.storeViewportDimentions)
    window.setInterval(this.storeViewportDimentions, 250)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * STORE VIEWPORT DIMENSIONS
   *
   * * * * * * * * * * * * * * * * */
  storeViewportDimentions () {
    this.setState(curr => {
      const $nav = document.querySelector('.header-fix-nav')
      const $body = document.querySelector('body')
      const navHeight = $nav ? $nav.offsetHeight : 0
      const bodyPaddingTop = $body ? parseFloat(window.getComputedStyle($body)['padding-top'].slice(0, -2)) : 0
      const width = window.innerWidth
      const height = window.innerHeight
      const breakpoints = {
        lg: { min: 1 + 63 * curr.rem, max: Infinity },
        md: { min: 1 + 40 * curr.rem, max: 63 * curr.rem },
        sm: { min: 0, max: 40 * curr.rem }
      }
      const display = Object.keys(breakpoints).find(name => {
        const { min, max } = breakpoints[name]
        return min <= width && max >= width
      })
      const returned = {
        width,
        height,
        display,
        nav_height: navHeight,
        body_padding_top: bodyPaddingTop
      }
      Object.keys(returned).forEach(key => {
        const ret = returned[key]
        const cur = curr[key]
        if (ret === cur) delete returned[key]
      })
      if (!Object.keys(returned).length) return null
      return { ...returned }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.storeViewportDimentions()
    if (config.show_header) {
      const headerScript = document.createElement('script')
      headerScript.setAttribute('type', 'text/javascript')
      headerScript.setAttribute('src', 'https://www.liberation.fr/menu/script.js')
      document.body.appendChild(headerScript)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    window.clearInterval(this.storeViewportDimentions)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state } = this
    const { meta, statics_url: staticsUrl } = props
    const { title, url, description, author, image } = meta
    const passedContext = { viewport: state }
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
        {/* Libé Labo logger */}
        <script type='text/javascript' src={`${staticsUrl}/scripts/logger.js`} />
        {/* Libé styles */}
        <link rel='stylesheet' href={`${staticsUrl}/styles/liberation.css`} />
        {/* Libe Labo styles */}
        <link rel='stylesheet' href={`${staticsUrl}/lib/normalize-8.0.0.css`} />
        <link rel='stylesheet' href={`${staticsUrl}/styles/fonts.css`} />
        <link rel='stylesheet' href={`${staticsUrl}/styles/font-classes.css`} />
        <link rel='stylesheet' href={`${staticsUrl}/styles/components.css`} />
        <link rel='stylesheet' href={`${staticsUrl}/styles/apps.css`} />
        {/* Leaflet styles */}
        <link rel='stylesheet' href={`${staticsUrl}/lib/leaflet-1.4.0/leaflet.css`} />
        {/* This app styles */}
        <link rel='stylesheet' href='./custom.css' />
      </Helmet>
        <AppContext.Provider value={passedContext}>
          <App {...props} />
        </AppContext.Provider>
    </div>
  }
}

window.onload = () => ReactDOM.render(
  <AppWrapper {...config} />,
  document.getElementById('libe-labo-app-root')
)

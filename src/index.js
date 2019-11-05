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
    this.getHeaderHeight = this.getHeaderHeight.bind(this)
    window.setInterval(this.getHeaderHeight, 500)
    window.onResize = this.getHeaderHeight
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    window.clearInterval(this.getHeaderHeight)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { xiti_id } = this.props.meta
    const headerScript = document.createElement('script')
    const chartbeat = document.createElement('script')
    const googleAnalytics = document.createElement('script')
    const xiti = document.createElement('script')
    const xtCore = document.createElement('script')
    headerScript.setAttribute('type', 'text/javascript')
    headerScript.setAttribute('src', 'https://www.liberation.fr/menu/script.js')
    chartbeat.innerHTML = `
    var _sf_async_config={};
    _sf_async_config.uid = 43601;
    _sf_async_config.domain = 'liberation.fr';
    _sf_async_config.useCanonical = true;
    _sf_async_config.sections = "Static";
    _sf_async_config.authors = "Static";
    (function(){
      function loadChartbeat() {
        window._sf_endpt=(new Date()).getTime();
        var e = document.createElement('script');
        e.setAttribute('language', 'javascript');
        e.setAttribute('type', 'text/javascript');
        e.setAttribute('src', 'https://static.chartbeat.com/' + 'js/chartbeat.js');
        document.body.appendChild(e);
      }
      var oldonload = window.onload;
      window.onload = (typeof window.onload != 'function') ?
      loadChartbeat : function() { oldonload(); loadChartbeat(); };
    })();`
    googleAnalytics.innerHTML = `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
     })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
     ga('create', 'UA-41822557-1', 'liberation.fr');
     ga('create', 'UA-116918263-1', 'auto', 'SixPlus');
     ga('send', 'pageview');
     ga('SixPlus.send', 'pageview');`
    xiti.innerHTML = `
    xtnv = document;
    xtsd = "https://logliberation";
    xtsite = "507510";
    xtn2 = "48";
    xtpage = "LibeLabo::${xiti_id}";
    xtdi = "";
    xt_pagetype = "";
    xt_multc = "&x1=0&x2=43&x3=&x4=&x5=&x6=7&x7=";
    xt_an = "";
    xt_ac = "";
    if (window.xtparam==null) { window.xtparam = ''; }
    window.xtparam += "&ptype="+xt_pagetype+"&ac="+xt_ac+"&an="+xt_an+xt_multc;`
    xtCore.setAttribute('type', 'text/javascript')
    xtCore.setAttribute('src', 'https://statics.liberation.fr/bloom/theme/js/xtcore.js')
    if (config.show_header) document.body.appendChild(headerScript)
    if (process.env.NODE_ENV === 'production') {
      document.body.appendChild(chartbeat)
      document.body.appendChild(googleAnalytics)
      document.body.appendChild(xiti)
      document.body.appendChild(xtCore)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET HEADER HEIGHT
   *
   * * * * * * * * * * * * * * * * */
  getHeaderHeight () {
    const $nav = document.querySelector('nav.main-nav')
    const $body = document.querySelector('body')
    if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
    const pNavHeight = window.LBLB_GLOBAL.nav_height
    const pBodyPaddingTop = window.LBLB_GLOBAL.body_padding_top
    const navHeight = $nav ? $nav.offsetHeight : 0
    const bodyPaddingTop = $body ? parseFloat(window.getComputedStyle($body)['padding-top'].slice(0, -2)) : 0
    window.LBLB_GLOBAL.nav_height = navHeight
    window.LBLB_GLOBAL.body_padding_top = bodyPaddingTop
    if (pNavHeight !== navHeight ||
      pBodyPaddingTop !== bodyPaddingTop) {
      const event = new CustomEvent('lblb-header-height-change')
      window.dispatchEvent(event)
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
        <link rel="stylesheet" href={`${statics_url}/styles/liberation.css`} />
        {/* Libe Labo styles */}
        <link rel="stylesheet" href={`${statics_url}/lib/normalize-8.0.0.css`} />
        <link rel="stylesheet" href={`${statics_url}/styles/fonts.css`} />
        <link rel="stylesheet" href={`${statics_url}/styles/font-classes.css`} />
        <link rel="stylesheet" href={`${statics_url}/styles/components.css`} />
        <link rel="stylesheet" href={`${statics_url}/styles/apps.css`} />
        {/* Leaflet styles */}
        <link rel="stylesheet" href={`${statics_url}/lib/leaflet-1.4.0/leaflet.css`} />
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

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import * as serviceWorker from './serviceWorker'
import config from './config'
import 'whatwg-fetch'

const App = props => <div>
  Replace this component with your app
</div>

class AppWrapper extends Component {
  render () {
    const { props } = this
    const { meta, statics_url, stylesheet } = props
    const { title, url, description, author, image } = meta
    const stylesheetUrl = `${statics_url}/styles/apps/${stylesheet}`
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
        <link rel='stylesheet' href={stylesheetUrl} />
      </Helmet>
      <App {...props} />
    </div>
  }

  componentDidMount () {
    const { xiti_id } = this.props.meta
    const chartbeat = document.createElement('script')
    const googleAnalytics = document.createElement('script')
    const xiti = document.createElement('script')
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
    xtsite = "381060";
    xtn2 = "48";
    xtpage = "Static::Data::${xiti_id}";
    xtdi = "";
    xt_pagetype = "";
    xt_multc = "&x1=0&x2=43&x3=&x4=&x5=&x6=7&x7=";
    xt_an = "";
    xt_ac = "";
    if (window.xtparam==null) { window.xtparam = ''; }
    window.xtparam += "&ptype="+xt_pagetype+"&ac="+xt_ac+"&an="+xt_an+xt_multc;`
    if (process.env.NODE_ENV === 'production') {
      document.body.appendChild(chartbeat)
      document.body.appendChild(googleAnalytics)
      document.body.appendChild(xiti)
    }
  }
}

ReactDOM.render(
  <AppWrapper {...config} />,
  document.getElementById('libe-labo-app-root')
)

serviceWorker.unregister()

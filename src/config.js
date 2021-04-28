const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'
const showHeader = false
const staticsUrl = process.env.NODE_ENV === 'production' ? `${currentProtocol}//${currentHostname}/apps/static` : `${currentProtocol}//${currentHostname}:3003`
const proxydataUrl = process.env.NODE_ENV === 'production' ? 'https://proxydata.liberation.fr' : 'http://localhost:3004'
const spreadsheetId = '1MCIf6Icv0Z4Tn70Sog_cWzI6dG9ytFzANKly8eNs7KI'
const meta = {
  author: 'Libé Labo',
  title: 'Libération - ',
  url: 'https://www.liberation.fr/apps/2021/05/vaccination/bar-charts',
  description: '',
  image: '',
  slug: 'vaccins-CN',
  tweet: '',
  published_on: '01/01/2020 12:00',
  updated_on: null,
  authors: [{
    name: 'Libé Labo',
    role: 'Production',
    link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
  }]
}
const initRem = 16
const initNavHeight = 0
const initBodyPaddingTop = 0
const initWidth = typeof window !== 'undefined' ? window.innerWidth : 1440
const initHeight = typeof window !== 'undefined' ? window.innerHeight : 900
const initBreakpoints = {
  lg: { min: 1 + 63 * initRem, max: Infinity },
  md: { min: 1 + 40 * initRem, max: 63 * initRem },
  sm: { min: 0, max: 40 * initRem }
}
const initDisplayName = Object.keys(initBreakpoints).find(name => {
  const { min, max } = initBreakpoints[name]
  return min <= initWidth && max >= initWidth
})

const initViewport = {
  rem: initRem,
  nav_height: initNavHeight,
  body_padding_top: initBodyPaddingTop,
  width: initWidth,
  height: initHeight,
  display_name: initDisplayName,
  breakpoints: initBreakpoints
}

module.exports = {
  show_header: showHeader,
  statics_url: staticsUrl,
  proxydata_url: proxydataUrl,
  spreadsheet_id: spreadsheetId,
  meta: meta,
  viewport: initViewport
}

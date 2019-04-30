module.exports = {
  meta: {
    author: '',
    title: '',
    url: '',
    description: '',
    image: '',
    xiti_id: 'test'
  },
  tracking: {
    active: false,
    format: 'libe-apps-template',
    article: 'libe-apps-template'
  },
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/statics'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'http://localhost:3004/api'
    : 'https://libe-labo.site/api',
  stylesheet: 'libe-apps-template.css' // The name of the css file hosted at ${statics_url}/styles/apps/
}

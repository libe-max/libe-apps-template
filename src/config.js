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
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : 'http://localhost:3004/api',
  stylesheet: 'libe-apps-template.css' // The name of the css file hosted at ${statics_url}/styles/apps/
}

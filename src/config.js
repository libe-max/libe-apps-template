const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Libération - ',
    url: '',
    description: '',
    image: '',
    xiti_id: 'test',
    tweet: '',
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  stylesheet: 'libe-apps-template.css', // The name of the css file hosted at ${statics_url}/styles/apps/
  spreadsheet: undefined // The spreadsheet providing data to the app
}

module.exports = config

const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Libération - ',
    url: '',
    description: '',
    image: '',
    slug: 'test',
    tweet: '',
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  proxydata_url: process.env.NODE_ENV === 'production'
    ? 'https://proxydata.liberation.fr'
    : 'http://localhost:3004',
  spreadsheet_id: '1zucBQeRZ_SkPx13Yz5E1-Qpt1ayNWRlKPNVdAOkbZHY' // The spreadsheet providing data to the app
}

module.exports = config

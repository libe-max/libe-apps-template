const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production' ? 'https://www.liberation.fr/apps/static' : `${currentProtocol}//${currentHostname}:3003`,
  proxydata_url: process.env.NODE_ENV === 'production' ? 'https://proxydata.liberation.fr' : 'http://localhost:3004',
  spreadsheet_id: undefined,
  meta: {
    author: 'Libé Labo',
    title: 'Libération - ',
    url: '',
    description: '',
    image: '',
    slug: 'test',
    tweet: '',
    published_on: '01/01/2020 12:00',
    updated_on: null,
    authors: [{
      name: 'Libé Labo',
      role: 'Production',
      link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
    }]
  }
}

module.exports = config

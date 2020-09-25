const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Covid-19 - 1 million de morts',
    url: 'https://www.liberation.fr/apps/2020/09/covid-19-1M',
    description: '',
    image: '',
    slug: 'covid-19-1M',
    tweet: '',
    published_on: '01/01/2020 12:00',
    updated_on: null,
    authors: [{
      name: 'Libé Labo',
      role: 'Production',
      link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
    }]
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  proxydata_url: process.env.NODE_ENV === 'production'
    ? 'https://proxydata.liberation.fr'
    : 'http://localhost:3004',
  spreadsheet_id: undefined
}

module.exports = config

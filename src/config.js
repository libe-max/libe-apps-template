const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Covid-19 - 1 million de morts',
    url: 'https://www.liberation.fr/apps/2020/09/1M-covid-19',
    description: 'Dix mois après la naissance de la pandémie en Chine, le cap du million de morts officiellement dus au Covid-19 dans le monde a été franchi. Cette visualisation, où chaque point représente dix décès, montre comment, mois après mois, le virus s\'est déplacé sur la planète, même si douze pays – ici isolés – concentrent les trois-quarts des morts.',
    image: 'https://www.liberation.fr/apps/2020/09/1M-covid-19/social.jpg',
    slug: 'covid-19-1M',
    tweet: 'Dix mois après la naissance de la pandémie en Chine, le cap du million de morts officiellement dus au Covid-19 dans le monde a été franchi.',
    published_on: null,
    updated_on: null,
    authors: [{
      name: 'Clara Dealberto',
      role: 'Production',
      link: 'https://www.liberation.fr/auteur/18438-clara-dealberto'
    }, {
      name: 'Julien Guillot',
      role: 'Production',
      link: 'https://www.liberation.fr/auteur/15107-julien-guillot'
    }, {
      name: 'Maxime Fabas',
      role: 'Production',
      link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
    }, {
      name: 'Baptiste Bouthier',
      role: 'Texte',
      link: 'https://www.liberation.fr/auteur/12359-baptiste-bouthier'
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

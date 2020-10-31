const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production' ? 'https://www.liberation.fr/apps/static' : `${currentProtocol}//${currentHostname}:3003`,
  proxydata_url: process.env.NODE_ENV === 'production' ? 'https://proxydata.liberation.fr' : 'http://localhost:3004',
  spreadsheet_id: '1sct6sv0qeqM3LBukPoLcQ76btC1kKMBlWktSY0wvtss',
  meta: {
    author: 'Libé Labo, Baptiste Bouthier, Clara Dealberto, Maxime Fabas',
    title: 'Comment les Etats-Unis votent depuis 30 ans',
    url: 'https://www.liberation.fr/apps/2020/10/elections-us-2020',
    description: 'Il y a les fidèles à un seul parti, et ceux qui changent d’avis tous les quatre ans. Quels sont ces Etats pivots, plus incertains que les autres ? Le point sur l’historique du vote par Etat depuis 1988.',
    image: 'https://www.liberation.fr/apps/2020/10/elections-us-2020/social.jpg',
    slug: 'elections-us-2020',
    tweet: '',
    published_on: null,
    updated_on: null,
    authors: [{
      name: 'Baptiste Bouthier',
      role: 'Réalisation',
      link: 'https://www.liberation.fr/auteur/12359-baptiste-bouthier'
    }, {
      name: 'Clara Dealberto',
      role: 'Réalisation',
      link: 'https://www.liberation.fr/auteur/18438-clara-dealberto'
    }, {
      name: 'Maxime Fabas',
      role: 'Réalisation',
      link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538'
    }]
  }
}

module.exports = config

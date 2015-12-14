require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Lance',
    description: 'Sistema de gestão de receitas',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Lance',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'pt_BR',
        'og:title': 'Lance',
        'og:description': 'Controle de lançamentos.',
        'twitter:card': 'summary',
        'twitter:site': '@erikras',
        'twitter:creator': '@erikras',
        'twitter:title': 'React Redux Example',
        'twitter:description': 'All the modern best practices in one example.',
        'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);

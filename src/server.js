const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const config = require('./configuration');

const init = async () => {
  const server = Hapi.server({
    port: config.serverConfiguration.port,
    host: config.serverConfiguration.hostname,
  });
  await server.register([{
    plugin: require('hapi-mongodb'),
    options: {
      url: config.serverConfiguration.database,
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  },
  {
    plugin: require('hapi-plugin-mysql'),
    options: {
      host: 'localhost',
      user: 'backEndBookshelf',
      password: '&Uh9ruhLFB4r',
    },
  }]);
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();

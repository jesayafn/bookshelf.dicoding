const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  });
  await server.register({
    plugin: require('hapi-mongodb'),
    options: {
      url: 'mongodb://localhost:27017/bookshelf',
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  });
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();

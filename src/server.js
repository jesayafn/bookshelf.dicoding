const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const config = require('./configuration');
const CryptoJS = require('crypto-js');


const mongoDbUrlparse = CryptoJS.enc.Base64.parse(
    config.serverConfiguration.database);
const mongoDbUrl = CryptoJS.enc.Utf8.stringify(mongoDbUrlparse);
console.log(mongoDbUrl);

const init = async () => {
  const server = Hapi.server({
    port: config.serverConfiguration.port,
    host: config.serverConfiguration.hostname,
  });
  await server.register([{
    plugin: require('hapi-mongodb'),
    options: {
      url: mongoDbUrl,
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  },
  {
    plugin: require('@hapi/basic'),
  },
  ]);
  // server.auth.strategy('simple', 'basic', {
  //   validate: async (request, username, password) => {}
  // server.auth.default('simple');
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
init();

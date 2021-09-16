/* config-overrides.js */
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {

  //do stuff with the webpack config...
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true 
  })(config, env);

  return config;
}
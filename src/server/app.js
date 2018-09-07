const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

try {
  // The 'webpack' boolean gets set to true in webpack.config.js.
  // eslint-disable-next-line no-undef
  if (__isWebpack__) {
    global.__basedir = path.join(__dirname, '..', '..', 'src');
  }
} catch (e) {
  // server has not been built with webpack
  global.__basedir = path.join(__dirname, '..');
}

const routes = require('./routes');

module.exports = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(compression());

  // Routes
  app.use('/build', express.static(path.join(global.__basedir, '..', 'build', 'src')));
  app.use('/public', express.static(path.join(global.__basedir, '..', 'public')));
  app.use('/', routes);

  return app;
};

'use strict';

const express = require('express');

module.exports = function (app) {
  const controller = app.controllers.core;
  const router = express.Router();

  router.get('/', controller.find);
  router.delete('/:id', controller.delete);
  router.post('/:id', controller.create);

  app.use('/todos', router);
};
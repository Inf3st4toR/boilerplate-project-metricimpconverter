"use strict";
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  //Recover input from client
  app.get("/api/convert", (req, res) => {
    const output = convertHandler.finalCut(req.query.input);
    res.json(output);
  });
};

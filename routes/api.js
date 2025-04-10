"use strict";
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  //Data Validation
  function parseInput(input) {
    const regex = /^(\d+(\.\d+)?)?([a-zA-Z]+)$/;
    const match = input.match(regex);
    if (!match) {
      return null;
    }
    const initNum = match[1] ? parseFloat(match[1]) : 1;
    const initUnit = match[3].toLowerCase();

    //Validate initUnit
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(initUnit)) {
      return null;
    }
    return { initNum: initNum, initUnit: initUnit };
  }

  //Recover input from client
  app.get("/api/convert", (req, res) => {
    const parsedInput = parseInput(req.query.input);
    if (!parsedInput) {
      return res.json({ string: "invalid unit" });
    }
    const { initNum, initUnit } = parsedInput;
    //validating and parsing
    res.json(convertHandler.convert(initNum, initUnit));
  });
};

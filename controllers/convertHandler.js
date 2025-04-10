function ConvertHandler() {
  const regex = /^(\d+(\.\d+)?)?([a-zA-Z]+)$/;
  const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

  this.getNum = function (input) {
    const match = input.match(regex);
    if (!match) return null;
    return match[1] ? parseFloat(match[1]) : 1;
  };

  this.getUnit = function (input) {
    const match = input.match(regex);
    if (!match) return null;
    return validUnits.includes(match[3].toLowerCase())
      ? match[3].toLowerCase()
      : null;
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return null;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return {
          returnNum: parseFloat((initNum * galToL).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      case "l":
        return {
          returnNum: parseFloat((initNum / galToL).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      case "mi":
        return {
          returnNum: parseFloat((initNum * miToKm).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      case "km":
        return {
          returnNum: parseFloat((initNum / miToKm).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      case "lbs":
        return {
          returnNum: parseFloat((initNum * lbsToKg).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      case "kg":
        return {
          returnNum: parseFloat((initNum / lbsToKg).toFixed(5)),
          returnUnit: this.getReturnUnit(initUnit),
        };
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

  this.finalCut = function (input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    if (!initNum || !initUnit) return null;
    const { returnNum, returnUnit } = this.convert(initNum, initUnit);
    if (!returnNum || !returnUnit) return null;
    const string0 = this.getString(initNum, initUnit, returnNum, returnUnit);
    if (!string0) return null;

    return {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string0,
    };
  };
}

module.exports = ConvertHandler;

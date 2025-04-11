const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

suite("Unit Tests", function () {
  //Test_1
  test("Read whole Num", () => {
    const input = "8km";
    const expected = 8;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected, "Test_1 failed");
  });

  //Test_2
  test("Read decimal Num", () => {
    const input = "4.5km";
    const expected = 4.5;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected, "Test_2 failed");
  });

  //Test_3
  test("Read fraction Num", () => {
    const input = "3/2km";
    const expected = 1.5;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected, "Test_3 failed");
  });

  //Test_4
  test("Read fraction & decimal Num", () => {
    const input = "5.6/2km";
    const expected = 2.8;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected, "Test_4 failed");
  });

  //Test_5
  test("Error on double /", () => {
    const input = "4/4/4km";
    const result = convertHandler.getNum(input);
    assert.isNull(result, "Test_5 failed");
  });

  //Test_6
  test("Default to 1 if no Num", () => {
    const input = "km";
    const expected = 1;
    const result = convertHandler.getNum(input);
    assert.equal(result, expected, "Test_6 failed");
  });

  //Test_7
  test("Check all units", () => {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    validUnits.forEach((unit) => {
      const input = `10${unit}`;
      const result = convertHandler.getUnit(input);
      assert.oneOf(result, validUnits, `Fail: ${unit}, returned ${result}`);
    });
  });

  //Test_8
  test("Invalid unit test", () => {
    const input = "20Coco";
    const result = convertHandler.getUnit(input);
    assert.isNull(result, "Test_8 failed");
  });

  //Test_9
  test("Check returned values", () => {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    validUnits.forEach((unit) => {
      const result = convertHandler.getReturnUnit(unit);
      let expected;

      switch (unit) {
        case "gal":
          expected = "L";
          break;
        case "L":
          expected = "gal";
          break;
        case "mi":
          expected = "km";
          break;
        case "km":
          expected = "mi";
          break;
        case "lbs":
          expected = "kg";
          break;
        case "kg":
          expected = "lbs";
          break;
        default:
          expected = null;
      }
      assert.strictEqual(result, expected, `Fail: ${unit}, returned ${result}`);
    });
  });

  //Test_10
  test("Check final string", () => {
    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const fullUnits = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    validUnits.forEach((unit, i) => {
      const result = convertHandler.spellOutUnit(unit);
      assert.strictEqual(
        result,
        fullUnits[i],
        `Fail: ${unit}, returned ${result}`
      );
    });
  });

  //Test_11
  test("Convert gal to L", () => {
    const num = 5;
    const unit = "gal";
    const expected = num * galToL;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_11 Num is wrong"
    );
    assert.equal(result.returnUnit, "L", "Test_11 Unit is wrong");
  });

  //Test_12
  test("Convert L to gal", () => {
    const num = 5;
    const unit = "L";
    const expected = num / galToL;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_12 Num is wrong"
    );
    assert.equal(result.returnUnit, "gal", "Test_12 Unit is wrong");
  });

  //Test_13
  test("Convert mi to km", () => {
    const num = 5;
    const unit = "mi";
    const expected = num * miToKm;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_13 Num is wrong"
    );
    assert.equal(result.returnUnit, "km", "Test_13 Unit is wrong");
  });

  //Test_14
  test("Convert km to mi", () => {
    const num = 5;
    const unit = "km";
    const expected = num / miToKm;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_14 Num is wrong"
    );
    assert.equal(result.returnUnit, "mi", "Test_14 Unit is wrong");
  });

  //Test_15
  test("Convert lbs to kg", () => {
    const num = 5;
    const unit = "lbs";
    const expected = num * lbsToKg;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_15 Num is wrong"
    );
    assert.equal(result.returnUnit, "kg", "Test_15 Unit is wrong");
  });

  //Test_16
  test("Convert kg to lbs", () => {
    const num = 5;
    const unit = "kg";
    const expected = num / lbsToKg;
    const result = convertHandler.convert(num, unit);
    assert.approximately(
      result.returnNum,
      expected,
      0.1,
      "Test_16 Num is wrong"
    );
    assert.equal(result.returnUnit, "lbs", "Test_16 Unit is wrong");
  });
});

const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  //Test_1
  test("Convert 10L", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((err, res) => {
        assert.equal(res.status, 200, "Server Response error");
        assert.equal(res.body.initNum, 10, "initNum error");
        assert.strictEqual(res.body.initUnit, "L", "initUnit error");
        assert.approximately(
          res.body.returnNum,
          2.64172,
          0.1,
          "returnNum error"
        );
        assert.equal(res.body.returnUnit, "gal", "returnUnit error");
        done();
      });
  });

  //Test_2
  test("Convert 32g /error", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 200, "Server Response error");
        assert.equal(res.body, "invalid unit", "Error message invalid");
        done();
      });
  });

  //Test_3
  test("Convert 3/7.2/4kg /error", (done) => {
    const input = encodeURIComponent("3/7.2/4kg");
    const url = `/api/convert?input=${input}`;
    chai
      .request(server)
      .get(url)
      .end((err, res) => {
        assert.equal(res.status, 200, "Server Response error");
        assert.equal(res.body, "invalid number", "Error message invalid");
        done();
      });
  });

  //Test_4
  test("Convert Num&Unit /error", (done) => {
    const input = encodeURIComponent("3/7.2/4kilomegagram");
    const url = `/api/convert?input=${input}`;
    chai
      .request(server)
      .get(url)
      .end((err, res) => {
        assert.equal(res.status, 200, "Server Response error");
        assert.equal(
          res.body,
          "invalid number and unit",
          "Error message invalid"
        );
        done();
      });
  });

  //Test_5
  test("Convert kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        assert.equal(res.status, 200, "Server Response error");
        assert.equal(res.body.initNum, 1, "initNum error");
        assert.strictEqual(res.body.initUnit, "kg", "initUnit error");
        assert.approximately(
          res.body.returnNum,
          2.20462,
          0.1,
          "returnNum error"
        );
        assert.equal(res.body.returnUnit, "lbs", "returnUnit error");
        done();
      });
  });
});

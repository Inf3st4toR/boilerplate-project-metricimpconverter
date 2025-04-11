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
});

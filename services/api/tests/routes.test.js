const { after } = require("lodash");
const request = require("supertest");
const app = require("../api");
const { EHR } = require("../models/ehr.model");
const { ICD } = require("../models/icd.model");
const { User } = require("../models/user.model");

describe("Unit testing", () => {
  beforeAll(async () => {
    const user = await User.findOneAndDelete({ email: "email_test@gmail.com" });
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    const user = await User.findOneAndDelete({ email: "email_test@gmail.com" });
  });

  describe("ICD Endpoints", () => {
    it("Should list the ICD's in the database - Unauthenticated", async () => {
      const res = await request(app).get("/v1/icd/all");
      expect(res.statusCode).toEqual(403);
    });

    it("Should list the ICD's in the database - Authenticated", async () => {
      const resLogin = await request(app).post("/v1/user/login").send({ email: "doctor1@gmail.com", password: "1234" });
      const res = await request(app).get("/v1/icd/all").set("cookie", `jwtToken=${resLogin.body.token};`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.idcs.length).toEqual(122);
    });
  });

  describe("User Endpoints", () => {
    it("Should register a new user in the database", async () => {
      const res = await request(app).post("/v1/user/register").send({
        email: "email_test@gmail.com",
        password: "1234",
        name: "name test",
      });
      expect(res.statusCode).toEqual(201);
    });

    it("Login that user in the database", async () => {
      const res = await request(app).post("/v1/user/login").send({ email: "email_test@gmail.com", password: "1234" });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("EHR Endpoints", () => {
    let newLabel, newCase;

    beforeAll(async () => {
      newLabel = await ICD({
        icdId: "123-ABC",
        description: "simple description for unit test",
      });

      newCase = await EHR({
        description: "simple description for unit test",
      });

      newLabel.save();
      newCase.save();
    });

    afterAll(async () => {
      await ICD.findByIdAndDelete(newLabel._id);
      await EHR.findByIdAndDelete(newCase._id);
    });

    it("Should list the EHR's in the database", async () => {
      const resLogin = await request(app)
        .post("/v1/user/login")
        .send({ email: "email_test@gmail.com", password: "1234" });

      const res = await request(app).get("/v1/ehr/all").set("cookie", `jwtToken=${resLogin.body.token};`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.ehrs.length).toEqual(4);
    });

    it("Should label an EHR in the database", async () => {
      const resLogin = await request(app)
        .post("/v1/user/login")
        .send({ email: "email_test@gmail.com", password: "1234" });

      const res = await request(app)
        .post("/v1/ehr/label")
        .send({
          id: newCase._id,
          labelId: newLabel._id,
        })
        .set("cookie", `jwtToken=${resLogin.body.token};`);
      expect(res.statusCode).toEqual(200);
    });
  });
});

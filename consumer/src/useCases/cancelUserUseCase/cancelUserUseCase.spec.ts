import chai from "chai";
import { CancelUserUseCase } from "./cancelUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";

const { assert, should, expect } = chai;

describe("User Cancel, Consuming cancel queue", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new CancelUserUseCase(fakeRepository);
  });

  it("should change status to Cancelled and return true", async () => {
    const user = {
      username: `usuario123`,
      password: "teste",
    };

    const userCancel = await useCase.execute(user);

    expect(userCancel).to.not.be.undefined;
    expect(userCancel).to.be.true;
  });

  it("should throw an Error if User already cancelled on database", async () => {
    const user = {
      username: `usuario1`,
      password: "teste",
    };

    const userLogin = await useCase.execute(user).catch((err) => {
      expect(err.statusCode).to.equal(400);
      expect(err.msg).to.equal("Already Cancelled");
    });

    expect(userLogin).to.be.undefined;
  });
});

import chai from "chai";
import { CancelUserUseCase } from "./cancelUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";

const { assert, should, expect } = chai;

describe("User Cancel, POST /user/cancel", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new CancelUserUseCase(fakeRepository);
  });

  it("should send to the queue to cancel an user and return true", async () => {
    const user = {
      username: `usuario123`,
      password: "teste",
    };

    const userCancel = await useCase.execute(user);

    expect(userCancel).to.not.be.undefined;
    expect(userCancel.success).to.be.true;
  });

  it("should throw an Error if User it's not registered on database", async () => {
    const user = {
      username: `usuario3`,
      password: "teste",
    };

    const userLogin = await useCase.execute(user).catch((err) => {
      expect(err.statusCode).to.equal(404);
      expect(err.msg).to.equal("Usuário não existente");
    });

    expect(userLogin).to.be.undefined;
  });

  it("should throw an Error if User Data required are not informed", async () => {
    const user = {
      username: `usuario123`,
    };

    const userCreated = await useCase.execute(user).catch((err) => {
      expect(err).to.match(/required/);
    });

    expect(userCreated).to.be.undefined;
  });

  it("should throw an Error if password is incorrect", async () => {
    const user = {
      username: `usuario234`,
      password: "teste12312412",
    };

    const userCreated = await useCase.execute(user).catch((err) => {
      expect(err.statusCode).to.equal(403);
      expect(err.msg).to.equal("Dados incorretos");
    });

    expect(userCreated).to.be.undefined;
  });
});

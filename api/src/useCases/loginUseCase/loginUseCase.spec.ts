import chai from "chai";
import { LoginUseCase } from "./loginUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";

const { assert, should, expect } = chai;

describe("User Login, POST /user/login", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new LoginUseCase(fakeRepository);
  });

  it("should login and return and string token", async () => {
    const user = {
      username: `usuario123`,
      password: "teste",
    };

    const userLogin = await useCase.execute(user);

    expect(userLogin).to.have.property("id");
    expect(userLogin).to.have.property("username");
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

  it("should throw an Error if User Data are not informed", async () => {
    const user = {
      password: `usuario10`,
    };

    const userCreated = await useCase.execute(user).catch((err) => {
      expect(err.statusCode).to.equal(404);
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

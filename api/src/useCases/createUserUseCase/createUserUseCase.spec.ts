import chai from "chai";
import { CreateUserUseCase } from "./createUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";
import exp from "constants";

const { assert, should, expect } = chai;

describe("User Create, POST /user", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new CreateUserUseCase(fakeRepository);
  });

  it("should send to the queue to create a new user and return true", async () => {
    const user = {
      name: "Victor Castro",
      username: "victorcastr",
      email: "victor@teste.com",
      password: "@TesteDeSenha123",
      birthdate: "25-12-1999",
    };

    const userCreated = await useCase.execute(user);

    expect(userCreated).to.not.be.undefined;
    expect(userCreated).to.have.be.true;
  });

  it("should throw an Error if User already exists on database", async () => {
    const user = {
      name: "Victor Castro",
      username: "usuario123",
      email: "victor@teste.com",
      password: "@TesteDeSenha123",
      birthdate: "25-12-1999",
    };

    const userCreated = await useCase.execute(user).catch((err) => {
      expect(err.statusCode).to.equal(400);
      expect(err.msg).to.equal("Nome de usuário já existente!");
    });

    expect(userCreated).to.be.undefined;
  });

  it("should throw an Error if not send all the data required", async () => {
    const user = {
      name: "Victor Castro",
      username: "usuario12334",
      email: "victor@teste.com",
    };

    const userCreated = await useCase.execute(user).catch((err) => {
      expect(err).to.match(/required/);
    });
  });
});

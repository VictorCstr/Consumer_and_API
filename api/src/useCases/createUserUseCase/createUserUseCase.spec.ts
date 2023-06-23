import chai from "chai";
import { CreateUserUseCase } from "./createUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";
import { CacheRepository } from "../../repositories/CacheRepository";

const { assert, should, expect } = chai;

describe("User Create, POST /user", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new CreateUserUseCase(fakeRepository, new CacheRepository());
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
    expect(userCreated.success).to.be.true;
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

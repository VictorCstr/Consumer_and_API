import chai from "chai";
import { CreateUserUseCase } from "./createUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";

const { assert, should, expect } = chai;

describe("User Create, Consuming create queue", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new CreateUserUseCase(fakeRepository);
  });

  it("should create a new user on database and return true", async () => {
    const user = {
      name: "Victor Castro",
      username: "victorcastr",
      email: "victor@teste.com",
      password: "@TesteDeSenha123",
      birthdate: "25-12-1999",
    };

    const userCreate = await useCase.execute(user);

    expect(userCreate).to.not.be.undefined;
    expect(userCreate).to.be.true;
  });
});

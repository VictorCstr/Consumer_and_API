import chai from "chai";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { FakeUserRepository } from "../../repositories/FakeUserRepository";

const { assert, should, expect } = chai;

describe("User Update, Consuming update queue", () => {
  let fakeRepository, useCase;
  before(() => {
    fakeRepository = new FakeUserRepository();
    useCase = new UpdateUserUseCase(fakeRepository);
  });

  it("should update a user on database and return true", async () => {
    const user = {
      name: "Victor Alterando",
      username: "alterado1",
      email: "victor@alterado.com",
      password: "@TAlterado23",
      birthdate: "25-12-2000",
    };

    const userCreate = await useCase.execute(user);

    expect(userCreate).to.not.be.undefined;
    expect(userCreate).to.be.true;
  });
});

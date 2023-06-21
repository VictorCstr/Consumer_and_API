import { ValidationError } from "../errors";

const fp = require("fastify-plugin");

function usernameIsCorrect(name: string) {
  if (
    name.length > 15 ||
    name.length < 4 ||
    name == null ||
    name == undefined
  ) {
    return {
      sucess: false,
      result: "O nome de usuário precisa ter entre 4 a 15 caracteres",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

function emailIsCorrect(email: string) {
  let regex = /^\w+([\.-]?\w+)*@\D+\.\D+$/gm;
  if (
    regex.test(email) == false ||
    email.length < 5 ||
    email == null ||
    email == undefined
  ) {
    return {
      sucess: false,
      result:
        "Email não foi informado corretamente. (Apenas números, letras e underscore antes do @ e depois apenas letras e ponto(.) )",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

function nameIsCorrect(name: string) {
  if (
    name.length > 50 ||
    name.length < 4 ||
    name == null ||
    name == undefined ||
    name.split(" ").length < 2
  ) {
    return {
      sucess: false,
      result: "Nome completo informado com tamanho errado ou não foi definido",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

function passwordIsCorrect(password: string) {
  let regex = /(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{6,30}$/;
  if (
    regex.test(password) == false ||
    password == null ||
    password == undefined ||
    password.length < 6 ||
    password.length > 30
  ) {
    return {
      sucess: false,
      result:
        "A senha não está definida ou não contém pelo menos 1 caracteres especial, Letra maíuscula, mínuscula e algum número. Ou não contém de 6 a 30 caracteres",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

function birthDateIsCorrect(birthdate: string) {
  let regex = /^\d{2}-\d{2}-\d{4}$/;
  if (regex.test(birthdate) == false) {
    return {
      sucess: false,
      result:
        "A data precisa ser do tipo (Dia - Mês - Ano) (DD-MM-AAAA). Exemplo : 01-01-2001",
    };
  } else {
    return {
      sucess: true,
    };
  }
}

export default fp(function (fastify, opts, done) {
  fastify.decorate("validateCreateInput", async (request, reply) => {
    const correctUsername = usernameIsCorrect(request.body.username);

    if (correctUsername.sucess == false) {
      throw new ValidationError(400, correctUsername.result);
    }

    const correctEmail = emailIsCorrect(request.body.email);

    if (correctEmail.sucess == false) {
      throw new ValidationError(400, correctEmail.result);
    }

    const correctName = nameIsCorrect(request.body.name);

    if (correctName.sucess == false) {
      throw new ValidationError(400, correctName.result);
    }
    const correctPassword = passwordIsCorrect(request.body.password);

    if (correctPassword.sucess == false) {
      throw new ValidationError(400, correctPassword.result);
    }

    const correctBirthdate = birthDateIsCorrect(request.body.birthdate);

    if (correctBirthdate.sucess == false) {
      throw new ValidationError(400, correctBirthdate.result);
    }
  });
  done();
});

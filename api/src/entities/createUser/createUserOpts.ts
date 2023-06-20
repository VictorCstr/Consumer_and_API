export const opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
        password: { type: "string" },
        birthdate: { type: "string" },
      },
      required: ["username", "email", "name", "password", "birthdate"],
    },
  },
};

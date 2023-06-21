export const cancelUserOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
      required: ["username", "password"],
    },
  },
};

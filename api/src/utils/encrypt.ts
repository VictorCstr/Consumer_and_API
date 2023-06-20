import bcrypt from "bcrypt";

export async function hashPassword(pass: string) {
  return await bcrypt.hash(pass, 10);
}

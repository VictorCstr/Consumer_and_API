import { randomUUID } from "crypto";

export type Status = "Active" | "Cancelled";

export class User {
  readonly id: string;
  username: string;
  name: string;
  password: string;
  status: Status;
  birthdate: Date;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = randomUUID();
    }
  }
}

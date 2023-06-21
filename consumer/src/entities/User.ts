export type Status = "Active" | "Cancelled";

export class User {
  readonly id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  status: Status;
  birthdate: Date;

  constructor(props) {
    Object.assign(this, props);
  }
}

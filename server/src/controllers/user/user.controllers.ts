import { UserRepository } from "./../../repositories/user.query";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: number) {}
}

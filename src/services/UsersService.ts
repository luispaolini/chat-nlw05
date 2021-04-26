import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async findByEmail(email: string) {
    // Verify if user already exists
    const userExists = await this.usersRepository.findOne({
      email,
    });

    // If users exists, return existing user
    if (userExists) {
      return userExists;
    }
  }

  async create(email: string) {
    // Verify if user already exists
    const userExists = await this.usersRepository.findOne({
      email,
    });

    // If users exists, return existing user
    if (userExists) {
      return userExists;
    }

    // Create a new user
    const user = this.usersRepository.create({
      email,
    });

    // Save into database
    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService };

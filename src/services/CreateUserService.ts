import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserService {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({name, email, admin}: IUserService): Promise<User> {    
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!email) {
      throw new Error('Invalid mail.')
    }

    const usersAlreadyExist = await usersRepository.findOne({
      email
    });

    if(usersAlreadyExist) {
      throw new Error('User already exists.');
    }

    const user = usersRepository.create({
      name, email, admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
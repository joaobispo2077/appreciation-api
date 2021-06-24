import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from 'bcryptjs';
interface IUserService {
  name: string;
  email: string;
  admin?: boolean;
  password?: string;
}

class CreateUserService {
  async execute({name, email, admin, password}: IUserService): Promise<User> {    
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
    
    const passwordHash = await hash(password, 8);
    
    const user = usersRepository.create({
      name, email, admin, password: passwordHash
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
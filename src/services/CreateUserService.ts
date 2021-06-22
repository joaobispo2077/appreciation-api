import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({name, email, admin}: IUserRequest) {
    const usersRepository = new UsersRepositories();

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
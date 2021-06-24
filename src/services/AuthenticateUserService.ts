import { getCustomRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if(!user) throw new Error('Email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    console.log('matching...',passwordMatch);
    
    if(!passwordMatch) throw new Error('Email or password incorrect');
    
    const token = sign({ email: user.email }, 
      "05236ddd2ecf7ff9b7a792c50a5ef2cb", {
        subject: user.id,
        expiresIn: "15m"
      });
      
      console.log('token...',token);
    return token;
  }
}

export { AuthenticateUserService };
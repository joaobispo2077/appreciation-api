import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}
class CreateComplimentService {
  async execute({ tag_id, user_sender, message, user_receiver}: IComplimentRequest) {
    if(user_sender === user_receiver) throw new Error('Not allowed auto compliment.');

    const usersRepositories = getCustomRepository(UsersRepositories);

    const userSenderExists = await usersRepositories.findOne({id: user_sender});
    const userReceiverExists = await usersRepositories.findOne({id: user_receiver});
    
    if(!(userSenderExists && userReceiverExists)) throw new Error('User sender or user receiver not exists.')
    
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    
    const compliment = complimentsRepositories.create({ tag_id, user_sender, message, user_receiver });
    
    await complimentsRepositories.save(compliment);
    
    return compliment;
  }
}

export { CreateComplimentService };
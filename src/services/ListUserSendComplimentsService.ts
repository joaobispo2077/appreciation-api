import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    console.log('here...');
    
    const compliments = await complimentsRepository.find({
      where: {
        user_sender: user_id
      }
    });
    console.log('not here...');
    return compliments;
  }
}

export { ListUserSendComplimentsService };
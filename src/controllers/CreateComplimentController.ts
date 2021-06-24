import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";


class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, message, user_receiver} = request.body;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({tag_id, user_sender, message, user_receiver});

    return response.json({compliment});
  }
}

export { CreateComplimentController };
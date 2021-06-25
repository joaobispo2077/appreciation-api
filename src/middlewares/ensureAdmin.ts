import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(req: Request,res: Response, next:NextFunction) {
  const { user_id } = req;
  console.log('id user: ' + user_id);

  const usersRepositories = getCustomRepository(UsersRepositories);
  const user = await usersRepositories.findOne({id: user_id});
  
  if(user.admin) {
    return next();
  }

  console.log(user.admin);

  return res.status(401).json({
    error: "Unauthorized."
  });
}
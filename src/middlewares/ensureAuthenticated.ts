import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request,res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if(!authToken) return res.status(401).end();
  
  console.log(authToken);

  const [,token] = authToken.split(' ');

  try {
    const { sub } = verify(token,'05236ddd2ecf7ff9b7a792c50a5ef2cb') as IPayload;
    req.user_id = sub;    
    
    return next();
  } catch(err) {
    return res.status(401).end();
  }


}
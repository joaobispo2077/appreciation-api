import 'reflect-metadata';
import './database';

import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use((err: Error, request: Request, response: Response, next:NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({message: err.message});
  }

  return response.status(500).json({message: "Internal server error."});
});

const port = 3000;
app.listen(port, () => console.log(`Server is running at port ${port}...`));
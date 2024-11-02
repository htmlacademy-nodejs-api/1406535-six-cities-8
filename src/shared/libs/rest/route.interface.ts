import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware/middleware.interface.js';

export interface Route {
  path: string;
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}

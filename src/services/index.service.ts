import { Request, Response } from 'express';
import { WELCOME } from '../../config/contants';

export class IndexService {
	public welcomeMessage(req: Request, res: Response) {
		return res.status(200).send(WELCOME);
	}
}

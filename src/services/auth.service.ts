import { Request, Response } from 'express';
import { MongooseDocument } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Utils } from '../utils/utils';
import { JWTSECRET } from '../../config/contants';
import { uid, suid } from 'rand-token';

export class AuthService {
	private utils: Utils;
	private user: any = new User();
	private refreshTokens: any;

	constructor() {
		this.utils = new Utils();
		this.refreshTokens = {};
	}

	public reject = (req: Request, res: Response) => {
		let { refreshToken } = req.body;
		if (refreshToken in this.refreshTokens) {
			delete this.refreshTokens[refreshToken];
		}
		res.status(204).send({ message: 'Token invalidated.', status: true });
	};

	public token = (req: Request, res: Response) => {
		let { username, refreshToken } = req.body;
		if (
			refreshToken in this.refreshTokens &&
			this.refreshTokens[refreshToken] === username
		) {
			let newUser = username.split('|');
			const token = jwt.sign(
				{ userId: newUser[1], username: newUser[0] },
				JWTSECRET,
				{ expiresIn: '1h' }
			);
			res.status(200).send({ message: 'Thanks.', status: true, token: token });
		} else {
			res.status(401).send({
				message: 'Contact your network administrator.',
				status: false,
				token: null,
			});
		}
	};

	public login = async (req: Request, res: Response) => {
		let { username, password } = req.body;

		if (!(username && password)) {
			res.status(400).send({
				message: 'Login and/or password is required.',
				status: false,
				token: null,
			});
		}

		try {
			this.user = await User.findOne(
				{ login: username },
				(error: Error, User: MongooseDocument) => {
					if (error) {
						res
							.status(400)
							.send({ message: error.message, status: false, token: null });
					}
					return User;
				}
			);

			if (
				!this.utils.checkIfUnencryptedPasswordIsValid(
					password,
					this.user.password
				)
			) {
				res.status(401).send({
					message: 'Login and/or password incorrect.',
					status: false,
					token: null,
				});
			}
			const token = jwt.sign(
				{ userId: this.user._id, username: this.user.username },
				JWTSECRET,
				{ expiresIn: '1h' }
			);
			const refreshToken = uid(12);
			this.refreshTokens[refreshToken] = `${username}|${this.user._id}`;
			res.status(200).send({
				message: 'Logged in successful.',
				status: true,
				token: token,
				refreshToken: refreshToken,
			});
		} catch (error) {
			res.status(401).send({
				message: 'Contact your network administrator.',
				status: false,
				token: null,
			});
		}
	};

	public register = async (req: Request, res: Response) => {
		let { name, login, password } = req.body;

		try {
			const newUser = new User({
				name: name,
				login: login,
				password: password,
			});
			this.user = await newUser.save((error, user) => {
				if (error) {
					res.status(400).send({ message: error.message, status: false });
				}
				res
					.status(200)
					.send({ message: 'User registred succesfull.', status: true });
				return user;
			});
		} catch (error) {
			res.status(401).send({
				message: 'Contact your network administrator.',
				status: false,
			});
		}
	};
}

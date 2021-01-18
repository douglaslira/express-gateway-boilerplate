import { Application } from 'express';
import {
	createProxyMiddleware,
	Filter,
	Options,
	RequestHandler,
} from 'http-proxy-middleware';
import { checkJwt } from './middlewares/checkJwt';
import { MONGO_URL_DEV } from '../config/contants';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';

import { IndexController } from './controllers/index.controller';
import { AuthController } from './controllers/auth.controller';

class App {
	public app: Application;
	public indexController: IndexController;
	public authController: AuthController;

	constructor() {
		this.app = express();

		this.setProxies();
		this.setConfig();
		this.setMongoConfig();

		this.indexController = new IndexController(this.app);
		this.authController = new AuthController(this.app);
	}

	private setConfig() {
		this.app.use(helmet());
		this.app.use(bodyParser.json({ limit: '50mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		this.app.use(cors());
	}

	private setProxies() {
		this.app.use(
			'^/message',
			createProxyMiddleware({
				target: 'http://localhost:3002',
				changeOrigin: true,
			})
		);

		// Example with JWT
		/*this.app.use(
			'^/product',
			[checkJwt],
			createProxyMiddleware({
				target: 'http://localhost:3001',
				changeOrigin: true,
			})
		);*/

	}

	private setMongoConfig() {
		mongoose.connect(MONGO_URL_DEV, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	}
}

export default new App().app;

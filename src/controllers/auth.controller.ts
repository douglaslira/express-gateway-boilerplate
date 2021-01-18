import { Application } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor(private app: Application) {
      this.authService = new AuthService();
      this.routes();
    }

    public routes() {
      this.app.route('/login').post(this.authService.login);
      this.app.route('/token').post(this.authService.token);
      this.app.route('/register').post(this.authService.register);
      this.app.route('/token/reject').post(this.authService.reject);
    }
}

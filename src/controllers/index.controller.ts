import { Application } from 'express';
import { IndexService } from '../services/index.service';

export class IndexController {
    private indexService: IndexService;
  
    constructor(private app: Application) {
      this.indexService = new IndexService();
      this.routes();
    }
  
    public routes() {
      this.app.route('/').get(this.indexService.welcomeMessage);
    }
  }
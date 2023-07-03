import { App } from './src/app';
import { Server } from './src/server';

const app = new App().createApp();

new Server().run(app);
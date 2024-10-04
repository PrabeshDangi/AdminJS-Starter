import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';
import { cookieOptions, limiter } from './constant.js';
import path from 'path';
import * as url from 'url';

dotenv.config();

const port = process.env.PORT || 3000;

const start = async () => {
  const app = express();
  const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

  app.use(cors());
  app.use(morgan('dev'));
  app.use(limiter);

  await initializeDb();

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: cookieOptions,
    }
  );

  app.use(admin.options.rootPath, router);
  app.use(express.static(path.join(__dirname, '../public')));

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke on startup!!!');
  });

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();

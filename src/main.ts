import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './exceptions/not-found.filter';
import { Request, Response } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://127.0.0.1:3000',
      credentials: true,
      methods: ['GET', 'POST'],
    },
  });
  app.useStaticAssets(join(__dirname, '..', 'client/build'));
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(cookieParser());

  await app.listen(process.env.PORT || 5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { getConnection, getRepository } from 'typeorm';
import { SessionEntity } from './typeorm/Session.entity';
import { getConnectionToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const connection = app.get(getConnectionToken());
  const sessionRepo = connection.getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'session',
      secret: 'alsjhfpsajfsalfsa',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60
      }, 
      store: new TypeormStore().connect(sessionRepo)
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();

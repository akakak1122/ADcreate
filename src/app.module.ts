import { Module, NestModule, MiddlewareConsumer, RequestMethod, } from '@nestjs/common';
import { AddressModule } from './transaction/address';
import { BlackModule } from './transaction/black';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IPMiddleware } from './middlewares/ip.middleware';
import { CachingModule } from './transaction/caching';
import { AuthModule } from './transaction/auth';
import { HistoryModule } from './transaction/history';
import * as joi from 'joi';

@Module({
  imports: [
    CachingModule,
    AddressModule,
    BlackModule,
    AuthModule,
    HistoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production', 'test')
          .required(),
        DB_URI: joi.string().required(),
        // DB_USER: joi.string().required(),
        // DB_PASSWORD: joi.string().required(),
        REDIS_HOST: joi.string().required(),
        REDIS_PORT: joi.string().required(),
        SECRET_KEY: joi.string().required(),
        IP_RETRY_BLACK_TIME: joi.number().required(),
        IP_RETRY_BLACK_CNT: joi.number().required(),
      }),
    }),
    MongooseModule.forRoot(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASSWORD,
    }),
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IPMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

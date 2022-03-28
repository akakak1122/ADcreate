import { Module, NestModule, MiddlewareConsumer, RequestMethod, } from '@nestjs/common';
import { AddressModule } from './transaction/address';
import { BlackModule } from './transaction/black';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IPMiddleware } from './middlewares/ip.middleware';
import * as joi from 'joi';

@Module({
  imports: [
    AddressModule,
    BlackModule,
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
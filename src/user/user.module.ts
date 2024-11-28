import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidateUserMiddleware } from './middleware/validate-user/validate-user.middleware';
import { UserServiceService } from './services/user-service/user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeORM/entities/user';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
  providers: [UserServiceService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateUserMiddleware).forRoutes({
            path:'create-user',
            method:RequestMethod.POST
        });
    }
}

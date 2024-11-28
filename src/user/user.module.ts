import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ValidateUserMiddleware } from './middleware/validate-user/validate-user.middleware';
import { UserServiceService } from './services/user-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeORM/entities/user';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
  providers: [UserServiceService]
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateUserMiddleware).forRoutes(
            {
            path:'user/all',
            method:RequestMethod.GET
            },
            {
                path:'user/:id',
                method:RequestMethod.GET
            },
            {
                path:'user/:id',
                method:RequestMethod.PUT
            },
            {
                path:'user/:id',
                method:RequestMethod.DELETE
            },
    );
    }
}

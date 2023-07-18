import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/entity/book.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definitions: {
        path: join(process.cwd(), 'src/graph.ts')
      },
      context: ({ req, res }) => ({
        req,
        res
        // Other context properties
      })
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: 'password1',
      database: 'book_db',
      entities: [BookEntity, UserEntity],
      synchronize: true
    }),

    BookModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppResolver]
})
export class AppModule {}

import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { UserEntity } from './user/entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from './auth/jwt.gurad';
@Resolver((of) => String)
export class AppResolver {
  @Query((returns) => String)
  index(): string {
    return 'GraphQl Is Running';
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard)
  securedResource(@Context('user') user: any): string {
    return 'This is Secured Data' + JSON.stringify(user);
  }

  @Query((returns) => String)
  @UseGuards(AuthGuard)
  logIn(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: UserEntity
  ): string {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    };
    return jwt.sign(payload, 'key', { expiresIn: '3600s' });
  }
}

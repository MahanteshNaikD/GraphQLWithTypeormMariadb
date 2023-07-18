import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    const authorizerheader = ctx.req.headers.authorization;

    if (authorizerheader) {
      const token = authorizerheader.split(' ')[1];
      try {
        const user = jwt.verify(token, 'key');
        ctx.user = user;
        return true;
      } catch (error) {
        throw new HttpException('INVALID TOKEN', HttpStatus.UNAUTHORIZED);
      }
    } else {
      return false;
    }
  }
}

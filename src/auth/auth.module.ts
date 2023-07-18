import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.gurad';
@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthGuard, JwtGuard],
  exports: []
})
export class AuthModule {}

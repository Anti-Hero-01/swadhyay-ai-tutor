import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/*
  This guard delegates authentication to Passport JWT strategy.
  JwtStrategy.validate() will run and attach req.user.
*/

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

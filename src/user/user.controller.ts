import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { MyJWTGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  // C1:
  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  //  myProfile(@Req() request:Request){
  //   const user = request.user;
  //   return user
  // }

  // C2
  @UseGuards(MyJWTGuard)
  @Get('me')
  me(@GetUser() user: User){
    return user; 
  }
}

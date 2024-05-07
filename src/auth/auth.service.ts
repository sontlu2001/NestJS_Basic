import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService{
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  async register(authDTO: AuthDTO) {
    // hashed password
    const hashedPassword = await argon.hash(authDTO.password);
    try {
      // insert data to database
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          password: hashedPassword,
          firstName: '',
          lastName: '',
        }
      })
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email has already registered')
      }
    }
  }

  async login(authDTO: AuthDTO) {
    // find user with input email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email
      },
    })

    if(!user){
      throw new ForbiddenException('User not found')
    }

    const isMatchedPassword = await argon.verify(
      user.password, //password store in database
      authDTO.password
    ) 

    if(!isMatchedPassword){
      throw new ForbiddenException('Incorrect password')
    }

    return await this.signJwtToken(user.id, user.email);
  }

  async signJwtToken(userId: number, email:string): Promise<{accessToken:string}>{
    const payload = {
      sub: userId,
      email
    }
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET')
    })
    return {
      accessToken,
      
    }
  }
}
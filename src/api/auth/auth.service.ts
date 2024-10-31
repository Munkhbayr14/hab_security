import { BadRequestException, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRole } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }
  hashData(data: string) {
    return bcrypt.hash(data, 10)
  }
  async register(registerUserDto: RegisterUserDto) {
    const hash = await this.hashData(registerUserDto.password);
    if (registerUserDto.password !== registerUserDto.confirmationPassword) {
      throw new BadRequestException('Баталгаажуулах нууц үг тохирохгүй байна.');
    }
    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerUserDto.email,
          firstName: registerUserDto.fisrtname,
          lastName: registerUserDto.lastname,
          role: registerUserDto.role || undefined,
          hash,
        },
      });
      return {
        message: 'success',
        userId: user.id,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException("Хэрэглэгч бүртгэлтэй байна.");
        }
      }
      throw new Error(error);
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.prisma.user.findUnique({ where: { email: createAuthDto.email } });
    if (user && (await bcrypt.compare(createAuthDto.password, user.hash))) {
      const payload = { email: user.email, userId: user.id, username: user.firstName };
      return {
        message: "success",
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
        email: user.email,
        role: user.role,
        userId: user.id,
        username: user.firstName,
      };
    }
    if (!user) {
      throw new UnauthorizedException('Хэрэглэгч бүртгэлгүй байна ');
    }
    throw new Error('Нэвтрэх үед алдаа гарлаа');
  }



  // create(createAuthDto: CreateAuthDto) {
  //   const findUser = fakeUsers.find(
  //     (user) => user.username === createAuthDto.username
  //   )
  //   if (!findUser) return null

  //   if (createAuthDto.password === findUser.password) {
  //     const { password, ...user } = findUser
  //     return this.jwtService.sign(user);
  //   }
  // }

  async roleCheck(userId: number) {
    const users = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!users) {
      throw new BadRequestException(`${userId}тай хэрэглэгч олдсонгүй`);
    }
    if (users.role === UserRole.HAB) {
      return true;
    } else {
      return false;
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { AuthService } from 'src/api/auth/auth.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService, private authService: AuthService) { }

  create(createInfoDto: CreateInfoDto) {
    return 'This action adds a new info';
  }

  async findAll() {
    try {
      const infos = await this.prisma.info.findMany();

      if (!infos) {
        throw new BadRequestException('даатаа алга');
      }
      return {
        statusCode: 200,
        message: 'Success',
        result: infos
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number, userId: number) {
    try {

      const role = await this.authService.roleCheck(userId);
      if (role === false) {
        throw new BadRequestException('Хэрэглэгчийн эрхээс хамаарахгүй байна');
      }
      const infoDetail = await this.prisma.info.findUnique({
        where: {
          id
        }
      })
      if (!infoDetail) {
        throw new NotFoundException(`${id} id-тай мэдээлэл байхгүй байна`);
      }
      return {
        statusCode: 200,
        message: 'Success',
        result: infoDetail
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateInfoDto: UpdateInfoDto) {
    return `This action updates a #${id} info`;
  }

  remove(id: number) {
    return `This action removes a #${id} info`;
  }
}

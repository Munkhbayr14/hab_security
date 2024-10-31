import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { AuthService } from 'src/api/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InfoController,],
  providers: [InfoService, AuthService, JwtService,],
})
export class InfoModule { }

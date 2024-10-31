import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

import { PrismaModule } from './api/prisma/prisma.module';
import { InfoModule } from './info/info.module';


@Module({
  imports: [AuthModule, UserModule, PrismaModule, InfoModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

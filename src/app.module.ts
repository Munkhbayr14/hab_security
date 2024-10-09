import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { BookmarkModule } from './api/bookmark/bookmark.module';
import { PrismaModule } from './api/prisma/prisma.module';


@Module({
  imports: [AuthModule, UserModule, BookmarkModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }

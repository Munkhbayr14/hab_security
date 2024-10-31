import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register-user.dto';


@ApiTags('Auth')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        lastname: { type: 'string' },
        fisrtname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        confirmationPassword: { type: 'string' },
        role: {
          type: 'string',
          enum: ['HAB', 'EMPLOYEE',],
          example: 'EMPLOYEE || HAB',
        },
      },
    },
  })
  register(@Body() registerUserDto: RegisterUserDto) {
    const user = this.authService.register(registerUserDto);
    return user
  }

  @Post('signin')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);

  }

  // @Get('role-check/:id')
  // roleCheck(@Param('id') id: any) {
  //   return this.authService.roleCheck(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

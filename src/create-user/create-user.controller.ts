import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private mailService: MailerService) {}

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDTO) {
    this.mailService.sendMail({
      to: createUserDto.email,
      from: 'DOTR <dotr@br.com>',
      subject: 'Welcome to DOTR',
      text: `Hello ${createUserDto.name}, your accout has been created. Welcome!`, 
    });
  }
}

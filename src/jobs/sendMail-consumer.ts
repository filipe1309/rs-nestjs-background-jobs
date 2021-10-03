import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'DOTR <dotr@me.com>',
      subject: 'Welcome to DOTR Async',
      text: `Hello ${data.name}, your account has been created. Welcome!`,
    });
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job<CreateUserDTO>) {
    console.log(`On Completed: ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job<CreateUserDTO>) {
    console.log(`On Progress: ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job<CreateUserDTO>) {
    console.log(`On Active: ${job.name}`);
  }
}

export { SendMailConsumer };

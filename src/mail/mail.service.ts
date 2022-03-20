import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'subject',
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.hash
      } confirm email`,
      template: '/activation',
      context: {
        title: 'title',
        url: `url`,
        actionTitle: 'actionTitle',
        app_name: this.configService.get('app.name'),
        text1: 'text1',
        text2: 'text2',
        text3: 'text3',
      },
    });
  }
}

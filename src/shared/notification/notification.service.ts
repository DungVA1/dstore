import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/logger/logger.service';

type NotificationType = 'Email' | 'SMS' | 'Push';

@Injectable()
export class NotificationService {
  constructor(private readonly logger: LoggerService) {}

  send(
    type: NotificationType,
    params: {
      sendTo: unknown[];
      content: unknown;
      option?: Record<string, unknown>;
    },
  ) {
    switch (type) {
      case 'Email': {
        this.sendEmail(
          params.sendTo as string[],
          params.content as string,
          (
            params.option as {
              cc: string[];
            }
          )?.cc,
        );
        break;
      }

      case 'SMS': {
        this.sendSMS(params.sendTo as string[], params.content as string);
        break;
      }

      case 'Push': {
        this.push(
          params.sendTo as string[],
          params.content as Record<string, unknown>,
        );
        break;
      }
    }
  }

  private sendEmail(
    recipients: string[],
    emailContent: string,
    ccRecipients?: string[],
  ) {
    this.logger.log(
      `Send email to ${recipients.join(', ')} successfully: ${emailContent} \ncc: ${ccRecipients?.join(', ')}`,
    );
  }

  private sendSMS(phoneNumbers: string[], smsContent: string) {
    this.logger.log(
      `Send sms to ${phoneNumbers.join(', ')} successfully: ${smsContent}`,
    );
  }

  private push(
    recipientCodes: string[],
    notifContent: Record<string, unknown>,
  ) {
    this.logger.log(
      `Push notification to ${recipientCodes.join(', ')} successfully: ${JSON.stringify(notifContent)}`,
    );
  }
}

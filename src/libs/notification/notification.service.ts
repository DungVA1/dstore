/* eslint-disable no-console */
type NotificationType = 'Email' | 'SMS' | 'Push';
// TODO: Should build an service for notification

export class Notification {
  constructor(private readonly type: NotificationType) {}

  send(params: {
    sendTo: unknown[];
    content: unknown;
    option?: Record<string, unknown>;
  }) {
    switch (this.type) {
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
    console.log(
      `Send email to ${recipients.join(', ')} successfully: ${emailContent} \ncc: ${ccRecipients?.join(', ')}`,
    );
  }

  private sendSMS(phoneNumbers: string[], smsContent: string) {
    console.log(
      `Send sms to ${phoneNumbers.join(', ')} successfully: ${smsContent}`,
    );
  }

  private push(
    recipientCodes: string[],
    notifContent: Record<string, unknown>,
  ) {
    console.log(
      `Push notification to ${recipientCodes.join(', ')} successfully: ${JSON.stringify(notifContent)}`,
    );
  }
}

export interface EmailService {
  sendWelcomeEmail: (email: string) => void;
}

export class EmailServiceImpl implements EmailService {
  async sendWelcomeEmail(email: string) {
    // code goes here ;)
  }
}

export interface EmailService {
  sendMail: () => void;
}

export class EmailServiceImpl implements EmailService {
  sendMail() {
    // code goes here ;)
  }
}

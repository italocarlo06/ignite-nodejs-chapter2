import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class EtherealMailProvider implements IMailProvider {

  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then( account => {
       const transporter= nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth:{
          user: account.user,
          pass: account.pass,
        }
      });

      this.client = transporter;
    }).catch( err => console.error(err.message));
  }
  
  async sendMail(
    to: string, 
    subject: string, 
    variables: any, 
    path: string
  ): Promise<void> {

    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    
    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      from: "Rentx <noreply@rentx.com.br>",      
      html: templateHtml
    });
  }

}

export { EtherealMailProvider }
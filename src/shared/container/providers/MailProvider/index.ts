import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailprovider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}
container.registerInstance<IMailProvider>(
  "MailProvider",
  mailprovider[process.env.MAIL_PROVIDER]
);
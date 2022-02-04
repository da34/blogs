import nodemailer from 'nodemailer';
interface EmailConfig {
  host: string;
  port: string;
  user: string;
  pass: string;
}
export const sendEmail = (
  messageOpt,
  { host, port, user, pass }: EmailConfig,
) => {
  if (!host || !port || !user || !pass) {
    return null;
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secureConnection: true,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  return new Promise((resolve, reject) => {
    transport.sendMail(messageOpt, function (err, info) {
      if (err) {
        console.log('发送邮件失败', err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

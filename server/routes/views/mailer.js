// import { resolve } from 'path';
// import Email from 'email-templates';

// const templatesDir = resolve(__dirname, 'views/mailer');

// // const mailjet = require('node-mailjet').connect(
// //   process.env.MJ_APIKEY_PUBLIC,
// //   process.env.MJ_APIKEY_PRIVATE
// // );

// const mailjet = require('node-mailjet').connect(
//   'c5fc907dcda19f8cefb3be106edfc67f',
//   'c179b4d9b4ee638401c04d18fd60a789',
// );

// const sendEmail = (messageInfo, text, html) => {
//   messageInfo.fromEmail = 'julioharlingen@gmail.com';
//   messageInfo.fromName = 'Julio Maldonado';
//   messageInfo.email = 'julio.maldonado.guzman@gmail.com';


//   alert( { messageInfo });
//   return mailjet.post('send', { version: 'v3.1' }).request({
//     Messages: [
//       {
//         From: { Email: messageInfo.fromEmail, Name: messageInfo.fromName },
//         To: [{ Email: messageInfo.email }],
//         Subject: messageInfo.subject,
//         TextPart: text,
//         HTMLPart: html,
//       },
//     ],
//   });
// };

// const sendOne = (templateName, messageInfo, locals) => {
//   const email = new Email({
//     views: { root: templatesDir, options: { extension: 'ejs' } },
//   });

//   console.log('in sendOne');

//   return Promise.all([
//     email.render(`${templateName}/html`, locals),
//     email.render(`${templateName}/text`, locals),
//   ])
//     .then(([html, text]) => sendEmail(messageInfo, text, html))
//     .catch(console.error);
// };

// export default sendOne;

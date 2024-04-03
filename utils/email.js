


// // const nodemailer=require("nodemailer")
// // const CustomError = require("./CustomError")
// // const { options } = require("../routes/authRoutes")


// // let transporter = nodemailer.createTransport(
// //     {
// //         host: 'smtp.ethereal.email',
// //         port: 587,
// //         auth: {
// //             user: 'turner.hand@ethereal.email',
// //             pass: 'XcMKDZvbU9TZfJZqsm'
// //         }
// //     }
// //    )



// // async  function send(){
// // transporter.sendMail({
// //     from: 'turner.hand@ethereal.email', // sender address
// //     to: options.userEmail, // list of receivers  user.email
// //     subject: options.subject, // Subject line
// //     text: options.text, // plain text body
// //     html: "<b>Hello world?</b>", // html body
// //   })
// // }

// // send();


// // // module.exports=send;

// // =======================================================



// const nodemailer=require("nodemailer")
// const CustomError = require("./CustomError")
// // const {options} = require("../routes/authRoutes")



//    const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'ashton7@ethereal.email',
//         pass: '9CbvswWxXrdGH7TucF'
//     }
// });



// async function send(options) {

//     await transporter.sendMail({
//       from: 'ashton7@ethereal.email', // sender address
//       to: options.userEmail, // list of receivers  user.email
//       subject: options.subject, // Subject line
//       text: options.message, // plain text body
//       html: "<b>Hello world?</b>", // html body

//     });
//     // await transporter.sendMail()
// }

// // send();

// module.exports=send;



// ===============================================================
// ===============================================================


const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kira.douglas63@ethereal.email',
      pass: 'FehGwE1JHssRrdvftZ'
  },
});


// async function sendEmail() {
   
//     await transporter.sendMail({
//       from: 'kimberly.goodwin@ethereal.email', 
//       to: "bar@example.com, baz@example.com", 
//       subject: "Hello Hemanth ✔", 
//       text: "Hello world?", 
//       html: "<b>Hello world?</b>", 
//     });
// }

// sendEmail()



async function sendEmail(options) {
  await transporter.sendMail({
   
    from: "kira.douglas63@ethereal.email",
    to: options.userEmail,
    subject: options.subject,
    text: options.message,
    html: "<b>Hello world?</b>",
  });
}

module.exports = sendEmail;





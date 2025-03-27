// // // utils/mailer.js
// // import nodemailer from "nodemailer";

// // export const sendEmail = async (to, subject, html) => {
// //   try {
// //     const transporter = nodemailer.createTransport({
// //       service: "Gmail",
// //       auth: {
// //         user: process.env.EMAIL_USER, // Your email address
// //         pass: process.env.EMAIL_PASS, // Your email password or App Password
// //       },
// //     });

// //     const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log("📧 Email sent:", info.response);
// //   } catch (error) {
// //     console.error("❌ Email sending failed:", error);
// //   }
// // };



// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Send welcome email
// export const sendWelcomeEmail = async (to, name) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject: "Welcome to the Organization!",
//     text: `Hello ${name}, welcome!`,
//   });
// };

// // Notify admin of a new user
// export const notifyAdmin = async (orgId, name, email) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: "admin@example.com",
//     subject: "New User Added",
//     text: `A new user has joined Org ${orgId}:\nName: ${name}\nEmail: ${email}`,
//   });
// };


// --new project ------
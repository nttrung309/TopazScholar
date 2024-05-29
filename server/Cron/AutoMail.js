const cron = require('node-cron');
const nodemailer = require('nodemailer');

const Activity = require("../Models/Activity");

// Thiết lập Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'topazscholar2024@gmail.com',
      pass: 'cifq ukqj kwzh xnek',
    },
  });
  
const SendEmail = async (to, subject, text) => {
    await transporter.sendMail({
      from: '"Meow nè" <topazscholar2024@gmail.com>',
      to,
      subject,
      text,
    });
};
  
// Kiểm tra và gửi email mỗi phút
const scheduleEmails = () => {
    cron.schedule('0 * * * *', async () => {
        const activities = await Activity.find();
        const now = new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000;

        activities.forEach(activity => {
        const timeDifference = new Date(activity.time.startDate) - now;
        const daysDifference = Math.ceil(timeDifference / oneDayInMs);

        if (daysDifference === 1) {
            sendEmail(activity.email, 'Reminder: Activity Starting Soon', `Your activity "${activity.name}" starts tomorrow!`);
        }
        });
    });
};
  
module.exports = { SendEmail, scheduleEmails };
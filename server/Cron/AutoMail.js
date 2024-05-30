const cron = require('node-cron');
const nodemailer = require('nodemailer');

const Activity = require("../Models/Activity");
const { GenerateEmailTemplate } = require('../Helper/MailTemplate');
const User = require('../Models/User');

// Thiết lập Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'topazscholar2024@gmail.com',
      pass: 'cifq ukqj kwzh xnek',
    },
  });
  
const SendEmail = async (to, subject, data) => {
    await transporter.sendMail({
      from: '"Topaz Scholar" <topazscholar2024@gmail.com>',
      to,
      subject,
      html: GenerateEmailTemplate(data)
    });
};
  
// Kiểm tra và gửi email mỗi phút
const ScheduleAutoEmail = async () => {
    cron.schedule('5 * * * *', async () => {
      const activities = await Activity.find();
      const now = new Date();
      const oneDayInMs = 24 * 60 * 60 * 1000;

      activities.forEach(async activity => {
        const timeDifference = new Date(activity.time.startDate) - now;
        const daysDifference = Math.ceil(timeDifference / oneDayInMs);

        if (daysDifference === 1 && !activity.isAutoMailed) {
          const users = await User.find({ attendedActivitiesID: { $in: [activity.actID] } });
          const emails = users.map(user => user.email);
          emails.forEach(email => {
            SendEmail(email, 'Lời nhắc tham gia hoạt động', activity);
          })
          try{
            const updatedActivity = await Activity.findOneAndUpdate(
              {actID: activity.actID},
              { $set: { isAutoMailed: true } },
              { new: true } // Trả về tài liệu đã cập nhật
            );
          }
          catch (err) {
            console.error('Error updating activity:', err);
          }
        }
      });
    });
};

module.exports = { SendEmail, ScheduleAutoEmail };
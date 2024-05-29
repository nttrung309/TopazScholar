const GenerateEmailTemplate = (activityName) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f8f8; padding: 10px 0; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f8f8f8; padding: 10px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reminder: Activity Starting Soon</h1>
          </div>
          <div class="content">
            <p>Dear user,</p>
            <p>Your activity <strong>${activityName}</strong> starts tomorrow!</p>
            <p>Make sure you are prepared.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  module.exports = { GenerateEmailTemplate }
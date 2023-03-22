const CronJob = require('cron').CronJob;

const sendReminderEmails = () => {
    // Code pour envoyer les e-mails de rappel
};

const job = new CronJob('0 0 * * *', () => {
    sendReminderEmails();
}, null, true, 'Europe/Paris');

job.start();

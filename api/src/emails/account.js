const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jeffvh@outlook.com',
        subject: 'Welcome to Task Manager',
        text: `Hi ${name}. Thank you for joining! Feel free to let us know how you get along with the app with any questons you may have or any feedback you may have.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'jeffvh@outlook.com',
        subject: 'Unsubscribed To Task Manager',
        text: `We are sad to see you go ${name}. We would be happy to have you back at any point in the future. Feel free to let us know if there is anything we could do to have kept you on or might interest you to come back!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

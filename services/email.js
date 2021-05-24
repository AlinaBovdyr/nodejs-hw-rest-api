// const sendgrid = require('@sendgrid/mail')
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'alinabovdyr@meta.ua',
    pass: process.env.NODEMAILER_PASSWORD,
  },
}

class EmailService {
    // #sender = sendgrid
    #sender = nodemailer
    #GenerateTemplate = Mailgen
    constructor(env) {
        switch (env) {
            case 'development':
                this.link = 'http://localhost:3000'
                break
            case 'production':
                this.link = 'link for production'
                break
            default:
                this.link = 'http://localhost:3000'
                break
        }
    }

    #createTemplateVerifyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'cerberus',
            product: {
                name: 'System contacts',
                link: this.link
            }
        });
        const email = {
            body: {
                name,
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with System contacts, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                }
            }
        };

        const emailBody = mailGenerator.generate(email)
        return emailBody
    }

    async sendVerifyEmail(verifyToken, email, name) {
        const transporter = this.#sender.createTransport(config)
        const emailOptions = {
            from: 'alinabovdyr@meta.ua',
            to: email,
            subject: 'Verify email',
            html: this.#createTemplateVerifyEmail(verifyToken, name),
        }

        transporter
            .sendMail(emailOptions)
            .then((info) => console.log(info))
            .catch((err) => console.log(err))
    }

    // async sendVerifyEmail(verifyToken, email, name) {
    //     this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

    //     const msg = {
    //     to: email,
    //     from: 'Sender из SendGrid -> Sender Management -> System contacts -> from email',
    //     subject: 'Verify email',
    //     html: this.#createTemplateVerifyEmail(verifyToken, name),
    //     }

    //     this.#sender.send(msg)
    // }
}

module.exports = EmailService
/**
 * Created by Seth on 8/17/2017.
 */
let https = require('https');
let nodemailer = require('nodemailer');
let config = require('../../config');

module.exports = {
    contactRelic: function(req, res){
        console.log(req.body);

        let transporter = nodemailer.createTransport({
           service: "Gmail", // true for 465, false for other ports
            auth: {
                user: 'seth@relicagency.com', // generated ethereal user
                pass: config.emailPassword  // generated ethereal password
            }
        });

        return res.status(200).send(req.body);
    }
};


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
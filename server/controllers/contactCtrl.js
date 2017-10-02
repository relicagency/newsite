
let nodemailer = require('nodemailer');
let config = require('../../config');

module.exports = {
    contactRelic: function(req, res){
        console.log(req.body);

        let transporter = nodemailer.createTransport({
           service: "Gmail",
            auth: {
                user: 'formsend@relicagency.com',
                pass: config.emailPassword
            }
        });

        let message = "Hey everyone, here is a contact request from the Relic site. \n" +
            "Name: " + req.body.firstName + " " + req.body.lastName + ".  \n" +
            "Job Title: " + req.body.jobTitle + ".  \n" +
            "Company: " + req.body.business + ".  \n" +
            "Email: " + req.body.email + ".  \n" +
            "Phone: " + req.body.phone + ".  \n" +
            "Message: " + req.body.message + ".";

        let mailOptions = {
            from: "formsend@relicagency.com",
            to: ["adam@relicagency.com", "jordan@relicagency.com", "barry@relicagency.com", "seth@relicagency.com"],
            subject: "Contact request from Relic form.",
            text: message
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if(err) {
                console.log(err);
                return res.status(401).send("Sorry, it looks like we were not able to complete your request.  Would you please look over your information and make sure everything's correct?")
            } else {
                console.log('message sent');
                return res.status(200).send('Awesome!  We\'ll get in touch with you as oon as we can!');
            }
        });

        return res.status(200).send(req.body);
    }
};

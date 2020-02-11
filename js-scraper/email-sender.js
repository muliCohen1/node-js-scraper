const nodemailer = require('nodemailer');

module.exports = function mailer(price_update) {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: '*********',
                            pass: '*********',
                        }
                    });

                    var mailOptions = {
                        from: '*********',
                        to: '*********',
                        subject: 'Price Update!',
                        text: price_update
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    }

const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
var async = require("async");
const nodemailer = require("nodemailer");
const User = require("../models/User")
var multer = require("multer");
const uuidv1 = require('uuid/v1');
users.use(cors())

process.env.SECRET_KEY = 'secret'

//REGISTER

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './propics');
    },

    filename: (req, file, cb) => {
        var filetype = '';
        console.log(file.mimetype)

        if (file.mimetype === 'image/jpg') {
            filetype = 'jpg';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpeg';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        cb(null, file.originalname + '-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: '10M',

    }
})

users.post('/register', (req, res) => {
    const today = new Date()
    console.log(req.body)
    const token = jwt.sign({  /*sign jwt means creating a token*/
        email: req.body.email,/*these are payloads*/

    },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'/*this is option*/
        })
    const userData = {
        user_type: req.body.user_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        contact_num: req.body.contact_num,
        email: req.body.email,
        password: req.body.password,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: req.body.resetPasswordExpires,
        tokenid: token,
        isActivated: false,
        created: today
    }
    console.log(userData)
    User.findOne({
        where: {
            email: req.body.email

        }

    })
        .then((user) => {
            console.log("user data ->>>>>>>>>>>>>>>")
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash;
                User.create(userData)
                    .then(user => {
                        let token = jwt.sign(user.dataValues,
                            process.env.SECRET_KEY,
                            {
                                expiresIn: 1440
                            });
                        res.json({ firstName: user.first_name, lastName: user.last_name, userId: user.id }); //REMOVE_THE_TOKEN_FROM_JSON

                        async function main() {                           //SEND_EMAIL_TO_GIVEN_USER_EMAIL
                            let transporter = nodemailer.createTransport({
                                host: "smtp.gmail.com",
                                auth: {
                                    user: "dilina5860717@gmail.com", // generated ethereal user
                                    pass: "##7@dilina" // generated ethereal password
                                }
                            });

                            // send mail with defined transport object
                            let info = await transporter.sendMail({
                                from: "dilina5860717@gmail.com", // sender address
                                to: req.body.email, // list of receivers
                                subject: "Active your itrack24✔", // Subject line
                                html: "<b>To Active your itrack24 Account, click this link</b>" + "http://localhost:4200/verify?token=" + token + "&email=" + userData.email// html body
                            });

                            console.log("Message sent: %s", info.messageId);

                        }

                        main().catch(console.error);

                    })
                    .catch(err => {
                        res.send('error' + err)
                    })
            } else {
                res.json({ error: 'USER_ALREADY_EXISTS' })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
})

//VERIFY_USER_ACCOUNT

users.get('/verify', (req, res) => {
    console.log(req.query.token);
    console.log(req.query.email);
    User.update({
        isActivated: true
    },
        {
            where: {
                email: req.query.email //UPDATE_IS_ACTIVATED_AS_TRUE
            }
        }).then((respond) => {
            console.log(respond)
            res.json(respond);
        })
});


// LOGIN
users.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({
        where: {
            email: req.body.email,
            isActivated: true
            //req.body kiyana eke thiyenne body parameters
            //req.query kiyana eke thiyenne query parameters
            //postman eken eeka select karala yawanna puluwan. query parameters enne url ekath ekkamai
            // body parameters enne request eke body ekath ekka
        }
    })
        .then(user => {
            if (user) {
                let id = user.id;
                console.log(id);
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({ token: token, firstName: user.first_name, lastName: user.last_name, userId: user.id })
                } else {
                    res.json({ error: 'INVALID_PASSWORD' })
                }
            } else {
                res.json({ error: 'USER_DOES_NOT_EXIST' })
            }
        })
        .catch(err => {
            res.send('error:' + err)
        })
})

//PROFILE
users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.json({ error: "USER_DOES_NOT_EXIST" })
            }
        })
        .catch(err => {
            res.send('error :' + err)
        })
})



//UPDATE PROFILE
users.post('/editprofile', (req, res) => {

    User.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        contact_num: req.body.contact_num,
        email: req.body.email
    }, {
        where: {
            id: req.body.id
        }
    })

    User.findOne({
        where: {
            email: req.body.email,

        }
    })
        .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.json({ token: token })
        })
        .catch(err => {
            res.send('error:' + err)
        })

})

/*forgotPassword*/
users.post('/forgot', (req, res, err) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                res.json({ message: 'NO_ACCOUNT_ASSOCIATED' });
            }

            else {
                var token = uuidv1();
                console.log(token);
                user.id = req.body.id;
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now();
                user.save((user) => {
                    res.json(user)
                });
                async function main() {
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        auth: {
                            user: "sandu8249@gmail.com", // generated ethereal user
                            pass: "V1d4thmw%" // generated ethereal password
                        }
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: "sandu8249@gmail.com", // sender address
                        to: req.body.email, // list of receivers
                        subject: "Hello ✔", // Subject line
                        html: "<b>Hello world?</b>" + "http://localhost:4200/reset-pass-token?token=" + token // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                    res.send({ token: token });
                }

                main().catch(console.error);
            }
        })
})


/*resetPassword*/

users.post('/reset', (req, res, err) => {
    console.log(req.query.token);
    User.findOne({
        where: {
            resetPasswordToken: req.query.token
        }
    })

        .then(user => {
            if (user) {
                //res.json({user});

                //user.password = req.query.password;
                bcrypt.hash(req.body.password, 10, (brr, hash) => {
                    if (brr) {
                        console.log(brr);
                        res.json({
                            Message: brr
                        })
                    }
                    else {
                        user.password = hash;
                        user.save()
                            .then(user => {
                                res.json(user);
                                console.log('password updated');
                            })
                            .catch(err => {
                                res.json(err);
                                console.log(err);
                            })
                    }
                })

            }
            else {
                res.json({
                    Message: 'Reset password token has expired'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })

})



module.exports = users


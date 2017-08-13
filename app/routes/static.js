/* Require Modules */
const moment   = require('moment');
const aws      = require('aws-sdk');
const sendGrid = require('sendgrid').mail;

/* Require Environment Variables if they don't exist */
if (!process.env.S3_BUCKET){
    require('../config/env.js');
}

module.exports = function(app) {

    /* Home Page */
    app.get('/', function(req, res) {
        res.render('static/index.ejs', {
            title : "Home",
        });
    });

    /* Sign S3 Requests */
    app.get('/sign-s3', function(req, res) {
        const S3_BUCKET = process.env.S3_BUCKET;
        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read' 
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
              console.log(err);
              return res.end();
            }
            const returnData = {
              signedRequest: data,
              url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };
            res.write(JSON.stringify(returnData));
            res.end();
        });
    });

    /* Contact Page */
    app.get('/contact-us', function(req, res) {
        res.render('static/contact.ejs', {
            title : "Contact Us",
        });
    });

    app.post('/contact-us', function(req, res) {
        var messageBody = "" + req.body.messageBody;
        var from_email = new sendGrid.Email("donotreply@nodetemplate.com");
        var to_email = new sendGrid.Email("adminuser@mydomain.com");
        var subject = "Contact Form";
        var content = new sendGrid.Content("text/plain", messageBody);
        var mail = new sendGrid.Mail(from_email, subject, to_email, content);
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            if (error){
                console.log(error);
            } else {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                res.redirect('/');
            }
        });        

    });

}; // end module export

const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// init app
const app = express();

const port = 3000;

// setting environment for devleopment
app.set('view engine', "ejs");
app.use(express.static("./public"));
app.use(express.static("./assets"));

app.listen(port, () => console.log('server started at port:' + port +"...."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.post("/send", (req, res)=>{
	console.log(req.body);

	// nodemailer code



// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    	host: 'smtp.gmail.com',
    	port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'rakathegreat81@gmail.com', // generated ethereal user
            pass: 'enter your password here'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"rakesh_sharma" <rakathegreat81@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: req.body.message, // plain text body
        html: req.body.message // html body
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

res.render('contact',{
	msg:"mail sent successfully!"
})
})






// file upload code



// set storage engine to tell the location to save uploaded file
const storage = multer.diskStorage({
	destination: "./public/uploads",
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + 
			path.extname(file.originalname));
	}
});

// this function will upload the and we can also add restriction for specific type of file and can also specify the size of file.
const upload = multer({
	storage: storage
}).single('myImage');


// these are the routes
// home page route
app.get('/', function (req, res) {
	// for file uploading app index instead of contact
	res.render('contact');
})

// uploading page route
app.post("/upload", (req, res) =>{
	upload(req, res, (err) =>{
		if (err) {	
			res.render('index',{
				msg: err
			})}
			else{
				res.render('index', {
					msg: 'fileuploaded',
					file: 'uploads/' + req.file.filename
				})
			}
		})
})

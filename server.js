const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

// set storage engine
const storage = multer.diskStorage({
	destination: "./public/uploads",
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + 
			path.extname(file.originalname));
	}
});


const upload = multer({
	storage: storage
}).single('myImage');

// init app
const app = express();

const port = 3000;

// ejs
app.set('view engine', "ejs");

app.use(express.static("./public"));

app.listen(port, () => console.log('server started at port:' + port +"...."));

app.get('/', function (req, res) {
	res.render('index');
})

app.post("/upload", (req, res) =>{
	upload(req, res, (err) =>{
		if (err) {	
			res.render('index',{
				msg: err
			})}
			else{
				console.log(req.file);
				res.send("test");
			}
		})
})

const File = require("../models/files");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amoghnagar1111@gmail.com",
    pass: "123Mamta@",
  },
});

exports.savefile = async (req, res, next) => {
  const file = new File({
    path: req.file.path,
    name: req.file.originalname,
    uuid: uuidv4(),
  });
  await file.save();
  transporter
    .sendMail({
      to: req.body.email,
      from: "amoghnagar1111@gmail.com",
      subject: "Signup Succedded!",
      html: `
    <h1>You successfully signed up</h1>
    <h3>Kindly go this <a href="http://localhost:5000/file/getfile/${file.uuid}">link</a> </h3>
    `,
    })
    .then((result) => {
      console.log("Email sent");
      res.redirect('/file/success')
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.uploadfile = (req, res, next) => {
  res.render("upload", { pageTitle: "File Upload", editing: false });
};

exports.getfile = (req, res, next) => {
  const uuid = req.params.uuid;
  console.log(uuid);
  File.find({ uuid: uuid })
    .then((file) => {
      res.download(`${__dirname}/../${file[0].path}`);
    })
    .catch((err) => {
      console.log(err);
    });
};



exports.success=(req,res,next)=>{
    res.render('success',{pageTitle:"Success"})
}
const File=require('../models/files')
const {v4:uuidv4}=require('uuid')
// {
//     fieldname: 'image',
//     originalname: 'Annotation 2021-09-04 162458.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'images',
//     filename: '0f29e80e-46f1-4ea4-a418-6121c5edfca5.Annotation 2021-09-04 162458.png',
//     path: 'images\\0f29e80e-46f1-4ea4-a418-6121c5edfca5.Annotation 2021-09-04 162458.png',
//     size: 291380
//   }

exports.savefile =async (req, res, next) => {
  const file=new File({
      path:req.file.path,
      name:req.file.originalname,
      uuid:uuidv4()
  })
  await file.save();
  res.redirect(`/file/getfile/${file.uuid}`)
};

exports.uploadfile = (req, res, next) => {
  res.render("upload", { pageTitle: "File Upload", editing: false });
};


exports.getfile=(req,res,next)=>{
 const uuid=req.params.uuid;
 console.log(uuid);
    File.find({uuid:uuid}).then(file=>{
        
        res.download(`${__dirname}/../${file[0].path}`)
    }).catch(err=>{
        console.log(err);
    })
}
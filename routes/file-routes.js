const router = require('express').Router()
const filecontroller=require('../controllers/file-controllers')
const fileupload=require('../middleware/file-upload')


router.get('/' ,filecontroller.uploadfile)

router.post('/upload',fileupload.single('image'),filecontroller.savefile)

router.get('/getfile/:uuid',filecontroller.getfile)

router.get('/success',filecontroller.success)

module.exports  = router
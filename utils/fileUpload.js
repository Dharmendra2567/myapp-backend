const multer = require('multer')

const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileDestination = 'public/uploads/'
        if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination,{recursive:true})
        }
        cb(null, fileDestination)
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        let filename = path.basename(file.originalname, ext)
// abc.jpeg -> ext: .jpeg , filename : abc
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, filename + '-' + uniqueSuffix + ext)
    }
})

const imageFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|JPG|JPEG|PNG|GIF|SVG|JFIF|jfif)/)){
        return cb(new Error("you can upload image file only"), false)
    }
    cb(null, true)
}

const upload = multer({ 
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 2000000
    }
 })

 module.exports = upload
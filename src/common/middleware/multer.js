import multer from "multer"
export const upload = () => {
    const storage = multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
    const fileFilter = (req, file, cb) => {
        const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"]
        if (!acceptedTypes.includes(file.mimetype)) {
            return cb(new Error("invalid image type"), false)
        }
        cb(null, true)
    }
    return multer({ storage, fileFilter })
}
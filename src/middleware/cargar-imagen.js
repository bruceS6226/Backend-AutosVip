const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const uuid = crypto.randomUUID();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
        cb(null, uuid + file.originalname.substring(file.originalname.lastIndexOf('.')));
    }
})

const fileFilter = (req, file, cb) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true)
    }
    return cb(null, false)
}

const maxSize = 5 * 1024 * 1024;
exports.subirImagen = (req, res, next) => {
    return multer({
        storage,
        limits: { fileSize: maxSize },
        fileFilter,
    }).single("foto")(req, res, (err) => {
        next();
    });
};

exports.actualizarImagen = (req, res, next) => {
    return multer({
        storage,
        limits: { fileSize: maxSize },
        fileFilter,
    }).single("foto")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json("Tamaño máximo de archivo permitido: 5MB");
            } else {
                return res.status(400).json("Error al subir el archivo");
            }
        }
        if (err) {
            return res.status(400).json(err.message);
        }
        if (!req.file) {
            return res.status(400).json({
                msg: "No se ha subido ningún archivo. Recuerda que solo puedes subir formatos .jpeg, .jpg, .png y .gif.",
            });
        }
        next();
    });
};

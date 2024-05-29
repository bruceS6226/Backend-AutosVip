const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
        const uuid = crypto.randomUUID();
        cb(null, uuid + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    if (fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};

const maxSize = 5 * 1024 * 1024;
const upload = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
});

exports.subirImagen = (req, res, next) => {
    return upload.single('foto')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json('Tamaño máximo de archivo permitido: 5MB');
            } else {
                return res.status(400).json('Error al subir el archivo');
            }
        }
        if (err) {
            return res.status(400).json(err.message);
        }
        next();
    });
};

exports.actualizarImagen = (req, res, next) => {
    return upload.single('foto')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json('Tamaño máximo de archivo permitido: 5MB');
            } else {
                return res.status(400).json('Error al subir el archivo');
            }
        }
        if (err) {
            return res.status(400).json(err.message);
        }
        if (!req.file) {
            return res.status(400).json({
                msg: 'No se ha subido ningún archivo. Recuerda que solo puedes subir formatos .jpeg, .jpg, .png y .gif.',
            });
        }
        next();
    });
};

exports.subirMultiplesImagenes = (req, res, next) => {
    return upload.array('fotos', 5)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json('Tamaño máximo de archivo permitido: 5MB por archivo');
            } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json('Solo se permiten un máximo de 5 archivos');
            } else {
                return res.status(400).json('Error al subir los archivos');
            }
        }
        if (err) {
            return res.status(400).json(err.message);
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                msg: 'No se ha subido ningún archivo. Recuerda que solo puedes subir formatos .jpeg, .jpg, .png y .gif.',
            });
        }
        next();
    });
};

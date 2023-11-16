import express from 'express';
const router = express.Router();
import multer from 'multer';

import FormController from '../contollers/formController.js';

// Set up multer storage and file filter
const storage = multer.diskStorage({});
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedMimeTypes = [
    'image/jpg',
    'image/gif',
    'image/jpeg',
    'image/png',
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error = new Error('Please provide a valid image file');
    error.code = 'LIMIT_UNEXPECTED_FILE';
    return cb(error, false);
  }
  cb(null, true);
};

// Create a multer upload instance
const upload = multer({
     storage,
     fileFilter,
     limits: { fileSize: 1024 * 1024 * 30 },
   })


router
.route('/')
.post(upload.single('image'),FormController.create);


router
.route('/')
.get(FormController.allForms);



router
.route('/:id')
.get(FormController.oneForm);


export default router;
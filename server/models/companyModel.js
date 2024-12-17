import { upload } from '../middleware/multerMiddleware.js';
const companySchema = {
  file: {
    type: upload.single('file'),
    required: true,
    message: 'Logo file is required.'
  },
  name: {
    type: String,
    required: true,
    message: 'A company name is required.'
  },
  status: {
    type: String,
    required: true,
    message: 'Please specify the status (Active or Inactive)',
  },
}

export default companySchema;

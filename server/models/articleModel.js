const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[^\s]*)?$/;

const articleSchema = {
  company: {
    ref: 'Company',
    required: true,
    message: 'A related company is required.'
  },
  image: {
    type: File,
    required: true,
    message: 'Image file is requried.'
  },
  title: {
    type: String,
    required: true,
    message: 'A title is required.'
  },
  link: {
    type: String,
    required: true,
    message: 'A link is required.',
    validate: {
      regex: urlRegex,
      message: 'Invalid URL format.',
    },
  },
  content: {
    type: String,
    required: true,
    message: 'Content is required.'
  },
}

export default articleSchema

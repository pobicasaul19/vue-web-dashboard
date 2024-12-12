const companySchema = {
  logo: {
    type: File,
    required: true,
    message: 'A logo URL is required.'
  },
  name: {
    type: String,
    required: true,
    message: 'A company name is required.'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    message: 'A status is required.'
  },
}

module.exports = { companySchema };

const userSchema = {
  firstName: {
    type: String,
    required: true,
    message: 'Please add your first name',
  },
  lastName: {
    type: String,
    required: true,
    message: 'Please add your last name'
  },
  type: {
    type: String,
    enum: ['Writer', 'Editor'],
    required: true,
    message: 'Please specify the type (Writer or Editor)'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true,
    message: 'Please specify the status (Active or Inactive)',
  },
}

module.exports = { userSchema }

const validateField = (field, value, schema) => {
  const schemaField = schema[field];

  if (!schemaField) {
    throw new Error(`Field "${field}" is not defined in the schema.`);
  }

  const { required, message, validate } = schemaField;

  return required && !value
    ? message
    : validate?.regex && !validate.regex.test(value)
      ? validate.message
      : null
};

const validationMessage = (data, schema) => {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const message = validateField(field, data[field], schema);
    message ? errors[field] = message : null;
  });

  return errors;
};

module.exports = { validationMessage };

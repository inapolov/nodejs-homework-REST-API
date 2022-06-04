const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(res.status(400).json({ "message": "missing required field" }));
    }
    next();
  }
};

module.exports = {
    validateRequest
};
const validateBodyMiddleware =
  ({validateFunction}) =>
  async (req, res, next) => {
    try {
      const validationResult = await validateFunction(req.body);

      if (validationResult?.errors) {
        return res.status(400).json({
          status: 400,
          message: validationResult.errors,
        });
      }

      // Replace the original request property with the validated parameters
      if (validationResult?.parameters) req.body = validationResult.parameters;

      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = validateBodyMiddleware;

export function get404(req, res, next) {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
}
export function get500(err, req, res, next) {
  const data = err.data;
  res.status(err.statusCode || 500).send({ errors: [{ message: err.message, data: data }] });
}

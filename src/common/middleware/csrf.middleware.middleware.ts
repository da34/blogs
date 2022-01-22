export function csrfMiddleware(req, res, next) {
  res.cookie('CSRF-TOKEN', req.csrfToken());
  next();
}

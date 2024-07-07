export const guestMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization)
    return res
      .status(403)
      .json({ msg: "Has Authenticated/Unauthorized", success: false });

  next();
};

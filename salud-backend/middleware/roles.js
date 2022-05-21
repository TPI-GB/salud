const rolMiddleware = (rolesWithAccess) => {
  return (req, res, next) => {
    let { roles } = req.user;
    if (
      rolesWithAccess.length &&
      !rolesWithAccess.some((x) => roles.includes(x))
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      next();
    }
  };
};

module.exports = rolMiddleware;

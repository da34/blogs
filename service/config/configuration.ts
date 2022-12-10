export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  util: {
    enPwdSecretKey: process.env.USER_SECRET_KEY,
  },
});

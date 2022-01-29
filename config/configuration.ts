export default () => ({
  dataBase: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    pwd: process.env.DB_PASSWORD || 'root',
    base: process.env.DB_NAME,
    sync: process.env.DB_SYNCHRONIZE || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  hw: {
    user: process.env.HW_USER_NAME,
    pwd: process.env.HW_USER_PASSWORD,
    domainName: process.env.HW_USER_DOMAIN_NAME,
    scopeProjectName: process.env.HW_SCOPE_PROJECT_NAME,
  },
  site: {
    name: process.env.SITE_NAME || '个人博客',
    url: process.env.SITE_URL,
    email: process.env.SITE_EMAIL,
  },
  qiniu: {
    url: process.env.QINIU_URL,
    area: process.env.QINIU_AREA,
    zone: process.env.QINIU_ZONE,
    publicKey: process.env.QINIU_PUBLIC_KEY,
    privateKey: process.env.QINIU_PRIVATE_KEY,
  },
  util: {
    enPwdSecretKey: process.env.USER_SECRET_KEY,
  },
});

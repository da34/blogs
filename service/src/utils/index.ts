import { createHash } from 'crypto';

export const checkNullObj = (obj: object): boolean => {
  if (obj == null) return true;
  return Object.keys(obj).length === 0;
};

// md5加密
export const md5 = (content) => {
  const md5 = createHash('md5');
  return md5.update(content).digest('hex');
};

// 加密函数
export const enPassword = (password, secret) => {
  const str = `password=${password}&secret=${secret}`;
  return md5(str);
};

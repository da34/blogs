import * as fs from 'fs';
import * as path from 'path';
const isProd = process.env.NODE_ENV === 'production';
export default () => {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }
  // console.log(localEnv, prodEnv);
  const filePath = isProd ? prodEnv : localEnv;

  return { filePath };
};

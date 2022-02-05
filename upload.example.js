const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')
const cdn = {
  ak: 'xxx',
  sk: 'xxx',
  host: 'xxx',
  bucket: 'xxx'
}

const { ak, sk, bucket } = cdn

const mac = new qiniu.auth.digest.Mac(ak, sk)
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z2
// 是否使用https域名
config.useHttpsDomain = true

// 封装上传方法
const doUpload = (key, file) => {
  key = 'blog/static/' + key
  const options = {
    scope: bucket + ':' + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  return new Promise((resolve, reject) => {
    // 文件上传
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.status === 200) {
        resolve(body)
      } else {
        resolve(body)
      }
    })
  })
}

const staticPath = path.join(__dirname, './.nuxt/dist/client')

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(key, filePath)
      .then(res => console.log('成功上传: ', res))
      .catch(err => console.log(err))
  })
}
uploadAll(staticPath)

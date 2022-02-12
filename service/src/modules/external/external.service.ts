import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import * as qiniu from 'qiniu';

@Injectable()
export class ExternalService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Cron('59 59 23 * * *')
  async fetchHitokoto() {
    // 先获取缓存里面的
    const hitokoto = await this.cacheManager.get('hitokoto');
    if (hitokoto) {
      return hitokoto;
    }
    // 没有缓存的逻辑
    const hitokotoOb = this.httpService.get('https://v1.hitokoto.cn', {
      responseType: 'json',
    });
    const { data } = await lastValueFrom(hitokotoOb);
    // 设置缓存 过期时间 一天
    await this.cacheManager.set('hitokoto', data, { ttl: 60 * 60 * 23 });
    return data;
  }

  async fetchHWToken() {
    // 先获取缓存里面的
    const hwToken = await this.cacheManager.get('hw_token');
    if (hwToken) {
      return hwToken;
    }

    // 没有缓存的逻辑
    const data = {
      auth: {
        identity: {
          methods: ['password'],
          password: {
            user: {
              name: this.configService.get('HW_USER_NAME'),
              password: this.configService.get('HW_USER_PASSWORD'),
              domain: {
                name: this.configService.get('HW_USER_DOMAIN_NAME'),
              },
            },
          },
        },
        scope: {
          project: {
            name: this.configService.get('HW_SCOPE_PROJECT_NAME'),
          },
        },
      },
    };
    const resOb = this.httpService.post(
      'https://iam.cn-north-1.myhuaweicloud.com/v3/auth/tokens',
      data,
    );
    const res = await lastValueFrom(resOb);
    const token = res.headers['x-subject-token'];

    // 设置缓存 过期时间 一天
    await this.cacheManager.set('hw_token', token, { ttl: 60 * 60 * 23 });

    return token;
  }

  async checkText(text) {
    const token = await this.fetchHWToken();
    const postData = {
      categories: ['politics', 'porn', 'ad', 'abuse'],
      items: [
        {
          text,
        },
      ],
    };

    const resOb = this.httpService.post(
      'https://moderation.cn-north-4.myhuaweicloud.com/v1.0/moderation/text',
      postData,
      {
        dataType: 'json',
        headers: {
          // @ts-ignore
          'X-Auth-Token': token,
        },
        contentType: 'json',
        data: postData,
      },
    );

    const { data } = await lastValueFrom(resOb);
    // console.log(data);
    return data;
  }

  async fetchQNToken() {
    const url = this.configService.get('QINIU_URL');
    const area = this.configService.get('QINIU_AREA');
    const publicKey = this.configService.get('QINIU_PUBLIC_KEY');
    const privateKey = this.configService.get('QINIU_PRIVATE_KEY');
    const mac = new qiniu.auth.digest.Mac(publicKey, privateKey);
    const options = {
      scope: area,
      returnBody: `{"url":"${url}/$(key)","hash":"$(etag)", "fileName":"$(key)"}`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
  }
}

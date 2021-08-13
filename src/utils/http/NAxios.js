import axios from 'axios';
import {cloneDeep, isFunction} from 'lodash-es';

/**
 * @description:  axios模块
 */
export class NAxios {
  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this._setupInterceptors();
  }

  _getTransform() {
    const {transform} = this.options;
    return transform;
  }

  /**
   * @description: 拦截器配置
   */
  _setupInterceptors() {
    const transform = this._getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    });

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
    isFunction(responseInterceptorsCatch) &&
    this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  /**
   * @description:   请求方法
   */
  request(config, options) {
    let conf = cloneDeep(config);
    const transform = this._getTransform();
    const {requestOptions} = this.options;

    const opt = Object.assign({}, requestOptions, options);

    const {transformResponseData} = transform || {};
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res);
          if (transformResponseData && isFunction(transformResponseData) && !isCancel) {
            const ret = transformResponseData(res, opt);
            return resolve(ret);
          }
          reject(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

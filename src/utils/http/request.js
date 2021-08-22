import axios from 'axios';
import httpEnum from './http-type'
import router from '@/router';
import {useUserStore} from '@/stores/modules/user'
import {storage} from '@/utils/Storage';
import {NAxios} from './NAxios'
import {checkStatus} from "./checkStatus";

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
  /**
   * @description: 处理响应数据
   */
  transformResponseData: (res, options) => {
    const {$message} = window;
    const {
      isTransformResponse,
      isShowSuccessMessage
    } = options;

    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    const reject = Promise.reject;

    const {data} = res;

    if (!data) {
      return reject(data);
    }

    //  这里 code，result，message为后台统一的字段，根据项目自定义
    const {code, result, message} = data;
    // 请求成功
    const hasSuccess = data && code === httpEnum.SUCCESS;
    // 是否显示提示信息
    if (isShowSuccessMessage) {
      if (hasSuccess) {
        // 是否显示自定义信息提示
        $message.success(message || '操作成功！');
      } else {
        // 是否显示自定义信息提示
        $message.error(message || '操作失败！');
      }
    }

    // 接口请求成功，直接返回结果
    if (code === httpEnum.SUCCESS) {
      return result;
    }

    // 接口请求错误，统一提示错误信息
    if (code === httpEnum.ERROR && !isShowSuccessMessage) {
      if (message) {
        $message.error(data.message);
        return reject(new Error(message));
      } else {
        const msg = '操作失败,系统异常!';
        $message.error(msg);
        return reject(new Error(msg));
      }
      // return
    }

    // 这里逻辑可以根据项目进行修改
    // if (!hasSuccess) {
    //   return reject(new Error(message));
    // }

    return data;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    const userStore = useUserStore();
    const token = userStore.getToken;
    const csrfToken =  storage.getCookie('csrfToken')
    if (token) {
      // jwt token
      config.headers['yujie-token'] = token;
      config.headers['yu-csrf-token'] = csrfToken;
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error) => {
    const {$message: Message, $dialog: Modal} = window;
    const {response, code, message} = error || {};
    // TODO 此处要根据后端接口返回格式修改
    const msg = response && response.data && response.data.message ? response.data.message : '';
    // const err = error.toString();
    // try {
    //   Message.error(err);
    // } catch (error) {
    //   throw new Error(error);
    // }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg, Message);
    } else {
      console.warn(error, '请求被取消！');
    }
    return error;
  },
};
const Axios = new NAxios({
  timeout: 10 * 1000,
  // 接口前缀
  baseURL: import.meta.env.VITE_GLOB_API_URL_BASE,
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 需要对返回数据进行处理
    isTransformResponse: true
  },
  // withCredentials: true,
});

export default Axios;

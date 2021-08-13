import {defineStore} from 'pinia';
import {createStorage} from '@/utils/Storage';
import {store} from '@/stores';
import {ACCESS_TOKEN} from '@/stores/mutation-types';
import {getUserInfo, login} from '@/api/system/user';
import httpEnum from '@/utils/http/http-type'

const Storage = createStorage({storage: localStorage});
export const useUserStore = defineStore('app-user', {
  state: () => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    avatar: '',
    permissions: [],
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getAvatar() {
      return this.avatar;
    },
    getNickname() {
      return this.username;
    },
    getPermissions() {
      return this.permissions;
    },
    getUserInfo() {
      return this.info;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setAvatar(avatar) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // 登录
    async login(userInfo) {
      try {
        const response = await login(userInfo);
        const {result, code} = response;
        if (code === httpEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          Storage.set(ACCESS_TOKEN, result.token, ex);
          this.setToken(result.token);
          this.setUserInfo(result);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    // 获取用户信息
    GetInfo() {
      const that = this;
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res;
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions;
              that.setPermissions(permissionsList);
              that.setUserInfo(result);
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'));
            }
            that.setAvatar(result.avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo('');
      Storage.remove(ACCESS_TOKEN);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
// export function useUserStoreWidthOut() {
//   return useUserStore(store);
// }

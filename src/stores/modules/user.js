import {defineStore} from 'pinia';
import {storage} from '@/utils/Storage';
import {store} from '@/stores';
import {ACCESS_TOKEN} from '@/stores/mutation-types';
import {getUserInfo, login} from '@/api/system/user';
import httpEnum from '@/utils/http/http-type'

// const Storage = createStorage();
export const useUserStore = defineStore('app-user', {
  state: () => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    avatar: '',
    permissions: [],
  }),
  getters: {
    getToken() {
      return this.token;
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    },
    setAvatar(avatar) {
      this.avatar = avatar;
    },
    setUsername(username) {
      this.username = username;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    // 登录
    async login(userInfo) {
      try {
        const response = await login(userInfo);
        const {result, code} = response;
        if (code === httpEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          storage.set(ACCESS_TOKEN, result.token, ex);
          this.setToken(result.token);
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
            const { permissions, avatar, username } = result
            if (permissions) {
              that.setPermissions(permissions);
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'));
            }
            // console.log(permissions, avatar, username)
            that.setAvatar(avatar);
            that.setUsername(username);
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
      storage.remove(ACCESS_TOKEN);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreOut() {
  return useUserStore(store);
}

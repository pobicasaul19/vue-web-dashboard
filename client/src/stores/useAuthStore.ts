import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthUser, User } from '../models/User';

export const useAuthStore = defineStore('auth', () => {
  // State
  const userInfo = ref<AuthUser['userInfo']>(null);
  const token = ref<AuthUser['token']>(null);

  // Getters
  const isEditor = computed(() => userInfo.value?.type === 'editor')
  const isAuthenticated = computed(() => !!userInfo.value && !!token.value);
  const getUserInfo = computed(() => userInfo.value);
  const getUserById = (_id: number) => computed(() => userInfo.value?._id === _id);
  const getUsername = computed(() => `${userInfo.value?.firstName} ${userInfo.value?.lastName}`);

  // Actions
  const setUserInfo = (user: User) => {
    userInfo.value = user;
  };
  const setToken = (newToken: string) => {
    token.value = newToken;
  };
  const logout = () => {
    userInfo.value = null;
    token.value = null;
  };

  return {
    userInfo,
    token,
    isEditor,
    isAuthenticated,
    getUserInfo,
    getUserById,
    getUsername,
    setUserInfo,
    setToken,
    logout,
  };
},
  {
    persist: true
  }
);

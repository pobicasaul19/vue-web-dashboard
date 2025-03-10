import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthUser, User } from '../models/User';

export const useAuthStore = defineStore(
  'auth',
  () => {
    // State
    const userInfo = ref<AuthUser['userInfo']>(null);
    const token = ref<AuthUser['token']>(null);

    // Getters
    const isAdmin = computed(() => userInfo.value?.type === 'administrator');
    const isAuthenticated = computed(() => !!userInfo.value && !!token.value);
    const getUserInfo = computed(() => userInfo.value);
    const getUserById = (uuid: string) => computed(() => userInfo.value?.uuid === uuid);
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
      isAdmin,
      isAuthenticated,
      getUserInfo,
      getUserById,
      getUsername,
      setUserInfo,
      setToken,
      logout
    };
  },
  {
    persist: true
  }
);

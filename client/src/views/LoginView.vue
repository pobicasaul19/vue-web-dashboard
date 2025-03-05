<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';
import { useToast } from 'primevue/usetoast';
import LoginService from '../services/LoginService';
import type { loginData } from '../models/Authentication';
import type { User } from '../models/User';
import { joinDataError } from '../utils';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const form = ref<loginData>({
  email: '',
  password: ''
});
const errorValue = ref<Record<string, any>>({
  email: '',
  password: ''
});

interface DataResponse {
  user: User;
  token: string;
}

const handleSuccess = ({ token, user }: DataResponse) => {
  authStore.setUserInfo(user);
  authStore.setToken(token);
  toast.add({
    severity: 'success',
    summary: 'Login Successful',
    detail: 'You have been successfully logged in.'
  });
  setTimeout(() => {
    router.push('/');
  }, 1500);
};

const loading = ref(false);
const login = async () => {
  loading.value = true;
  try {
    const response = await LoginService.validateLogin(form.value);
    const value = {
      email: null,
      password: null
    };
    errorValue.value = { ...value };
    handleSuccess(response);
  } catch (error: any) {
    const err = error.response.data.data;
    const errors = {
      email: joinDataError(err, 'email'),
      password: joinDataError(err, 'password')
    };
    errorValue.value = { ...errors };
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <app-mode />
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <form class="border p-10 rounded-lg shadow-sm space-y-6 w-96" @submit.prevent="login">
      <div class="w-full">
        <InputText
          id="email"
          v-model="form.email"
          type="name"
          placeholder="user@email.com"
          class="w-full"
        />
        <small v-if="errorValue.email" class="text-red-600">{{ errorValue.email }}</small>
      </div>
      <div class="w-full">
        <Password
          id="password"
          v-model="form.password"
          type="password"
          toggle-mask
          class="w-full"
          placeholder="Password"
          :feedback="false"
        />
        <small v-if="errorValue.password" class="text-red-600">{{ errorValue.password }}</small>
      </div>
      <div class="flex items-center justify-center">
        <Button
          type="submit"
          :loading="loading"
          :label="loading ? '' : 'Login'"
          style="text-align: left; padding: 15px"
          class="rounded w-[18rem] !text-center"
        />
      </div>
    </form>
    <Toast />
  </div>
</template>

<style lang="scss">
.p-password {
  input {
    width: 100%;
  }
}
</style>

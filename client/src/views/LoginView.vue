<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import { useToast } from 'primevue/usetoast'
import LoginService from '../services/LoginService'
import type { loginData } from '../models/Authentication'
import type { User } from '../models/User'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref<loginData>({
  userName: '',
  password: ''
})

interface DataResponse {
  user: User
  token: string
}

const handleSuccess = ({ token, user }: DataResponse) => {
  authStore.setUserInfo(user)
  authStore.setToken(token)
  toast.add({
    severity: 'success',
    summary: 'Login Successful',
    detail: 'You have been successfully logged in.'
  })
  setTimeout(() => {
    router.push('/')
  }, 1500)
}

const loading = ref(false)
const login = async () => {
  loading.value = true
  try {
    const response = await LoginService.validateLogin(form.value)
    handleSuccess(response)
  } catch (error: any) {
    console.log(error)
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.response.data.message,
      life: 3000
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <app-mode />
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <form @submit.prevent="login" class="border p-10 rounded-lg shadow-sm space-y-6">
      <FloatLabel>
        <InputText id="username" type="name" v-model="form.userName" class="mt-1 block w-full" />
        <label class="block" for="username">Username</label>
      </FloatLabel>
      <FloatLabel class="w-full">
        <Password
          id="password"
          type="password"
          v-model="form.password"
          toggleMask
          class="w-full"
          :feedback="false"
        />
        <label for="password">Password</label>
      </FloatLabel>
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

<style lang='scss'>
.p-password {
  input {
    width: 100%;
  }
}
</style>
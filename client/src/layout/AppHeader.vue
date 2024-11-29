<script setup lang='ts'>
import router from '../router'
import { useLayout } from './layout'
import { useAuthStore } from '../stores/useAuthStore'
import { ref } from 'vue'

const { toggleDarkMode, isDarkTheme } = useLayout()

const op = ref()
const menu = ref([
  {
    label: 'Dashboard',
    to: '/'
  },
  {
    label: 'All Media',
    to: '/media'
  }
])

const authStore = useAuthStore()
const logout = () => {
  authStore.logout()
  router.push('/account/login')
}
const user = ref({
  name: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`,
  type: authStore.userInfo?.type
})
const toggle = (e: Event) => {
  op.value.toggle(e)
}
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-container space-x-6">
      <template v-for="item in menu" :key="item">
        <router-link :to="item.to">
          {{ item.label }}
        </router-link>
      </template>
    </div>

    <div class="layout-topbar-menu">
      <div class="layout-topbar-action">
        <i
          @click="toggleDarkMode"
          :class="['layout-topbar-actions pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"
        />
        <div class="layout-topbar-actions">
          <i class="pi pi-user" @click="toggle" />
        </div>
      </div>
    </div>
  </div>
  <Popover ref="op">
    <div class="flex flex-col space-y-4">
      <div class="flex item-center space-x-5">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=female"
          style="width: 32px"
          class="rounded-full"
        />
        <div class="flex flex-col">
          <span class="font-medium capitalize">{{ user.name }}</span>
          <span class="capitalize text-sm text-gray-500">{{ user.type }}</span>
        </div>
      </div>
      <Button class="w-full" @click="logout" label="Logout" />
    </div>
  </Popover>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CompanyService from '../services/CompanyService'
import type { Company } from '../models/Company'
import { useAuthStore } from '../stores/useAuthStore'

const authStore = useAuthStore()

const companies = ref<Company[]>([])
const loading = ref(true)
const images = ref([] as { logo: string; name: string; status: string }[])
const onGetCompanies = async () => {
  loading.value = true
  try {
    const data = await CompanyService.getCompanies()
    companies.value = data
    images.value = companies.value.map((company) => ({
      _id: company._id,
      logo: company.logo,
      name: company.name,
      status: company.status
    }))
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  onGetCompanies()
})
</script>

<template>
  <div class="flex flex-col space-y-10">
    <app-user v-if="authStore.isEditor" />
    <app-companies
      v-if="authStore.isEditor"
      :onGetCompany="onGetCompanies"
      :company="companies"
      :images="images"
      :loading="loading"
    />

    <app-articles v-if="companies.length > 0" :onGetData="onGetCompanies" :company="companies" />
  </div>
</template>

<style>
</style>

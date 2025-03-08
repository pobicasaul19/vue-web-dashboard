<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CompanyService from '../services/CompanyService';
import type { Company } from '../models/Company';
import { useAuthStore } from '../stores/useAuthStore';

const authStore = useAuthStore();
const companies = ref<Company[]>([]);
const loading = ref(true);
const images = ref([] as { logo: string; name: string; status: string }[]);
const onGetCompanies = async () => {
  loading.value = true;
  try {
    const data = await CompanyService.getCompanies();
    companies.value = data;
    images.value = companies.value.map((company) => ({
      uuid: company.uuid,
      logo: company.logo,
      name: company.name,
      status: company.status
    }));
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onGetCompanies();
});
</script>

<template>
  <div class="flex flex-col space-y-10">
    <AppUser v-if="authStore.isAdmin" />
    <AppCompanies
      v-if="authStore.isAdmin"
      :onGetCompany="onGetCompanies"
      :company="companies"
      :images="images"
      :loading="loading"
    />

    <AppArticles
      v-if="companies.length > 0"
      :onGetData="onGetCompanies"
      :company="companies"
      :isLoading="loading"
    />
  </div>
</template>

<style></style>

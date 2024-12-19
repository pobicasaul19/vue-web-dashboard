<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CompanyService from '../services/CompanyService';
import type { Company } from '../models/Company';

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
    <AppUser />
    <AppCompanies
      :on-get-company="onGetCompanies"
      :company="companies"
      :images="images"
      :loading="loading"
    />

    <AppArticles
      v-if="companies.length > 0"
      :on-get-data="onGetCompanies"
      :company="companies"
      :is-loading="loading"
    />
  </div>
</template>

<style></style>

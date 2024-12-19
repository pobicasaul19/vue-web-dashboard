<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { status } from '../utils';
import CompanyService from '../services/CompanyService';
import type { Company, CompanyPayload } from '../models/Company';

const props = defineProps<{
  onGetCompany: () => void;
  images: Company[];
  loading: boolean;
}>();

const companyForm = reactive<Record<string, any>>({
  name: '',
  status: ''
});

const itemFields = [
  {
    type: 'file',
    label: 'Logo',
    model: 'file'
  },
  {
    type: 'input',
    label: 'Name',
    model: 'name'
  },
  {
    type: 'select',
    label: 'Status',
    model: 'status',
    options: status
  }
];
const errorFields = {
  file: '',
  name: '',
  status: ''
};

const editCompany = ref(false);
const createCompany = ref(false);
const onClickOpenEdit = (data: CompanyPayload) => {
  editCompany.value = true;
  Object.assign(companyForm, data);
};
const onClickOpenCreate = () => {
  createCompany.value = true;
};
</script>

<template >
  <div class="space-y-5">
    <h1 class="text-3xl font-medium">Company Management</h1>
    <AppButton :editor="true" :on-click="onClickOpenCreate" label="Create Company" />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Card v-for="(item, i) in images" :key="i">
        <template #header>
          <div class="h-96 flex items-center justify-end">
            <ProgressSpinner v-if="props.loading" />
            <Image v-else :src="item.logo" :alt="item.name" preview class="p-5 w-full h-full" />
          </div>
        </template>
        <template #title>
          <p class="flex flex-col items-start sm:items-center sm:flex-row sm:space-x-1">
            <span class="capitalize"> {{ item.name }} - </span>
            <span
              :class="[
                'text-base capitalize',
                item.status === 'active' ? 'text-green-600' : 'text-red-600'
              ]"
            >
              {{ item.status }}
            </span>
          </p>
        </template>

        <template #footer>
          <Button label="Edit" severity="info" class="w-36" @click="onClickOpenEdit(item)" />
        </template>
      </Card>
    </div>
  </div>

  <AppForm
    :showModal="createCompany"
    :header="'Create New Company'"
    :formData="companyForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :onGetData="props.onGetCompany"
    :create="CompanyService.addCompany"
    mode="create"
    name="Company"
    @close="createCompany = false"
  />

  <AppForm
    :showModal="editCompany"
    :header="'Edit Company Details'"
    :formData="companyForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :onGetData="props.onGetCompany"
    :update="CompanyService.updateCompany"
    :uuid="companyForm.uuid"
    mode="edit"
    name="Company"
    @close="editCompany = false"
  />
</template>

<style lang="scss">
.p-image {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>

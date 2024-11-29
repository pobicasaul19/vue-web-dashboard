<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { status } from '../utils/types'
import CompanyService from '../services/CompanyService'
import type { Company } from '../models/Company'

const props = defineProps<{
  onGetCompany: () => void
  images: Company[]
  loading: boolean
}>()

const companyForm = reactive<Record<string, any>>({
  logo: '',
  name: '',
  status: ''
})

const itemFields = [
  {
    type: 'input',
    label: 'Logo',
    model: 'logo'
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
]

const editCompany = ref(false)
const createCompany = ref(false)

const onClickOpenEdit = (data: Company) => {
  editCompany.value = true
  Object.assign(companyForm, data)
}

const onClickOpenCreate = () => {
  createCompany.value = true
}
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-3xl font-medium">Company Management</h1>
    <app-button :editor="true" :onClick="onClickOpenCreate" label="Create Company" />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Card v-for="(item, i) in images" :key="i">
        <template #header>
          <div class="h-96 flex items-center justify-end">
            <ProgressSpinner v-if="props.loading" />
            <Image :src="item.logo" :alt="item.name" preview class="p-5 w-full h-full" v-else />
          </div>
        </template>
        <template #title>
          <p class="flex flex-col items-start sm:items-center sm:flex-row sm:space-x-1">
            <span> {{ item.name }} - </span>
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
          <Button @click="onClickOpenEdit(item)" label="Edit" severity="info" class="w-36" />
        </template>
      </Card>
    </div>
  </div>

  <Dialog
    v-model:visible="createCompany"
    modal
    header="Create New Company"
    :style="{ width: '40rem' }"
  >
    <AppForm
      :formData="companyForm"
      :itemFields="itemFields"
      :onGetData="props.onGetCompany"
      :create="CompanyService.addCompany"
      mode="create"
      name="Company"
      @close="createCompany = false"
    />
  </Dialog>

  <Dialog v-model:visible="editCompany" modal header="Update Company" :style="{ width: '40rem' }">
    <AppForm
      :formData="companyForm"
      :itemFields="itemFields"
      :onGetData="props.onGetCompany"
      :update="CompanyService.updateCompany"
      :_id="companyForm._id"
      mode="edit"
      name="Company"
      @close="editCompany = false"
    />
  </Dialog>
</template>


<style lang='scss'>
.p-image {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>

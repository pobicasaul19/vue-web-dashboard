<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import UserService from '../services/UserService';
import type { User, UserPayload } from '../models/User';
import { type, status } from '../utils';

const userForm = reactive<Record<string, any>>({
  firstName: '',
  lastName: '',
  type: '',
  status: ''
});

const resetUserForm = () => {
  userForm.firstName = '';
  userForm.lastName = '';
  userForm.type = '';
  userForm.status = '';
};

const itemFields = [
  {
    type: 'input',
    label: 'Firstname',
    model: 'firstName'
  },
  {
    type: 'input',
    label: 'Lastname',
    model: 'lastName'
  },
  {
    type: 'select',
    label: 'Type',
    model: 'type',
    options: type
  },
  {
    type: 'select',
    label: 'Status',
    model: 'status',
    options: status
  }
];

const errorFields = {
  firstName: '',
  lastName: '',
  type: '',
  status: ''
};

const editUser = ref(false);
const createUser = ref(false);
const onClickOpenEdit = (data: UserPayload) => {
  editUser.value = true;
  Object.assign(userForm, data);
};
const onClickOpenCreate = () => {
  createUser.value = true;
  resetUserForm();
};

const users = ref<User[]>([]);
const loading = ref(true);
const onGetUsers = async () => {
  loading.value = true;
  try {
    const data = await UserService.getUsers();
    users.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onGetUsers();
});
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-3xl font-medium">User Management</h1>
    <AppButton :editor="true" @click="onClickOpenCreate" label="Create User" />
    <DataTable :value="users" table-style="min-width: 50rem" class="capitalize datatable-container">
      <template #empty>
        <Skeleton v-if="loading" />
        <p v-else class="text-center">No data available</p>
      </template>
      <Column field="firstName" header="Firstname" />
      <Column field="lastName" header="Lastname" />
      <Column field="type" header="Type" />
      <Column field="status" header="Status" />
      <Column field="" header="Action">
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil cursor-pointer"
            severity="secondary"
            rounded
            @click="onClickOpenEdit(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <AppForm
    :showModal="createUser"
    :header="'Create New User'"
    :formData="userForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :onGetData="onGetUsers"
    :create="UserService.addUser"
    mode="create"
    name="User"
    @close="createUser = false"
  />

  <AppForm
    :showModal="editUser"
    :header="'Edit User Details'"
    :formData="userForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :onGetData="onGetUsers"
    :update="UserService.updateUser"
    :uuid="userForm.uuid"
    mode="edit"
    name="User"
    @close="editUser = false"
  />
</template>

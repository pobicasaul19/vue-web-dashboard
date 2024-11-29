<template>
  <form class="space-y-10">
    <div class="flex flex-col gap-5 w-full">
      <div v-for="(items, i) in itemFields" :key="i" class="flex">
        <div
          class="w-64 mr-10 flex justify-between"
          v-if="!(items.model === 'password' && mode === 'edit')"
        >
          <p class="m-0">{{ items.label }}</p>
          <span>:</span>
        </div>
        <div class="w-3/4">
          <template v-if="items.type === 'input'">
            <InputText
              v-model="formData[items.model]"
              :class="{ capitalize: items.capitalize }"
              class="w-full capitalize"
            />
          </template>
          <template v-if="items.type === 'textarea'">
            <Textarea
              v-model:model-value="formData[items.model]"
              class="w-full"
              rows="5"
              cols="30"
            />
          </template>
          <template v-if="items.type === 'calendar'">
            <DatePicker
              v-model:model-value="formData[items.model]"
              :minDate="new Date()"
              showIcon
              fluid
              showButtonBar
              iconDisplay="input"
              class="w-full"
            />
          </template>
          <template v-if="items.type === 'select'">
            <Select
              v-model:model-value="formData[items.model]"
              :options="items.options"
              :option-value="items.label === 'Company' ? 'name' : 'value'"
              option-label="name"
              appendTo="body"
              class="w-full"
            />
          </template>
        </div>
      </div>
      <div class="flex items-center justify-center space-x-5">
        <Button
          @click.prevent="onSave"
          :loading="loading"
          type="submit"
          label="Save"
          icon="pi pi-save"
          iconPos="right"
          class="!bg-[#0799c7] w-36 h-14 rounded-xl text-start !border-transparent"
        />
        <Button
          v-if="props.isPublish"
          :loading="isLoading"
          type="submit"
          @click.prevent="onPublish"
          label="Publish"
          icon="pi pi-file-check"
          iconPos="right"
          class="!bg-green-500 w-36 h-14 rounded-xl text-start !border-transparent"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, reactive } from 'vue'
import type { UserPayload } from '../models/User'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/useAuthStore'

const props = defineProps<{
  onGetData: () => void
  formData: Record<string, any>
  itemFields: Array<{
    type: 'input' | 'select' | 'calendar' | 'textarea'
    label: string
    model: any
    capitalize?: boolean
    options?: Array<{ name: string; value: any }>
  }>
  user: UserPayload
  mode: 'create' | 'edit'
  create: (payload: Record<string, any>) => Promise<void>
  update: (payload: Record<string, any>, _id: number) => Promise<void>
  _id: number
  name: string
  isPublish: boolean
}>()
const emit = defineEmits(['close'])
const showToast = useToast()

const formData = reactive(props.formData)
const loading = ref(false)

// Save or Update function
const saveOrUpdate = async () => {
  const publishPayload = {
    ...formData,
    status: 'For Edit',
    writer: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`
  }
  const payload = { ...formData }
  delete payload._id
  props.mode === 'create'
    ? await props.create(props.isPublish ? publishPayload : payload)
    : await props.update(props.isPublish ? publishPayload : payload, props._id)
}

// Save logic
const onSave = async () => {
  loading.value = true
  try {
    await saveOrUpdate()
    showToast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${props.name} was ${props.mode === 'edit' ? 'updated' : 'created'} successfully.`,
      life: 3000
    })
    props.onGetData()
    emit('close')
  } catch (error) {
    console.log(error)
    showToast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please add all fields.',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

// Publish logic
const authStore = useAuthStore()
const isLoading = ref(false)
const onPublish = async () => {
  isLoading.value = true
  try {
    const payload = {
      ...formData,
      status: 'Published',
      editor: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`
    }
    await props.update(payload, props._id)
    showToast.add({
      severity: 'success',
      summary: 'Published',
      detail: 'Article was successfully published.',
      life: 3000
    })
    props.onGetData()
    emit('close')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// Reset form data when switching between modes
watch(
  () => props.mode,
  (mode) => {
    if (mode === 'create') {
      Object.keys(formData).forEach((key) => (formData[key] = ''))
    } else if (mode === 'edit' && props._id) {
      Object.assign(formData, props.formData)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss">
.p-password {
  input {
    width: 100%;
  }
}
</style>


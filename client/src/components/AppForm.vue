 <template>
  <form class="space-y-10" enctype="multipart/form-data">
    <div class="flex flex-col gap-5 w-full">
      <div v-for="(items, i) in itemFields" :key="i" class="flex">
        <div
          class="w-64 mr-10 flex justify-between"
          v-if="!(items.model === 'password' && mode === 'edit')"
        >
          <p class="m-0">{{ items.label }}</p>
          <span>:</span>
        </div>

        <div class="w-3/4 flex flex-col items-start">
          <component
            :is="getInputComponent(items.type)"
            v-model="formData[items.model]"
            :options="items.options"
            :class="{ capitalize: items.capitalize }"
            :option-value="items.label === 'Company' ? 'name' : 'value'"
            :rows="items.type === 'textarea' ? 5 : undefined"
            :cols="items.type === 'textarea' ? 30 : undefined"
            :min-date="items.type === 'calendar' ? new Date() : undefined"
            :maxFileSize="1000000"
            ref="file"
            mode="basic"
            name="file"
            accept="image/*"
            option-label="name"
            class="w-full flex"
            @select="onFileSelect"
          />
          <small v-if="errorValues[items.model]" class="text-red-500">{{
            errorValues[items.model]
          }}</small>
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
          @click.prevent="onPublish"
          v-if="props.isPublish"
          :loading="isLoading"
          type="submit"
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
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/useAuthStore'
import { DatePicker, FileUpload, InputText, Select, Textarea } from 'primevue'
import { joinDataError } from '../utils'

const props = defineProps<{
  onGetData: () => void
  formData: Record<string, any>
  errorData: Record<string, any>
  itemFields: Array<{
    type: 'input' | 'select' | 'calendar' | 'textarea' | 'file'
    label: string
    model: any
    capitalize?: boolean
    options?: {
      [key: string]: any
    }[]
  }>
  mode: 'create' | 'edit'
  create: (payload: Record<string, any>) => Promise<void>
  update: (payload: Record<string, any>, uuid: string) => Promise<void>
  uuid: string
  name: string
  isPublish?: boolean
}>()

const emit = defineEmits(['close'])
const showToast = useToast()
const authStore = useAuthStore()

const getInputComponent = (type: string) => {
  const components = {
    input: InputText,
    file: FileUpload,
    textarea: Textarea,
    calendar: DatePicker,
    select: Select
  }
  if (type in components) {
    return components[type as keyof typeof components]
  }
  return InputText
}

const formData = reactive(props.formData)
const errorValues = reactive(props.errorData)
const filePayload = ref<File | null>(null)
const loading = ref(false)
const isLoading = ref(false)
const onFileSelect = (event: { files: File[] }) => {
  filePayload.value = event.files?.[0]
}
// Save or Update function
const saveOrUpdate = async () => {
  const payload: Record<string, any> = { ...formData }
  const publishPayload: Record<string, any> = {
    ...formData,
    status: 'For Edit',
    writer: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`
  }
  if (filePayload.value) {
    payload.file = filePayload.value
    publishPayload.file = filePayload.value
  }
  props.mode === 'create'
    ? await props.create(props.isPublish ? publishPayload : payload)
    : await props.update(props.isPublish ? publishPayload : payload, props.uuid)
}

// Save logic
const onSave = async () => {
  loading.value = true
  try {
    Object.keys(errorValues).forEach((key) => {
      errorValues[key] = null
    });
    await saveOrUpdate()
    showToast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${props.name} was ${props.mode === 'edit' ? 'updated' : 'created'} successfully.`,
      life: 3000
    })
    props.onGetData()
    emit('close');
  } catch (error: any) {
    console.log(error)
    const err = error.response.data.data
    Object.keys(err).forEach((key) => {
      errorValues[key] = joinDataError(err, key)
    })
    showToast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.response.data.metadata.message,
      life: 5000
    })
  } finally {
    loading.value = false
  }
}

// Publish logic
const onPublish = async () => {
  isLoading.value = true
  try {
    const payload = {
      ...formData,
      status: 'Published',
      editor: `${authStore.userInfo?.firstName} ${authStore.userInfo?.lastName}`
    }
    await props.update(payload, props.uuid)
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
    } else if (mode === 'edit' && props.uuid) {
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
.p-fileupload-basic {
  width: 100%;
  flex-wrap: nowrap !important;
  span {
    width: 100%;
    word-break: break-all;
  }
}
</style>


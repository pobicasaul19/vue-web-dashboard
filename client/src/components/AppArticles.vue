<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/useAuthStore'
import ArticleService from '../services/ArticleService'
import type { Article, ArticlePayload } from '../models/Article'
import type { Company } from '../models/Company'

const props = defineProps<{
  onGetData: () => void
  company: Company[]
}>()

const authStore = useAuthStore();

const articleForm = reactive<Record<string, any>>({
  company: props.company,
  image: '',
  title: '',
  link: '',
  date: null,
  content: ''
})

const resetArticleForm = () => {
  articleForm.company = ''
  articleForm.image = ''
  articleForm.title = ''
  articleForm.link = ''
  articleForm.date = null
  articleForm.content = ''
}

const editUser = ref(false)
const createUser = ref(false)
const onClickOpenEdit = (data: ArticlePayload) => {
  editUser.value = true
  Object.assign(articleForm, data)
}
const onClickOpenCreate = () => {
  createUser.value = true
  resetArticleForm()
}

const articles = ref<Article[]>([])
const loading = ref(true)
const onGetArticles = async () => {
  loading.value = true
  try {
    const data = await ArticleService.getArticles()
    articles.value = data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const itemFields = [
  {
    type: 'select',
    label: 'Company',
    model: props.company,
    options: props.company
  },
  {
    type: 'input',
    label: 'Image',
    model: 'image'
  },
  {
    type: 'input',
    label: 'Title',
    model: 'title'
  },
  {
    type: 'input',
    label: 'Link',
    model: 'link'
  },
  {
    type: 'calendar',
    label: 'Date',
    model: 'date'
  },
  {
    type: 'textarea',
    label: 'Content',
    model: 'content'
  }
]

onMounted(() => {
  onGetArticles()
})
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-3xl font-medium">Article Management</h1>
    <app-button :editor="true" :onClick="onClickOpenCreate" label="Create Article" />
    <DataTable
      :value="articles"
      tableStyle="min-width: 50rem"
      class="capitalize datatable-container"
    >
      <template #empty>
        <Skeleton v-if="loading" />
        <p class="text-center" v-else>No data available</p>
      </template>
      <Column header="Image">
        <template #body="{ data }">
          <img :src="data.image" :alt="data.image" class="w-24 rounded object-contain" />
        </template>
      </Column>
      <Column field="title" header="Title" />
      <Column field="link" header="Link">
        <template #body="{ data }">
          <a class="underline underline-offset-2" :href="data.link" target="_blank">{{
            data.link
          }}</a>
        </template>
      </Column>
      <Column field="" header="Writer">
        <template #body="{ data }">
          <span>{{ data.writer || '--' }}</span>
        </template>
      </Column>
      <Column field="" header="Editor">
        <template #body="{ data }">
          <span>{{ data.editor || '--' }} </span>
        </template>
      </Column>
      <Column field="status" header="Status" />
      <Column field="" header="Action">
        <template #body="{ data }">
          <Button
            :disabled="data.status === 'Publish' && !authStore.isEditor"
            icon="pi pi-pencil cursor-pointer"
            @click="onClickOpenEdit(data)"
            severity="secondary"
            rounded
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="createUser"
    modal
    header="Create New Article"
    :style="{ width: '50rem' }"
  >
    <AppForm
      :onGetData="onGetArticles"
      :isPublish="true"
      :formData="articleForm"
      :itemFields="itemFields"
      :create="ArticleService.addArticle"
      mode="create"
      name="Article"
      @close="createUser = false"
    />
  </Dialog>

  <Dialog v-model:visible="editUser" modal header="Update Article" :style="{ width: '50rem' }">
    <AppForm
      :onGetData="onGetArticles"
      :isPublish="true"
      :formData="articleForm"
      :itemFields="itemFields"
      :update="ArticleService.updateArticle"
      :_id="articleForm._id"
      mode="edit"
      name="Article"
      @close="editUser = false"
    />
  </Dialog>
</template>

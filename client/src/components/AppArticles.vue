<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import ArticleService from '../services/ArticleService';
import type { Article, ArticlePayload } from '../models/Article';
import type { Company } from '../models/Company';

const props = defineProps<{
  onGetData: () => void;
  company: Company[];
  isLoading: boolean;
}>();

const authStore = useAuthStore();

const articleForm = reactive<Record<string, any>>({
  company: props.company,
  title: '',
  link: '',
  date: null,
  content: ''
});

const resetArticleForm = () => {
  articleForm.company = '';
  articleForm.title = '';
  articleForm.link = '';
  articleForm.date = null;
  articleForm.content = '';
};

const editArticle = ref(false);
const createArticle = ref(false);
const onClickOpenEdit = (data: ArticlePayload) => {
  editArticle.value = true;
  Object.assign(articleForm, data);
};
const onClickOpenCreate = () => {
  createArticle.value = true;
  resetArticleForm();
};

const articles = ref<Article[]>([]);
const loading = ref(true);
const onGetArticles = async () => {
  loading.value = true;
  try {
    const data = await ArticleService.getArticles();
    articles.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const itemFields = [
  {
    type: 'select',
    label: 'Company',
    model: 'company',
    options: props.company
  },
  {
    type: 'file',
    label: 'Image',
    model: 'file'
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
];

const errorFields = {
  company: '',
  file: '',
  title: '',
  link: '',
  content: ''
};

onMounted(() => {
  onGetArticles();
});
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-3xl font-medium">Article Management</h1>
    <AppButton :editor="true" :on-click="onClickOpenCreate" label="Create Article" />
    <DataTable
      :value="articles"
      table-style="min-width: 50rem"
      class="capitalize datatable-container"
    >
      <template #empty>
        <Skeleton v-if="loading" />
        <p v-else class="text-center">No data available</p>
      </template>
      <Column header="Image">
        <template #body="{ data }">
          <img
            :src="data.image"
            :alt="data.image"
            loading="eager"
            decoding="async"
            class="w-24 rounded object-contain"
          />
        </template>
      </Column>
      <Column field="title" header="Title">
        <template #body="{ data }">
          <p class="w-48 truncate ...">{{ data.title }}</p>
        </template>
      </Column>
      <Column field="link" header="Link">
        <template #body="{ data }">
          <a
            class="underline underline-offset-2 text-indigo-800"
            :href="data.link"
            target="_blank"
            v-html="'Source'"
          />
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
            severity="secondary"
            rounded
            @click="onClickOpenEdit(data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <AppForm
    :showModal="createArticle"
    :header="'Create New Article'"
    :onGetData="onGetArticles"
    :isPublish="true"
    :formData="articleForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :create="ArticleService.addArticle"
    mode="create"
    name="Article"
    @close="createArticle = false"
  />

  <AppForm
    :showModal="editArticle"
    :header="'Edit Article Details'"
    :onGetData="onGetArticles"
    :isPublish="true"
    :formData="articleForm"
    :errorData="errorFields"
    :itemFields="itemFields"
    :update="ArticleService.updateArticle"
    :uuid="articleForm.uuid"
    mode="edit"
    name="Article"
    @close="editArticle = false"
  />
</template>

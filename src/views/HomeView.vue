<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ArticleService from '../services/ArticleService';
import type { Article } from '../models/Article';

const articles = ref<Article[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const isExpanded = ref<boolean[]>([]);

const fetchArticles = async () => {
  loading.value = true;
  try {
    const data = await ArticleService.getArticles();
    articles.value = data;
    isExpanded.value = data?.map(() => false);
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch articles. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const truncateContent = (content: string, maxLength = 100) => {
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
};
const toggleReadMore = (index: number) => {
  isExpanded.value[index] = !isExpanded.value[index];
};

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <div v-if="loading" class="h-[50rem] flex items-center justify-center">
    <ProgressSpinner />
  </div>

  <div v-else-if="error" class="h-[50rem] flex items-center justify-center">
    <p class="text-red-600">{{ error }}</p>
  </div>

  <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-5">
    <Card
      v-for="(article, i) in articles"
      :key="i"
      :class="[isExpanded[i] ? 'h-auto' : 'h-[32rem]', 'w-full']"
    >
      <template #header>
        <img
          :src="article.image"
          :alt="article.title"
          loading="eager"
          decoding="async"
          class="p-5 h-52 w-full object-contain"
        />
      </template>
      <template #title>
        {{ article.title }}
      </template>
      <template #subtitle>
        <p class="flex flex-col capitalize">
          <span>
            {{ article.date }} -
            <span
              :class="[
                'text-sm',
                article.status === 'Published' ? 'text-green-600' : 'text-blue-600'
              ]"
            >
              {{ article.status }}
            </span>
          </span>
          <span>Editor: {{ article.editor || 'No valid editor' }}</span>
          <span>Writer: {{ article.writer || 'No valid writer' }}</span>
        </p>
      </template>
      <template #content>
        <p class="m-0">
          {{ isExpanded[i] ? article.content : truncateContent(article.content) }}
          <span class="text-blue-300 cursor-pointer text-xs ml-1" @click="toggleReadMore(i)">
            {{ isExpanded[i] ? 'Show less' : 'Read more' }}
          </span>
        </p>
      </template>
      <template #footer>
        <a :href="article.link" target="_blank">
          <Button label="View" severity="secondary" outlined class="w-36" />
        </a>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>

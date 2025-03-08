<script lang="ts" setup>
const props = defineProps<{
  onClick: () => void;
  editor?: boolean;
  label: string;
}>();
</script>

<template>
  <Button
    v-if="props.editor"
    type="button"
    severity="warn"
    :label="props.label"
    @click="props.onClick()"
  />
</template>

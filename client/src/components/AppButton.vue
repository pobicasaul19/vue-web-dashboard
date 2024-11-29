<script lang='ts' setup>
const props = defineProps<{
  onClick: () => void
  editor?: boolean
  label: string
}>()
</script>

<template>
  <Button
    v-if="props.editor"
    @click="props.onClick()"
    type="button"
    severity="warn"
    :label="props.label"
  />
</template>
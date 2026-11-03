<script setup lang="ts">
/** Renders trusted, repository-authored paragraphs with [text](url) inline links. */
defineProps<{ paragraphs: string[] }>()
</script>

<template>
  <div class="rich">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-for="(p, i) in paragraphs" :key="i" v-html="inlineLinks(p)" />
  </div>
</template>

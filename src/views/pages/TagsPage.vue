<template>
  <q-page class="tw-flex tw-flex-row tw-gap-8 tw-p-10">
    <ListTags />
    <AddEditeTag />
    <ButtonAddTag />
  </q-page>
</template>

<script setup lang="ts">
import ListTags from '@modules/tags/ListTags.vue';
import AddEditeTag from '@modules/tags/AddEditeTag.vue';
import ButtonAddTag from '@modules/tags/ButtonAddTag.vue';

defineOptions({
  name: 'NotesPage',
});
</script>

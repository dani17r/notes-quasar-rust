<template>
  <q-page class="tw-row tw-row-cols tw-justify-evenly">
    <div class="tw-flex tw-w-full">
      <ListTags />
      <AddEditeTag />
      <ButtonAddTag />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ListTags from '@modules/tags/ListTags.vue';
import AddEditeTag from '@modules/tags/AddEditeTag.vue';
import ButtonAddTag from '@modules/tags/ButtonAddTag.vue';
import { useMeta } from 'quasar';

defineOptions({
  name: 'TagsPage',
});

useMeta({
  title: 'Etiquetas'
})
</script>

<template>
  <q-page class="tw-row tw-justify-evenly">
    <div class="tw-flex tw-w-full">
      <ListCategories />
      <AddEditeCategory />
      <ButtonAddCategory />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ListCategories from '@modules/categories/ListCategories.vue';
import AddEditeCategory from '@modules/categories/AddEditeCategory.vue';
import ButtonAddCategory from '@modules/categories/ButtonAddCategory.vue';
import { useMeta } from 'quasar';

defineOptions({
  name: 'CategoriesPage',
});

useMeta({
  title: 'Categorias'
})
</script>

<template>
  <div class="tw-fixed tw-bottom-6 tw-right-3 tw-z-50">
    <q-btn @click="menus.toggleDrawerAddEditeCategory()" color="primary" :size="'17px'" icon="add" round />
  </div>
</template>

<script setup lang="ts">
import menusComposable from '@composables/menusComposable';

const menus = menusComposable();

defineOptions({
  name: 'NotesPage',
});
</script>

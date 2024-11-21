<template>
  <div class="tw-fixed tw-bottom-6 tw-right-3 tw-z-50">
    <q-btn
      :to="{ name: 'view-note', params: { state: 'add' } }"
      @click="changePage('slide-right')"
      color="primary"
      :size="'17px'"
      icon="add"
      round
    />
  </div>
</template>

<script setup lang="ts">
import transitionsComposable from '@composables/transitionsComposable';

const { changePage } = transitionsComposable();

defineOptions({
  name: 'NotesPage',
});
</script>

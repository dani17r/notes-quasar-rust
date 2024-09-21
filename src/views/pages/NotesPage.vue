<template>
  <q-page class="row items-center justify-evenly">
    <ListNotes />

    <div class="tw-fixed tw-bottom-2 tw-right-4 tw-z-50">
      <q-btn
        :to="{ name: 'view-note', params: { state: 'add' } }"
        @click="changePage('slide-right')"
        color="primary"
        :size="'17px'"
        icon="add"
        round
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import transitionsComposable from '@composables/transitionsComposable';
import ListNotes from '@modules/notes/ListNotes.vue';

const { changePage } = transitionsComposable();

defineOptions({
  name: 'NotesPage',
});
</script>

<template>
  <q-page class="tw-row tw-row-cols tw-justify-evenly">
    <div class="tw-flex tw-w-full">
      <ListNotes />
      <ButtomAddNote />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ButtomAddNote from '@modules/notes/ButtonAddNote.vue';
import ListNotes from '@modules/notes/ListNotes.vue';
import { useMeta } from 'quasar';

defineOptions({
  name: 'NotesPage',
});

useMeta({
  title: 'Notas'
})
</script>

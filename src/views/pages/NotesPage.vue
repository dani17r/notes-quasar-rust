<template>
  <q-page class="tw-row tw-justify-evenly">
    <ListNotes />
    <ButtomAddNote />
  </q-page>
</template>

<script setup lang="ts">
import ButtomAddNote from '@modules/notes/ButtonAddNote.vue';
import ListNotes from '@modules/notes/ListNotes.vue';

defineOptions({
  name: 'NotesPage',
});
</script>

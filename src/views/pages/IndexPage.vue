<template>
  <q-page class="tw-row tw-row-cols tw-justify-evenly">
    <div class="tw-w-full tw-p-6">
      <h2 class="tw-pb-4 tw-text-2xl">Notas con mas puntuacion</h2>
      <VIewNotesStars />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import VIewNotesStars from '@modules/notes/VIewNotesStars.vue';
import { useMeta } from 'quasar';

defineOptions({
  name: 'IndexPage',
});

useMeta({
  title: 'Inicio'
})
</script>

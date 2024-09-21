<template>
  <q-page class="tw-p-5">
    <ButtomBack
      :icon="isEdite ? 'arrow_forward' : 'arrow_back'"
      :to="{ name: 'index-notes' }"
    />
    <AddEditeNote />
  </q-page>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import AddEditeNote from '@modules/notes/AddEditeNote.vue';
import ButtomBack from '@components/ButtomBack.vue';
import { computed } from 'vue';

const { route } = superComposable();

const isEdite = computed(() => route.params.state == 'edit');
</script>

<template>
  <div class="tw-w-full tw-grid tw-gap-6 tw-grid-flow-col tw-grid-cols-4">
    <template v-for="note in notesRanks" :key="note.id">
      <q-card class="tw-min-w-[230px] tw-max-w-[240px]" flat bordered>
        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ note.title }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="star" />
              {{ note.rank }}
            </div>
          </div>

          <q-rating v-model="note.rank" :max="5" size="32px" readonly />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption text-grey">
            {{ truncate(note.details, { length: 34 }) }}
          </div>
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>

<script setup>
import superComposable from '@composables/superComposable';
import { onMounted, ref } from 'vue';
import { truncate } from 'lodash';

const { store } = superComposable();
const notesRanks = ref([]);

const getNoteWithRank = () => {
  let updatePagination = { ...store.notes.pagination, pag: 1, limit: 5 };
  store.notes.filters.conditionals = 'rank=[3-5]';

  store.notes.getListNotes(true, updatePagination, false)
    .then((resp) => notesRanks.value = resp.data)
    .finally(() => store.notes.filters.conditionals = '');
}

onMounted(() => {
  getNoteWithRank();
})
</script>
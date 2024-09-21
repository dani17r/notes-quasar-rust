<template>
  <div class="tw-w-full tw-relative">
    <ViewFilters class="tw-pb-3" />
    <WrapperOfLoading :status="!store.notes.loading">
      <q-list class="scroll tw-pb-6" style="max-height: 75vh">
        <q-infinite-scroll
          :disable="!store.notes.pagination.count"
          @load="onLoadMenu"
          :offset="300"
        >
          <div v-for="(note, index) in store.notes.list" :key="note.id">
            <ItemNote v-bind="{ ...note, rating: ratingModel }" />

            <q-separator
              v-if="store.notes.pagination.count_total != index + 1"
            />
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner color="primary" name="dots" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
    </WrapperOfLoading>
    <div
      id="filterBottom"
      class="tw-absolute -tw-bottom-6 tw-left-0 tw-z-10 tw-bg-white tw-w-full tw-pt-2 tw-border-t tw-border-gray-200"
    ></div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import ViewFilters from '@modules/notes/ViewFilters.vue';
import ItemNote from '@modules/notes/ItemNote.vue';
import { onMounted, ref } from 'vue';

const { store } = superComposable();

const ratingModel = ref(0);

onMounted(() => {
  store.notes.pagination.pag = 1;
  store.notes.getListNotes();
});

defineOptions({
  name: 'ListNotes',
  inheritAttrs: false,
});

const onLoadMenu = (index: number, done: Function) => {
  if (index >= 1) {
    setTimeout(() => {
      store.notes.pagination.pag += 1;
      store.notes.getListNotes(true).finally(() => done());
    }, 400);
  }
};
</script>

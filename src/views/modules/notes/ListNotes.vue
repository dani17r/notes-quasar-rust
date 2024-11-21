<template>
  <ViewFiltersHeader />
  <WrapperOfLoading class="tw-w-full tw-p-10" :status="!store.notes.loading">
    <q-list class="scroll tw-pb-6 tw-pt-10" style="max-height: 75vh">
      <q-infinite-scroll
        :disable="!store.notes.pagination.count"
        @load="onLoadMenu"
        :offset="700"
      >
        <div v-for="(note, index) in store.notes.list" :key="note.id">
          <ItemNote v-bind="note" />

          <q-separator v-if="store.notes.pagination.count_total != index + 1" />
        </div>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-list>
  </WrapperOfLoading>
  <ViewFiltersFooter />
</template>

<script setup lang="ts">
/* eslint-disable */
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import ViewFiltersHeader from '@modules/notes/ViewFiltersHeader.vue';
import ViewFiltersFooter from '@modules/notes/ViewFiltersFooter.vue';
import ItemNote from '@modules/notes/ItemNote.vue';
import { onMounted } from 'vue';

const { store } = superComposable();

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
    // console.log(index);
    setTimeout(() => {
      store.notes.pagination.pag += 1;
      store.notes.getListNotes(true).finally(() => done());
    }, 400);
  }
};
</script>

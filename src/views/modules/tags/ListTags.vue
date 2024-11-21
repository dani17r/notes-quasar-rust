<template>
  <ViewFiltersAll />
  <WrapperOfLoading class="tw-w-full tw-mt-10" :status="!store.tags.loading">
    <q-list class="scroll tw-pb-6" style="max-height: 70vh">
      <q-infinite-scroll
        :disable="!store.tags.pagination.count"
        class="tw-relative"
        @load="onLoadMenu"
        :offset="10"
      >
        <div v-for="(tag, index) in store.tags.list" :key="tag.id">
          <ItemTag v-bind="tag" />

          <q-separator v-if="store.tags.pagination.count_total != index + 1" />
        </div>
        <template v-slot:loading>
          <div class="tw-flex tw-justify-center tw-w-full">
            <q-spinner color="primary" name="dots" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-list>
  </WrapperOfLoading>
</template>

<script setup lang="ts">
/* eslint-disable */
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import ViewFiltersAll from './ViewFiltersAll.vue';
import ItemTag from '@modules/tags/ItemTag.vue';
import { onMounted } from 'vue';

const { store } = superComposable();

onMounted(() => {
  store.tags.pagination.pag = 1;
  store.tags.getListTags();
});

defineOptions({
  name: 'ListTags',
  inheritAttrs: false,
});

const onLoadMenu = (index: number, done: Function) => {
  if (index >= 1) {
    setTimeout(() => {
      store.tags.pagination.pag += 1;
      store.tags.getListTags(true).finally(() => done());
    }, 400);
  }
};
</script>

<template>
  <ViewFiltersAll />
  <WrapperOfLoading class="tw-w-full tw-p-10" :status="!store.categories.loading">
    <q-list class="scroll tw-pb-6 tw-pt-10" style="max-height: 75vh">
      <q-infinite-scroll :disable="!store.categories.pagination.count" class="tw-relative" @load="onLoadMenu"
        :offset="10">
        <div v-for="(category, index) in store.categories.list" :key="category.id">
          <ItemCategory v-bind="category" />

          <q-separator v-if="store.categories.pagination.count_total != index + 1" />
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
import ItemCategory from '@modules/categories/ItemCategory.vue';
import { onMounted } from 'vue';

const { store } = superComposable();

onMounted(() => {
  store.categories.pagination.pag = 1;
  store.categories.getListCategories();
});

defineOptions({
  name: 'ListCategories',
  inheritAttrs: false,
});

const onLoadMenu = (index: number, done: Function) => {
  if (index >= 1) {
    setTimeout(() => {
      store.categories.pagination.pag += 1;
      store.categories.getListCategories(true).finally(() => done());
    }, 400);
  }
};
</script>

<template>
  <div
    class="tw-fixed tw-top-[60px] tw-z-10 tw-w-full tw-flex tw-items-center tw-gap-3 tw-border-b tw-border-gray-200 tw-bg-white tw-pb-2"
  >
    <q-select
      @update:model-value="getTagOfsearch(store.tags.filters.search)"
      :options="selectFieldSearch.options"
      v-model="selectFieldSearch.val"
      label="Buscar por:"
      class="tw-w-[11%]"
      map-options
      emit-value
      borderless
      dense
    >
      <template v-slot:prepend>
        <q-icon name="format_list_bulleted_add" size="35px" />
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" dense>
          <q-item-section avatar>
            <q-icon name="check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-input
      :model-value="store.tags.filters.search"
      @update:model-value="getTagOfsearch"
      placeholder="Buscar"
      class="tw-w-[30%]"
      debounce="1000"
      borderless
      clearable
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-select
      @update:model-value="getTagOfsearch(store.tags.filters.search)"
      :options="sortBy.options"
      v-model="sortBy.val"
      label="Ordenar por:"
      class="tw-w-[11%]"
      map-options
      emit-value
      borderless
      dense
    >
      <template v-slot:prepend>
        <q-icon name="format_list_numbered" size="35px" />
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" dense>
          <q-item-section avatar>
            <q-icon name="check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-toggle
      @update:model-value="getTagOfsearch(store.tags.filters.search)"
      v-model="sortBy.order"
      left-label
      dense
    >
      <div class="tw-flex tw-justify-center tw-items-center">
        <q-icon name="filter_list" size="35px" class="tw-text-gray-500" />
        <span>Asc/Desc</span>
      </div>
    </q-toggle>
  </div>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import { reactive, watchEffect } from 'vue';

defineOptions({
  name: 'viewFilters',
  inheritAttrs: false,
});

const { store } = superComposable();

const getTagOfsearch = (val: string | number | null) => {
  store.tags.filters.search = String(val);
  store.tags.pagination.pag = 1;
  setTimeout(() => store.tags.getListTags(), 200);
};

const selectFieldSearch = reactive({
  options: [
    {
      label: 'Todos',
      value: 'todos',
    },
    {
      label: 'Nombre',
      value: 'name',
    },
    {
      label: 'Descripcion',
      value: 'description',
    },
  ],
  val: 'todos',
});

const sortBy = reactive({
  options: [
    {
      label: 'Id',
      value: 'id',
    },
    {
      label: 'Nombre',
      value: 'name',
    },
    {
      label: 'Descripcion',
      value: 'description',
    },
  ],
  val: 'id',
  order: false,
});

watchEffect(() => {
  if (selectFieldSearch.val)
    store.tags.filters.fields_search = selectFieldSearch.val;
  if (sortBy.val)
    store.tags.filters.sort = `${sortBy.val}:${sortBy.order ? 'DESC' : 'ASC'}`;
});
</script>

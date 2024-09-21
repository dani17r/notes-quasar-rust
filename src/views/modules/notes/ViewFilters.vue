<template>
  <div
    class="tw-flex tw-justify-between tw-items-center tw-px-4 tw-pb-3 tw-gap-3 tw-border-b tw-border-gray-200"
  >
    <q-select
      @update:model-value="getNoteOfsearch"
      :options="selectFieldSearch.options"
      v-model="selectFieldSearch.val"
      label="Buscar por:"
      class="tw-w-[30%]"
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
      :model-value="store.notes.filters.search"
      @update:model-value="getNoteOfsearch"
      placeholder="Buscar"
      class="tw-w-full"
      debounce="1000"
      borderless
      clearable
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
  <Teleport defer to="#filterBottom">
    <div class="tw-flex tw-items-center tw-px-4 tw-gap-3">
      <q-select
        @update:model-value="getNoteOfsearch"
        :options="sortBy.options"
        v-model="sortBy.val"
        label="Ordenar por:"
        class="tw-w-[25%]"
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
        @update:model-value="getNoteOfsearch"
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
  </Teleport>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import { reactive, watchEffect } from 'vue';

defineOptions({
  name: 'viewFilters',
  inheritAttrs: false,
});

const { store } = superComposable();

const getNoteOfsearch = () => {
  store.notes.filters.search = store.notes.filters.search || '';
  store.notes.pagination.pag = 1;
  setTimeout(() => store.notes.getListNotes(), 200);
};

const selectFieldSearch = reactive({
  options: [
    {
      label: 'Todos',
      value: 'todos',
    },
    {
      label: 'Nombre',
      value: 'title',
    },
    {
      label: 'Descripcion',
      value: 'details',
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
      value: 'title',
    },
    {
      label: 'Descripcion',
      value: 'details',
    },
  ],
  val: 'id',
  order: false,
});

watchEffect(() => {
  if (selectFieldSearch.val)
    store.notes.filters.fields_search = selectFieldSearch.val;
  if (sortBy.val)
    store.notes.filters.sort = `${sortBy.val}:${sortBy.order ? 'DESC' : 'ASC'}`;
});
</script>

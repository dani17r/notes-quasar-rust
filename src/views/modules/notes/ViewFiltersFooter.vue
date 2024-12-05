<template>
  <div
    :class="['tw-fixed tw-bottom-0 tw-z-10 tw-w-full tw-flex tw-items-center tw-px-6 tw-gap-3 tw-border-b tw-h-[50px] ', $stylesDark.bg.value]">
    <q-select @update:model-value="getNoteOfsearch(store.notes.filters.search)" :options="sortBy.options"
      v-model="sortBy.val" label="Ordenar por:" class="tw-w-[25%]" map-options emit-value borderless dense>
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

    <q-toggle @update:model-value="getNoteOfsearch(store.notes.filters.search)" v-model="sortBy.order" left-label dense>
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

const getNoteOfsearch = (val: string | number | null) => {
  store.notes.filters.search = String(val);
  store.notes.pagination.pag = 1;
  setTimeout(() => store.notes.getListNotes(), 200);
};

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
  if (sortBy.val)
    store.notes.filters.sort = `${sortBy.val}:${sortBy.order ? 'DESC' : 'ASC'}`;
});
</script>

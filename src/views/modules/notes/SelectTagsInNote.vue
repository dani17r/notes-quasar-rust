<template>
  <q-select @update:model-value="getTagOfsearch()" @filter="select.filter" v-model="modelValue" :options="select.list"
    @clear="select.clear" input-debounce="600" option-label="name" class="tw-w-[100%]" label="Etiquetas" stack-label
    map-options emit-value borderless clearable use-chips use-input multiple dense>
    <template v-slot:selected-item="scope">
      <q-chip :class="`tw-bg-transparent tw-py-3 tw-px-2 tw-my-2 tw-ml-0 tw-mr-2 tw-inline-block`"
        :style="`border: 1px solid ${scope.opt.color}; color:${scope.opt.color}`"
        @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex" :key="scope.opt.id" removable dense>
        <q-icon name="sell" :style="scope.opt.color ? `color:${scope.opt.color}` : 'color:gray'" />
        <label class="tw-mx-1.5">
          {{ scope.opt.name }}
        </label>
      </q-chip>
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon name="sell" :style="scope.opt.color ? `color:${scope.opt.color}` : 'color:gray'" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label lines="2">{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import { onMounted, reactive } from 'vue';
import type { Tag } from '@interfaces/tags';

defineOptions({
  name: 'selectTagsInNote',
  inheritAttrs: false,
});

const modelValue = defineModel<[]>();
const emit = defineEmits(['clear']);

const { store } = superComposable();

const select = reactive({
  list: <Tag[]>[],
  filter: (val: string, update: (callbackFn: () => void) => void) => {
    if (val === '') {
      update(() => getTagOfsearch());
      return;
    }

    update(() => {
      const needle = val.toLowerCase();
      getTagOfsearch(val);

      select.list = select.list.filter(
        (v) => v.name.toLowerCase().indexOf(needle) > -1,
      );
    });
  },
  clear: () => emit('clear'),
});

const getTagOfsearch = (val?: string) => {
  store.tags.pagination.pag = 1;
  store.tags.pagination.limit = 5;

  if (val) {
    store.tags.filters.fields_search = 'name';
    store.tags.filters.search = val;
  } else {
    store.tags.filters.fields_search = '';
    store.tags.filters.search = '';
  }

  store.tags.getListTags().then((resp) => {
    select.list = [...resp.data];
  });
};

onMounted(() => {
  if (!store.tags.list.length) getTagOfsearch();
});
</script>

<template>
  <q-item :class="store.categories.current?.id == props.id ? $stylesDark.bg.value : null">
    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption lines="2">{{ props.description }}</q-item-label>
    </q-item-section>

    <q-item-section side class="tw-flex tw-gap-2 tw-flex-row tw-content-center">
      <q-icon name="edit" class="tw-block tw-cursor-pointer"
        @click="menus.toggleDrawerAddEditeCategory(true, props.id)" />
      <q-icon name="delete" color="red" class="tw-block tw-cursor-pointer" @click="confirmDelete.toggle()" />
    </q-item-section>
  </q-item>

  <Teleport to="body">
    <ModalConfirm :status="confirmDelete.value" @close="confirmDelete.toggle()"
      description="Quiere borrar esta etiqueta ?." @accept="deleteOneCategory(Number(props.id))" />
  </Teleport>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import menusComposable from '@composables/menusComposable';
import ModalConfirm from '@components/ModalConfirm.vue';
import { superModal } from '@utils/super';

const { store } = superComposable();
const menus = menusComposable();

defineOptions({ name: 'ItemCategory' });

export interface ItemCategoryPropsI {
  title: string;
  description?: string;
  id?: number;
}

const props = withDefaults(defineProps<ItemCategoryPropsI>(), {
  title: '',
  description: '',
});

const confirmDelete = superModal({ value: false });

const deleteOneCategory = (id: number) => {
  store.categories.deleteCategories([id]);
};
</script>

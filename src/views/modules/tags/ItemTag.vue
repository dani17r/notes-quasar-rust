<template>
  <q-item :class="store.tags.current?.id == props.id ? 'tw-bg-gray-100' : null">
    <q-item-section side botom>
      <q-icon
        name="sell"
        :style="props.color ? `color:${props.color}` : 'color:gray'"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.name }}</q-item-label>
      <q-item-label caption lines="2">{{ props.description }}</q-item-label>
    </q-item-section>

    <q-item-section side class="tw-flex tw-gap-2 tw-flex-row tw-content-center">
      <q-icon
        name="edit"
        class="tw-block tw-cursor-pointer"
        @click="menus.toggleDrawerAddEditeTag(true, props.id)"
      />
      <q-icon
        name="delete"
        color="red"
        class="tw-block tw-cursor-pointer"
        @click="confirmDelete.toggle()"
      />
    </q-item-section>
  </q-item>

  <Teleport to="body">
    <ModalConfirm
      :status="confirmDelete.value"
      @close="confirmDelete.toggle()"
      description="Quiere borrar esta etiqueta ?."
      @accept="deleteOneTag(Number(props.id))"
    />
  </Teleport>
</template>

<script setup lang="ts">
import superComposable from '@composables/superComposable';
import menusComposable from '@composables/menusComposable';
import ModalConfirm from '@components/ModalConfirm.vue';
import { superModal } from '@utils/super';

const { store } = superComposable();
const menus = menusComposable();

defineOptions({ name: 'ItemTag' });

export interface ItemTagPropsI {
  name: string;
  description?: string;
  color?: string;
  id?: number;
}

const props = withDefaults(defineProps<ItemTagPropsI>(), {
  name: '',
  color: '',
  description: '',
});

const confirmDelete = superModal({ value: false });

const deleteOneTag = (id: number) => {
  store.tags.deleteTags([id]);
};
</script>

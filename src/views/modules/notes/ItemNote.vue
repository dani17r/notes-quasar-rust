<template>
  <q-item
    :class="store.notes.current?.id == props.id ? 'tw-bg-gray-100' : null"
  >
    <q-item-section side botom>
      <q-icon name="check_circle" :color="props.done ? 'green' : 'grey'" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption lines="2">{{ props.details }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>
        <q-rating
          class="tw-float-right"
          :model-value="props.rating"
          color="yellow"
          size="1.4em"
          :max="5"
        />
      </q-item-label>
    </q-item-section>

    <q-item-section side class="tw-flex tw-gap-2 tw-flex-row tw-content-center">
      <q-icon
        name="edit_note"
        class="tw-block tw-cursor-pointer"
        @click="
          [
            router.push({
              name: 'view-note',
              params: { state: 'edit', id: props.id },
            }),
            changePage('slide-left'),
          ]
        "
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
      description="Quiere borrar esta nota ?."
      @accept="deleteOneNote(Number(props.id))"
    />
  </Teleport>
</template>

<script setup lang="ts">
import transitionsComposable from '@composables/transitionsComposable';
import superComposable from '@composables/superComposable';
import ModalConfirm from '@components/ModalConfirm.vue';
import { superModal } from '@utils/super';

const { changePage } = transitionsComposable();
const { store, router } = superComposable();

defineOptions({
  name: 'ItemNote',
});

export interface ItemNotePropsI {
  title: string;
  done?: boolean;
  details?: string;
  rating?: number;
  id?: number;
}

const props = withDefaults(defineProps<ItemNotePropsI>(), {
  title: '',
  done: false,
  details: '',
  rating: 0,
});

const confirmDelete = superModal({ value: false });
const deleteOneNote = (id: number) => {
  store.notes.deleteNotes([id]);
};
</script>

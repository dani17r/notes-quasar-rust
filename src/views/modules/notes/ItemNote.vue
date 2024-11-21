<template>
  <q-item :class="store.notes.current?.id == props.id ? 'tw-bg-gray-100' : null">
    <q-item-section side botom>
      <q-icon name="check_circle" :color="props.done ? 'green' : 'grey'" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption lines="2">{{ props.details }}</q-item-label>
      <q-item-label caption lines="1">
        <span v-for="tag in props.tags" :key="tag.id"
          :class="`tw-border tw-border-[${tag.color}] tw-p-1 tw-inline-block`">
          <q-icon name="sell" :style="tag.color ? `color:${tag.color}` : 'color:gray'" />
          {{ tag.name }}
        </span>
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label caption>
        <q-rating @update:model-value="updateRank" :model-value="props.rank" class="tw-float-right" color="yellow"
          size="1.4em" :max="5" />
      </q-item-label>
    </q-item-section>

    <q-item-section side class="tw-flex tw-gap-2 tw-flex-row tw-content-center">
      <q-icon name="edit_note" class="tw-block tw-cursor-pointer" @click="
        [
          router.push({
            name: 'view-note',
            params: { state: 'edit', id: props.id },
          }),
          changePage('slide-left'),
        ]
        " />
      <q-icon name="delete" color="red" class="tw-block tw-cursor-pointer" @click="confirmDelete.toggle()" />
    </q-item-section>
  </q-item>

  <Teleport to="body">
    <ModalConfirm :status="confirmDelete.value" @close="confirmDelete.toggle()" description="Quiere borrar esta nota ?."
      @accept="deleteOneNote(Number(props.id))" />
  </Teleport>
</template>

<script setup lang="ts">
import transitionsComposable from '@composables/transitionsComposable';
import superComposable from '@composables/superComposable';
import ModalConfirm from '@components/ModalConfirm.vue';
import { superModal } from '@utils/super';
import type { Tag } from '@interfaces/tags';

const { changePage } = transitionsComposable();
const { store, router } = superComposable();

defineOptions({ name: 'ItemNote' });

export interface ItemNotePropsI {
  title: string;
  done?: boolean;
  details?: string;
  rank?: number;
  id?: number;
  tags?: Tag[];
}

const props = withDefaults(defineProps<ItemNotePropsI>(), {
  title: '',
  done: false,
  details: '',
  rank: 0,
});

const updateRank = (valRank: number) => {
  store.notes.updateOneNote({
    id: Number(props.id),
    rank: valRank,
  });
};

const confirmDelete = superModal({ value: false });
const deleteOneNote = (id: number) => {
  store.notes.deleteNotes([id]);
};
</script>

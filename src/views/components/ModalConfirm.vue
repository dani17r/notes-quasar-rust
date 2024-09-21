<template>
  <q-dialog :model-value="props.status" @hide="$emit('close')">
    <q-card class="sm:tw-min-w-[300px]">
      <q-card-section class="row items-center">
        <q-icon name="error" color="orange" text-color="white" size="25px" />
        <span class="q-ml-xs">{{ props.title }}</span>
      </q-card-section>

      <q-card-section class="row items-center">
        <p>{{ props.description }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="No"
          color="primary"
          v-close-popup
          @click="$emit('cancel')"
        />
        <q-btn
          flat
          label="Si"
          color="primary"
          @click="$emit('accept')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineOptions({ name: 'ModalConfirm' });

defineEmits(['cancel', 'accept', 'close']);

export interface ItemNotePropsI {
  status: boolean;
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<ItemNotePropsI>(), {
  status: false,
  title: 'Confirmar acción.',
  description: 'Esta seguro de lo que quiere hacer ?.',
});
</script>

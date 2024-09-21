<template>
  <div class="q-pa-md">
    <WrapperOfLoading :status="!store.notes.loading" auto>
      <q-form
        class="q-gutter-md tw-mt-3"
        :ref="form.getRef"
        @submit="onSubmit"
        @reset="onReset"
      >
        <h1 class="tw-text-2xl tw-pb-3">
          {{ isEdit ? 'Actualizar Nota' : 'Crear Nota' }}
        </h1>
        <q-input
          v-model="form.title.value"
          :rules="form.title.rules"
          label="Titulo"
          borderless
          clearable
          dense
        >
          <template v-slot:append v-if="isEdit">
            <q-icon
              v-show="form.title.isChange()"
              @click="form.title.reset()"
              class="tw-mx-2"
              name="undo"
            />
          </template>
        </q-input>

        <q-input
          v-model="form.details.value"
          :rules="form.details.rules"
          label="Descripción"
          maxlength="100"
          borderless
          clearable
          autogrow
          dense
        >
          <template v-slot:append v-if="isEdit">
            <q-icon
              name="undo"
              class="tw-mx-2"
              v-show="form.details.isChange()"
              @click="form.details.reset()"
            />
          </template>
        </q-input>

        <q-toggle
          v-model="form.done.value"
          label="Inactivo/Activo"
          left-label
          dense
        />

        <div class="tw-flex">
          <q-btn
            :label="isEdit ? 'Guardar' : 'Crear'"
            :disable="!form.verifyIsNotChanges()"
            class="tw-w-full"
            color="primary"
            type="submit"
            dense
          />
          <q-btn
            class="q-ml-sm tw-w-full"
            color="primary"
            label="Limpiar"
            type="reset"
            flat
            dense
          />
        </div>
      </q-form>
    </WrapperOfLoading>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import { formResetDefault } from '@utils/actions';
import { required } from '@utils/validations';
import { Note } from '@interfaces/notes';
import { superForm } from '@utils/super';
import { computed, onMounted } from 'vue';

const { notify, route, store } = superComposable();

const isEdit = computed(() => route.params.state == 'edit');
const form = superForm({
  title: {
    value: '',
    rules: [required],
  },
  details: {
    value: '',
    rules: [required],
  },
  done: {
    value: false,
  },
});

const setUpdate = () => {
  if (form.verifyIsNotChanges()) {
    const updateNoteField = {
      id: store.notes.current?.id,
      ...form.getValues(),
    } as unknown as Note;

    store.notes
      .updateOneNote(updateNoteField)
      .then(() => {
        notify.success('Listo');
        if (!store.notes.current) return;
        form.updateForm(store.notes.current);
      })
      .catch(() => notify.error('Hubo un Error!'));
  }
};
const setCreate = () => {
  store.notes
    .createOneNote(form.getValues() as unknown as Omit<Note, 'id'>)
    .then(() => {
      notify.success('Listo');
    })
    .finally(() => onReset())
    .catch(() => notify.error('Hubo un Error!'));
};

const getNoteOne = (id: number) => {
  store.notes.getOneNote(id).then(() => {
    if (!store.notes.current) return;
    form.updateForm(store.notes.current);
  });
};

const onSubmit = () => {
  if (isEdit.value) setUpdate();
  else setCreate();
};

const onReset = () => {
  form.resetValidation();
  formResetDefault(form);
};

onMounted(() => {
  if (route.params.id) getNoteOne(Number(route.params.id));
});
</script>

<template>
  <div class="q-pa-md">
    <WrapperOfLoading :status="!store.notes.loading" auto>
      <q-form class="q-gutter-md tw-mt-3 tw-relative" :ref="form.getRef" @submit="onSubmit" @reset="onReset">
        <h1 class="tw-text-2xl tw-pb-3">
          {{ isEdit ? 'Actualizar Nota' : 'Crear Nota' }}
        </h1>

        <q-rating v-model="form.rank.value" class="tw-absolute -tw-top-4 tw-right-0" color="yellow" size="2em"
          :max="5" />

        <q-input v-model="form.title.value" :rules="form.title.rules" label="Titulo" borderless clearable dense>
          <template v-slot:append v-if="isEdit">
            <q-icon v-show="form.title.isChange()" @click="form.title.reset()" class="tw-mx-2" name="undo" />
          </template>
        </q-input>

        <q-input v-model="form.details.value" :rules="form.details.rules" label="Descripción" maxlength="100" borderless
          clearable autogrow dense>
          <template v-slot:append v-if="isEdit">
            <q-icon name="undo" class="tw-mx-2" v-show="form.details.isChange()" @click="form.details.reset()" />
          </template>
        </q-input>

        <SelectTagsInNote v-model="form.tags.value" @clear="form.tags.reset()" />
        <q-toggle class="tw-mt-8 tw-mb-6" v-model="form.done.value"
          :label="`${!form.done.value ? 'Deshabilitado' : 'Habilitado'}`" left-label dense />

        <div class="tw-flex">
          <q-btn :label="isEdit ? 'Guardar' : 'Crear'" :disable="!form.verifyIsNotChanges()" class="tw-w-full"
            color="primary" type="submit" dense />
          <q-btn class="q-ml-sm tw-w-full" color="primary" label="Limpiar" type="reset" flat dense />
        </div>
      </q-form>
    </WrapperOfLoading>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import SelectTagsInNote from '@views/modules/notes/SelectTagsInNote.vue';
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import { formResetDefault } from '@utils/actions';
import { computed, onMounted, ref } from 'vue';
import { required } from '@utils/validations';
import type { Note } from '@interfaces/notes';
import { superForm } from '@utils/super';
import type { Tag } from '@interfaces/tags';
import { cloneDeep, omit } from 'lodash';

const { notify, route, store } = superComposable();

const isEdit = computed(() => route.params.state == 'edit');
const idsTag = ref<number[]>([]);
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
  rank: {
    value: 0,
  },
  tags: {
    value: <Tag[]>[],
  },
});

const setUpdate = () => {
  let id = computed(() => Number(store.notes.current?.id));

  const updateForm = () => {
    const updateNoteField = {
      id: id.value,
      ...form.getValues(),
    };

    store.notes
      .updateOneNote(updateNoteField as unknown as Note)
      .then(() => getNoteOne(id.value).then(() => notify.success('Listo')))
      .catch(() => notify.error('Hubo un Error!'));
  };

  if (form.verifyIsNotChanges()) {
    let tagIdsCurrent: number[] = cloneDeep(form.tags.value)
      .map((tag: Tag) => tag.id)
      .filter((id: number) => idsTag.value.includes(id));

    let tagIdsCreate: number[] = cloneDeep(form.tags.value)
      .map((tag: Tag) => tag.id)
      .filter((id: number) => !idsTag.value.includes(id));

    let tagIdsDelete: number[] = cloneDeep(idsTag.value).filter(
      (id: number) => !tagIdsCurrent.includes(id),
    );

    if (tagIdsDelete.length) {
      store.notes
        .deleteTagsInNote({
          note_id: id.value,
          tag_ids: tagIdsDelete,
        })
        .then(() => updateForm());
    }
    if (tagIdsCreate.length) {
      store.notes
        .addTagsInNote({
          note_id: id.value,
          tag_ids: tagIdsCreate,
        })
        .then(() => updateForm());
    }
  }
};

const setCreate = () => {
  let newNote = omit(form.getValues(), 'tags');
  let idsTag: number[] = form.tags.value.map((tag: Tag) => tag.id);

  store.notes
    .createOneNote(newNote as unknown as Omit<Note, 'id'>)
    .then((resp) => {
      if (idsTag.length) {
        store.notes
          .addTagsInNote({ tag_ids: idsTag, note_id: resp.id })
          .then(() => notify.success('Listo'))
          .finally(() => onReset());
      } else {
        notify.success('Listo');
        setTimeout(() => onReset(), 200);
      }
    })
    .catch(() => notify.error('Hubo un Error!'));
};

const getNoteOne = (id: number) => {
  return store.notes.getOneNote(id).then(() => {
    if (!store.notes.current) return;
    form.updateForm(store.notes.current);
    idsTag.value = store.notes.current.tags.map((tag: Tag) => tag.id);
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

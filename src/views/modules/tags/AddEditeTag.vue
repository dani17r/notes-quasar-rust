<template>
  <div :class="[
    menus.drawerAddEditeTag.value
      ? 'q-px-md tw-mt-12 tw-w-[500px]'
      : 'tw-w-[0px]',
    'tw-transition-all',
  ]">
    <WrapperOfLoading :status="!store.tags.loading" auto :class="!menus.drawerAddEditeTag.value ? 'tw-hidden' : 'tw-overflow-hidden'
      ">
      <q-icon name="close" size="22px" class="tw-absolute tw-right-5 tw-cursor-pointer" @click="
        menus.toggleDrawerAddEditeTag(false, menus.drawerAddEditeTagId.value)
        " />
      <q-form class="q-gutter-md tw-w-full" :ref="form.getRef" @submit="onSubmit" @reset="onReset">
        <h1 class="tw-text-2xl tw-pb-3">
          {{ isEdit ? 'Actualizar Etiqueta' : 'Crear Etiqueta' }}
        </h1>
        <q-input v-model="form.name.value" :rules="form.name.rules" label="Nombre" borderless clearable dense>
          <template v-slot:append v-if="isEdit">
            <q-icon v-show="form.name.isChange()" @click="form.name.reset()" class="tw-mx-2" name="undo" />
          </template>
        </q-input>

        <q-input v-model="form.description.value" :rules="form.description.rules" class="tw-max-h-[80px]"
          label="Descripción" maxlength="100" borderless clearable autogrow dense>
          <template v-slot:append v-if="isEdit">
            <q-icon name="undo" class="tw-mx-2" v-show="form.description.isChange()"
              @click="form.description.reset()" />
          </template>
        </q-input>

        <q-input :input-style="`background:${form.color.value}; color:${form.color.value}; border-radius:20px`"
          v-model="form.color.value" borderless clearable readonly rounded dense>
          <template v-slot:prepend>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="form.color.value" no-header no-footer />
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:append v-if="isEdit">
            <q-icon name="undo" class="tw-mx-2" v-show="form.color.isChange()" @click="form.color.reset()" />
          </template>
        </q-input>

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
import WrapperOfLoading from '@components/WrapperOfLoading.vue';
import superComposable from '@composables/superComposable';
import menusComposable from '@composables/menusComposable';
import { formResetDefault } from '@utils/actions';
import { required } from '@utils/validations';
import { superForm } from '@utils/super';
import type { Tag } from '@interfaces/tags';
import { computed, watch } from 'vue';

const { notify, store } = superComposable();
const menus = menusComposable();

const isEdit = computed(() => menus.drawerAddEditeTagId.value != null);
const form = superForm({
  name: {
    value: '',
    rules: [required],
  },
  description: {
    value: '',
    rules: [required],
  },
  color: {
    value: '',
  },
});

const setUpdate = () => {
  if (form.verifyIsNotChanges()) {
    const updateTagField = {
      id: store.tags.current?.id,
      ...form.getValues(),
    } as unknown as Tag;

    store.tags
      .updateOneTag(updateTagField)
      .then(() => {
        notify.success('Listo');
        if (!store.tags.current) return;
        form.updateForm(store.tags.current);
      })
      .catch(() => notify.error('Hubo un Error!'));
  }
};
const setCreate = () => {
  store.tags
    .createOneTag(form.getValues() as unknown as Omit<Tag, 'id'>)
    .then(() => {
      notify.success('Listo');
    })
    .finally(() => onReset())
    .catch(() => notify.error('Hubo un Error!'));
};

const getTagOne = (id: number) => {
  store.tags.getOneTag(id).then(() => {
    if (!store.tags.current) return;
    form.updateForm(store.tags.current);
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

watch(
  () => menus.drawerAddEditeTagId.value,
  (val: number | null) => {
    if (val == null) onReset();
    else getTagOne(Number(val));
  },
);
</script>

<template>
  <div :class="[
    menus.drawerAddEditeCategory.value
      ? 'q-px-md tw-mt-20 tw-w-[500px]'
      : 'tw-w-[0px]',
    'tw-transition-all',
  ]">
    <WrapperOfLoading :status="!store.categories.loading" auto :class="!menus.drawerAddEditeCategory.value ? 'tw-hidden' : 'tw-overflow-hidden'
      ">
      <q-icon name="close" size="22px" class="tw-absolute tw-right-5 tw-cursor-pointer" @click="
        menus.toggleDrawerAddEditeCategory(false, menus.drawerAddEditeCategoryId.value)
        " />
      <q-form class="q-gutter-md tw-w-full" :ref="form.getRef" @submit="onSubmit" @reset="onReset">
        <h1 class="tw-text-2xl tw-pb-3">
          {{ isEdit ? 'Actualizar Etiqueta' : 'Crear Etiqueta' }}
        </h1>
        <q-input v-model="form.title.value" :rules="form.title.rules" label="Nombre" borderless clearable dense>
          <template v-slot:append v-if="isEdit">
            <q-icon v-show="form.title.isChange()" @click="form.title.reset()" class="tw-mx-2" name="undo" />
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
import type { Category } from '@interfaces/categories';
import { computed, onMounted, watch } from 'vue';

const { notify, store } = superComposable();
const menus = menusComposable();

const isEdit = computed(() => menus.drawerAddEditeCategoryId.value != null);
const form = superForm({
  title: {
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
    const updateCategoryField = {
      id: store.categories.current?.id,
      ...form.getValues(),
    } as unknown as Category;

    store.categories
      .updateOneCategory(updateCategoryField)
      .then(() => {
        notify.success('Listo');
        if (!store.categories.current) return;
        form.updateForm(store.categories.current);
      })
      .catch(() => notify.error('Hubo un Error!'));
  }
};
const setCreate = () => {
  store.categories
    .createOneCategory(form.getValues() as unknown as Omit<Category, 'id'>)
    .then(() => {
      notify.success('Listo');
    })
    .finally(() => onReset())
    .catch(() => notify.error('Hubo un Error!'));
};

const getCategoryOne = (id: number) => {
  store.categories.getOneCategory(id).then(() => {
    if (!store.categories.current) return;
    form.updateForm(store.categories.current);
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
  () => menus.drawerAddEditeCategoryId.value,
  (val: number | null) => {
    if (val == null) onReset();
    else getCategoryOne(Number(val));
  },
);

onMounted(() => {
  if (menus.drawerAddEditeCategoryId.value) {
    getCategoryOne(Number(menus.drawerAddEditeCategoryId.value));
  }
});
</script>

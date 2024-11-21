<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="menus.toggleLeftDrawer()" />

        <q-toolbar-title> RustNote </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="menus.leftDrawer.value" show-if-above bordered>
      <q-list>
        <q-item-label header> Notas </q-item-label>

        <ItemNote v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition :name="state.transition">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import transitionsComposable from '@composables/transitionsComposable';
import type { ItemLinkPropsI } from '@components/ItemLink.vue';
import ItemNote from '@components/ItemLink.vue';
import menusComposable from '@composables/menusComposable';
import { onBeforeRouteUpdate } from 'vue-router';
import { onMounted } from 'vue';

const { state } = transitionsComposable();
const menus = menusComposable();

defineOptions({
  name: 'MainLayout',
});

const linksList: ItemLinkPropsI[] = [
  {
    title: 'Inicio',
    caption: 'Principal',
    icon: 'home',
    link: { name: 'index' },
  },
  {
    title: 'Notas',
    caption: 'Crea notas',
    icon: 'notes',
    link: { name: 'index-notes' },
  },
  {
    title: 'Etiquetas',
    caption: 'Agrega Etiquetas',
    icon: 'sell',
    link: { name: 'index-tags' },
  },
  {
    title: 'Categorias',
    caption: 'Tipos de categorias',
    icon: 'checklist',
    link: { name: 'index-categories' },
  },
  {
    title: 'Configuraciones',
    caption: 'Opciones de configuracion',
    icon: 'settings',
    link: { name: 'config' },
  },
];

onBeforeRouteUpdate(() => {
  document.body.style.overflow = 'hidden';
});

onMounted(() => {
  document.body.style.overflow = '';
});
</script>

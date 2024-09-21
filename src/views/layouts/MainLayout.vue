<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> RustNote </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
import ItemNote, { ItemLinkPropsI } from '@components/ItemLink.vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { onMounted, ref } from 'vue';

const { state } = transitionsComposable();

defineOptions({
  name: 'MainLayout',
});

const linksList: ItemLinkPropsI[] = [
  {
    title: 'Inicio',
    caption: 'Principal',
    icon: 'note',
    link: { name: 'index' },
  },
  {
    title: 'Notas',
    caption: 'Crea notas',
    icon: 'note',
    link: { name: 'index-notes' },
  },
  {
    title: 'Etiquetas',
    caption: 'Agrega Etiquetas',
    icon: 'tag',
    link: { name: 'index-tags' },
  },
  {
    title: 'Categorias',
    caption: 'Tipos de categorias',
    icon: 'category',
    link: { name: 'index-categories' },
  },
  {
    title: 'Configuraciones',
    caption: 'Opciones de configuracion',
    icon: 'settings',
    link: { name: 'config' },
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

onBeforeRouteUpdate(() => {
  document.body.style.overflow = 'hidden';
});

onMounted(() => {
  document.body.style.overflow = '';
});
</script>

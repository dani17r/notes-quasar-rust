<template>
  <ButtomBase
    @click="changePage(modeTransition)"
    :to="props.to"
    label="Regresar"
    :icon="props.icon"
    flat
  />
</template>

<script setup lang="ts">
/* eslint-disable */
import transitionsComposable from '@composables/transitionsComposable';
import superComposable from '@composables/superComposable';
import ButtomBase from '@components/ButtomBase.vue';
import { computed } from 'vue';

const { changePage } = transitionsComposable();
const { route } = superComposable();

defineOptions({ name: 'ButtomBack' });

export interface ButtomBackPropsI {
  to?: string | any;
  icon?: string | null;
}

const props = withDefaults(defineProps<ButtomBackPropsI>(), {
  to: { name: 'index' },
  icon: 'arrow_back',
});

const modeTransition = computed(() =>
  route.params.state == 'edit' ? 'slide-right' : 'slide-left',
);
</script>

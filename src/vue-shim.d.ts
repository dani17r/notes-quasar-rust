// src/types/vue-shim.d.ts
import type { ComputedRef } from 'vue';
import { Pinia } from 'pinia'; // Importa Pinia si lo necesitas
import { Quasar } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isDark: ComputedRef<boolean>;
    $stylesDark: {
      bg: ComputedRef<string>
    };
    $pinia: Pinia;
    $q: Quasar; // A
  }
}
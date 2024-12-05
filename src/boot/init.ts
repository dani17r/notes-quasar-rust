import modeDarkComposable from '@composables/modeDarkComposable';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  const { isDark, stylesDark } = modeDarkComposable();
  app.config.globalProperties.$isDark = isDark;
  app.config.globalProperties.$stylesDark = stylesDark;
});

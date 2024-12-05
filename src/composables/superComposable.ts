import { useCategoryStore } from 'src/stores/categories';
import handleErrorsAction from 'src/utils/handleErrors';
import notifications from 'src/utils/notifications';
import { useRouter, useRoute } from 'vue-router';
import { useNoteStore } from 'src/stores/notes';
import { useTagStore } from 'src/stores/tags';
import { useQuasar } from 'quasar';

export default () => {
  const notes = useNoteStore();
  const tags = useTagStore();

  const handleErrors = handleErrorsAction();
  const categories = useCategoryStore();
  const notify = notifications();
  const router = useRouter();
  const route = useRoute();
  const $q = useQuasar();

  const reset = () => {
    // acounts.reset();
    // options.reset();
    // auth.reset();
  };

  return {
    notify,
    router,
    route,
    handleErrors,
    store: {
      reset,
      notes,
      tags,
      categories,
    },
    $q,
  };
};

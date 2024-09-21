// import { useAcountsStore } from 'src/stores/acountsStore';
// import { useOptionsStore } from 'src/stores/optionsStore';
// import { useUsersStore } from 'src/stores/usersStore';
import { useNoteStore } from 'src/stores/notes';
import notifications from 'src/utils/notifications';
// import { useAuthStore } from 'src/stores/authStore';
import handleErrorsAction from 'src/utils/handleErrors';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';


export default () => {
  // const users = useUsersStore();
  // const acounts = useAcountsStore();
  // const options = useOptionsStore();
  const notes = useNoteStore();
  // const auth = useAuthStore();

  const handleErrors = handleErrorsAction();
  const notify = notifications();
  const router = useRouter();
  const route = useRoute();
  const $q = useQuasar();

  const reset = () => {
    // acounts.reset();
    // options.reset();
    // auth.reset();
  }

  return {
    notify,
    router,
    route,
    handleErrors,
    store: {
      reset,
      // acounts,
      // options,
      // users,
      notes,
      // auth,
    },
    $q
  }
}
// import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default () => {
  // const router = useRouter();
  const $q = useQuasar();

  return {
    error: (message: string) => {
      $q.notify({
        color: 'negative',
        progress: true,
        position: 'top',
        icon: 'error',
        message,
      })
    },
    success: (message: string) => {
      $q.notify({
        type: 'positive',
        // progress: true,
        // position: 'top',
        message,
      })
    },
  }

}
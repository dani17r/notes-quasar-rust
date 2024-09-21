import { reactive } from 'vue';

const state = reactive({
  transition: 'none',
});

export default () => {
  const changePage = (transition: string) => {
    state.transition = transition || 'none';
  };

  return {
    changePage,
    state,
  };
};

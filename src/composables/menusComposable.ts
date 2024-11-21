import { ref } from 'vue';

const leftDrawer = ref(false);
const drawerAddEditeTag = ref(false);
const drawerAddEditeTagId = ref<number | null>(null);

export default () => {
  const toggleLeftDrawer = () => {
    leftDrawer.value = !leftDrawer.value;
  };

  const toggleDrawerAddEditeTag = (status = true, id: number | null = null) => {
    drawerAddEditeTag.value = status;
    drawerAddEditeTagId.value = id;
  };

  return {
    toggleDrawerAddEditeTag,
    toggleLeftDrawer,

    drawerAddEditeTagId,
    drawerAddEditeTag,
    leftDrawer,
  };
};

import { ref } from 'vue';

const leftDrawer = ref(false);
const drawerAddEditeTag = ref(false);
const drawerAddEditeTagId = ref<number | null>(null);

const drawerAddEditeCategory = ref(false);
const drawerAddEditeCategoryId = ref<number | null>(null);

export default () => {
  const toggleLeftDrawer = () => {
    leftDrawer.value = !leftDrawer.value;
  };

  const toggleDrawerAddEditeTag = (status = true, id: number | null = null) => {
    drawerAddEditeTag.value = status;
    drawerAddEditeTagId.value = id;
  };

  const toggleDrawerAddEditeCategory = (status = true, id: number | null = null) => {
    drawerAddEditeCategory.value = status;
    drawerAddEditeCategoryId.value = id;
  };

  return {
    toggleDrawerAddEditeCategory,
    toggleDrawerAddEditeTag,
    toggleLeftDrawer,

    drawerAddEditeCategoryId,
    drawerAddEditeCategory,
    drawerAddEditeTagId,
    drawerAddEditeTag,
    leftDrawer,
  };
};

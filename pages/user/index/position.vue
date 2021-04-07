<template>
  <common-edit-list
    filterable
    v-model="positions"
    title="岗位"
    @click="select"
  ></common-edit-list>
</template>

<script>
export default {
  data: () => ({
    positions: [
      { id: "aaa", name: "总经理" },
      { id: "bbb", name: "副总经理" },
      { id: "ccc", name: "部门经理" },
    ],
  }),
  methods: {
    select: function (index) {
      console.log(index);
    },
  },
};
</script>
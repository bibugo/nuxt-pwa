<template>
  <common-edit-list
    filterable
    v-model="groups"
    title="用户组"
    @click="select"
  ></common-edit-list>
</template>

<script>
export default {
  data: () => ({
    groups: [
      { id: "aaa", name: "系统管理员" },
      { id: "bbb", name: "项目管理员" },
      { id: "ccc", name: "部门管理员" },
    ],
  }),
  methods: {
    select: function (index) {
      console.log(index);
    },
  },
};
</script>
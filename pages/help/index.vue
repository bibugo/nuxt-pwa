<template>
  <container-with-sidebar right>
    <template v-slot:sidebar-prepend>
      <v-sheet class="mt-4 mb-2"><h4>目 录</h4></v-sheet>
    </template>
    <template v-slot:sidebar>
      <v-row no-gutters
        ><v-divider vertical class="ml-4 mr-2" />
        <v-col> 1. 总</v-col>
      </v-row>
    </template>
    Aaa <br />
  </container-with-sidebar>
</template>
<script>
export default {
  data: () => ({}),
};
</script>

<template>
  <container-fluid class="d-flex flex-column flex-grow-1 px-4 py-2 grey lighten-3" style="min-height: 100%">
  <!-- <container-fluid class="d-flex flex-column flex-grow-1 px-4 py-2 grey lighten-3" style="height: 100%"> -->
    <v-toolbar flat class="mb-2 transparent  flex-grow-0">
      <v-divider
        class="ml-n4 mr-2"
        style="border-width: 2px"
        vertical
      ></v-divider>
      <div class="d-flex flex-column">
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-breadcrumbs class="pa-0" :items="items"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn>Append</v-btn>
    </v-toolbar>
    <v-sheet rounded class="py-2 px-3 flex-grow-1">
      abc <br /> 

    </v-sheet>
  </container-fluid>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data: () => ({
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Link 1",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        text: "Link 2",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],
  }),
};
</script>

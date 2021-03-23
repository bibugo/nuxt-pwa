<template>
  <v-container
    fluid
    class="d-flex flex-column flex-grow-1 pa-4"
    style="min-height: 100%; background-color: rgba(0, 0, 0, 0.03);"
  >
    <v-toolbar flat class="mb-2 transparent flex-grow-0">
      <v-divider class="ml-n4 mr-4" vertical></v-divider>
      <div class="d-flex flex-column">
        <v-toolbar-title>用户管理</v-toolbar-title>
        <v-breadcrumbs class="pa-0" :items="items"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn>Append</v-btn>
    </v-toolbar>
    <v-alert
      dense
      dismissible
      border="right"
      colored-border
      type="error"
      elevation="0"
      transition="scale-transition"
    >
      Fusce commodo aliquam arcu. Pellentesque posuere. Phasellus tempus. Donec
      posuere vulputate arcu.
    </v-alert>
    <v-sheet rounded class="py-2 px-3 flex-grow-1"> abc <br /> </v-sheet>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  title: "首页｜用户｜用户管理",
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

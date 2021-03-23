<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :miniVariant="miniVariant"
      fixed
      app
    >
      <layout-nav-drawer :miniVariant.sync="miniVariant" />
    </v-navigation-drawer>

    <v-app-bar
      dense
      flat
      :clipped-left="clipped"
      fixed
      app
      extension-height="1"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <layout-mail-menu :value="false" />

      <layout-user-menu
        :drawer.sync="drawer"
        :clipped.sync="clipped"
        :fixed.sync="fixed"
        :preferences.sync="preferences"
      />

      <v-badge
        class="custom-badge mr-n3"
        :content="messages"
        :value="messages"
        color="success"
        offset-x="20"
        offset-y="20"
      >
        <v-btn icon @click.stop="task = true">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-badge>

      <template v-slot:extension>
        <v-divider class="mx-n4" style="max-width: none" />
      </template>
    </v-app-bar>

    <v-main style="height: 100vh">
      <nuxt />
    </v-main>

    <layout-task-drawer v-model="task" />

    <v-footer v-if="fixed" :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <layout-snackbars />
    <layout-popup-dialog />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    miniVariant: false,
    clipped: false,
    fixed: false,
    preferences: {
      fav: true,
      dark_theme: false,
    },
    task: false,
    messages: 5,
    title: "Vuetify.js",
  }),
};
</script>

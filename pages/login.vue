<template>
  <v-container fluid fill-height pa-0 class="justify-center">
    <v-card
      width="100%"
      height="100%"
      :elevation="$vuetify.breakpoint.lgAndUp ? '8' : '0'"
      :max-width="$vuetify.breakpoint.lgAndUp ? '900' : ''"
      :max-height="$vuetify.breakpoint.lgAndUp ? '480' : ''"
    >
      <v-row no-gutters class="fill-height">
        <v-col
          class="fill-all col-8 d-none d-md-flex flex-column align-center justify-center primary"
        >
          <v-img class="logo mb-6 flex-grow-0" />
          <p class="white--text font-weight-black display-1">
            Project Management System
          </p>
        </v-col>
        <v-col class="fill-all login col-12 col-md-4 d-flex flex-column">
          <v-spacer />
          <login-card
            flat
            color="rgba(255, 255, 255, 0)"
            :width="$vuetify.breakpoint.lgAndUp ? '360' : '80%'"
            :class="{
              'mx-auto': $vuetify.breakpoint.lgAndUp,
              'align-self-center': !$vuetify.breakpoint.lgAndUp,
            }"
          />
          <v-spacer />
          <div class="primary--text text-center" style="width: 100%">
            &copy; {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  auth: false,
};
</script>
<style scoped>
.fill-all {
  width: 100%;
  height: 100%;
}
.login {
  overflow-y: auto;
}
.logo {
  width: 101px;
  height: 118px;
  background-image: url(/images/logo.svg);
  background-position: center center;
}
</style>
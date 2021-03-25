<template>
  <v-container fluid fill-height pa-0 class="justify-center">
    <v-card
      v-if="$vuetify.breakpoint.lgAndUp"
      elevation="8"
      width="100%"
      height="100%"
      max-width="900"
      max-height="480"
    >
      <v-row no-gutters class="fill-height">
        <v-col
          class="main col-8 d-none d-md-flex flex-column align-center justify-center primary"
        >
          <v-img class="logo mb-6 flex-grow-0" />
          <p class="white--text font-weight-black display-1">
            Project Management System
          </p>
        </v-col>
        <v-col class="login col-12 col-md-4 d-flex flex-column">
          <v-spacer />
          <login-card
            flat
            color="rgba(255, 255, 255, 0)"
            max-width="360px"
            class="mx-auto"
          />
          <v-spacer />
          <div class="primary--text text-center" style="width: 100%">
            &copy; {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-row v-else no-gutters class="fill-height">
      <v-col
        class="main col-8 d-none d-md-flex flex-column align-center justify-center primary"
      >
        <v-img class="logo mb-6 flex-grow-0" />
        <p class="white--text font-weight-black display-1">
          Project Management System
        </p>
      </v-col>
      <v-col class="login col-12 col-md-4 d-flex flex-column">
        <v-spacer />
        <login-card
          flat
          color="rgba(255, 255, 255, 0)"
          width="80%"
          class="align-self-center"
        />
        <v-spacer />
        <div class="primary--text text-center" style="width: 100%">
          &copy; {{ new Date().getFullYear() }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  auth: false,
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.login {
  width: 100%;
  height: 100%;
  /* background-color: #f6f7ff; */
  overflow-y: auto;
}
.logo {
  width: 101px;
  height: 118px;
  background-image: url(/images/logo.svg);
  background-position: center center;
}
</style>
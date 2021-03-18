<template>
  <v-container fluid pa-0>
    <v-row no-gutters>
      <v-col
        class="main col-8 d-none d-lg-flex flex-column align-center justify-center primary"
      >
        <div class="d-flex flex-column align-center">
          <v-img class="logo mb-8" />
          <p class="white--text font-weight-black display-2">
            Project Management System
          </p>
        </div>
      </v-col>
      <v-col
        class="login col-12 col-lg-4 d-flex flex-column justify-center align-center justify-space-between"
      >
        <div></div>
        <layout-login-card outlined width="360px" />
        <div>Copyright 2021</div>
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
  height: 100vh;
}
.login {
  width: 100%;
  height: 100vh;
  background-color: #f6f7ff;
  overflow-y: auto;
}
.logo {
  width: 131px;
  height: 106px;
  background-image: url(/images/logo.svg);
  background-position: center center;
}
</style>
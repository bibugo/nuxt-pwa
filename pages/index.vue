<template>
  <container-fluid>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs large>
          <h1 class="secondary--text">Dashboard</h1>
        </v-breadcrumbs>
      </v-col>
    </v-row>
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
};
</script>
